"use client"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Palette, Copy, RefreshCw, Download, Trash2, Eye } from "lucide-react"

interface Color {
  hex: string
  rgb: { r: number, g: number, b: number }
  hsl: { h: number, s: number, l: number }
  name: string
}

interface PaletteType {
  name: string
  description: string
  generate: (baseColor: string) => Color[]
}

export default function ColorPaletteGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#3B82F6")
  const [palette, setPalette] = useState<Color[]>([])
  const [selectedPaletteType, setSelectedPaletteType] = useState("complementary")
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  // Color utility functions
  const hexToRgb = (hex: string): { r: number, g: number, b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  const rgbToHsl = (r: number, g: number, b: number): { h: number, s: number, l: number } => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h, s;
    const l = (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
        default: h = 0
      }
      h /= 6
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const hslToRgb = (h: number, s: number, l: number): { r: number, g: number, b: number } => {
    h /= 360
    s /= 100
    l /= 100

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    if (s === 0) {
      const val = Math.round(l * 255)
      return { r: val, g: val, b: val } // achromatic
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    const r = Math.round(hue2rgb(p, q, h + 1/3) * 255)
    const g = Math.round(hue2rgb(p, q, h) * 255)
    const b = Math.round(hue2rgb(p, q, h - 1/3) * 255)

    return { r, g, b }
  }

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }).join("")
  }

  const getColorName = (hex: string): string => {
    // Simple color naming (you could expand this with a comprehensive color name database)
    const colorNames: { [key: string]: string } = {
      "#FF0000": "Red", "#00FF00": "Green", "#0000FF": "Blue",
      "#FFFFFF": "White", "#000000": "Black", "#FFFF00": "Yellow",
      "#FF00FF": "Magenta", "#00FFFF": "Cyan", "#FFA500": "Orange",
      "#800080": "Purple", "#FFC0CB": "Pink", "#A52A2A": "Brown"
    }
    return colorNames[hex.toUpperCase()] || hex
  }

  const createColor = (hex: string): Color => {
    const rgb = hexToRgb(hex)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    return {
      hex,
      rgb,
      hsl,
      name: getColorName(hex)
    }
  }

  const paletteTypes = useMemo<PaletteType[]>(() => [
    {
      name: "complementary",
      description: "Two colors opposite on the color wheel",
      generate: (baseHex: string) => {
        const baseRgb = hexToRgb(baseHex)
        const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b)
        const compHue = (baseHsl.h + 180) % 360
        const compRgb = hslToRgb(compHue, baseHsl.s, baseHsl.l)
        const compHex = rgbToHex(compRgb.r, compRgb.g, compRgb.b)
        
        return [createColor(baseHex), createColor(compHex)]
      }
    },
    {
      name: "triadic",
      description: "Three colors evenly spaced on the color wheel",
      generate: (baseHex: string) => {
        const baseRgb = hexToRgb(baseHex)
        const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b)
        
        const colors = [baseHex]
        for (let i = 1; i < 3; i++) {
          const hue = (baseHsl.h + i * 120) % 360
          const rgb = hslToRgb(hue, baseHsl.s, baseHsl.l)
          colors.push(rgbToHex(rgb.r, rgb.g, rgb.b))
        }
        
        return colors.map(createColor)
      }
    },
    {
      name: "analogous",
      description: "Colors adjacent to each other on the color wheel",
      generate: (baseHex: string) => {
        const baseRgb = hexToRgb(baseHex)
        const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b)
        
        const colors = []
        for (let i = -1; i <= 1; i++) {
          const hue = (baseHsl.h + i * 30 + 360) % 360
          const rgb = hslToRgb(hue, baseHsl.s, baseHsl.l)
          colors.push(rgbToHex(rgb.r, rgb.g, rgb.b))
        }
        
        return colors.map(createColor)
      }
    },
    {
      name: "monochromatic",
      description: "Different shades and tints of the same color",
      generate: (baseHex: string) => {
        const baseRgb = hexToRgb(baseHex)
        const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b)
        
        const colors = []
        const lightnesses = [25, 50, 75, 100]
        for (const l of lightnesses) {
          const rgb = hslToRgb(baseHsl.h, baseHsl.s, l)
          colors.push(rgbToHex(rgb.r, rgb.g, rgb.b))
        }
        
        return colors.map(createColor)
      }
    },
    {
      name: "tetradic",
      description: "Four colors forming a rectangle on the color wheel",
      generate: (baseHex: string) => {
        const baseRgb = hexToRgb(baseHex)
        const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b)
        
        const colors = [baseHex]
        const hues = [60, 180, 240]
        for (const hueOffset of hues) {
          const hue = (baseHsl.h + hueOffset) % 360
          const rgb = hslToRgb(hue, baseHsl.s, baseHsl.l)
          colors.push(rgbToHex(rgb.r, rgb.g, rgb.b))
        }
        
        return colors.map(createColor)
      }
    }
  ], []) // Empty dependency array since these are static functions

  const generatePalette = useCallback(() => {
    const paletteType = paletteTypes.find((p: PaletteType) => p.name === selectedPaletteType) || paletteTypes[0]
    const newPalette = paletteType.generate(baseColor)
    setPalette(newPalette)
  }, [baseColor, selectedPaletteType])

  const handleCopyColor = async (color: Color, format: 'hex' | 'rgb' | 'hsl' = 'hex') => {
    let textToCopy: string
    switch (format) {
      case 'rgb':
        textToCopy = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
        break
      case 'hsl':
        textToCopy = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`
        break
      default:
        textToCopy = color.hex
    }
    
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopiedColor(color.hex + format)
      setTimeout(() => setCopiedColor(null), 2000)
    } catch (err) {
      console.error("Failed to copy color:", err)
    }
  }

  const exportPalette = () => {
    const paletteData = {
      baseColor,
      paletteType: selectedPaletteType,
      colors: palette.map(color => ({
        hex: color.hex,
        rgb: color.rgb,
        hsl: color.hsl,
        name: color.name
      }))
    }
    
    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'color-palette.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const randomColor = () => {
    const randomHex = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    setBaseColor(randomHex)
  }

  // Generate initial palette
  useState(() => {
    generatePalette()
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Palette className="h-12 w-12 text-pink-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Color Palette Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create beautiful color palettes using color theory principles. 
            Generate complementary, triadic, analogous, and other color schemes.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Palette Controls</CardTitle>
              <CardDescription>
                Choose your base color and palette type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="baseColor" className="text-sm font-medium">
                    Base Color:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="baseColor"
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-12 h-8 rounded border cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-20 font-mono text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="paletteType" className="text-sm font-medium">
                    Palette Type:
                  </label>
                  <select
                    id="paletteType"
                    value={selectedPaletteType}
                    onChange={(e) => setSelectedPaletteType(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    {paletteTypes.map((type: PaletteType) => (
                      <option key={type.name} value={type.name}>
                        {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <Button onClick={generatePalette} size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate
                </Button>

                <Button onClick={randomColor} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Random Color
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Palette Display */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Color Palette</CardTitle>
                  <CardDescription>
                    {paletteTypes.find((p: PaletteType) => p.name === selectedPaletteType)?.description}
                  </CardDescription>
                </div>
                <Button onClick={exportPalette} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {palette.map((color, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div 
                      className="h-32 w-full cursor-pointer transition-transform hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => handleCopyColor(color)}
                    />
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{color.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyColor(color)}
                          >
                            {copiedColor === color.hex + 'hex' ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        
                        <div className="space-y-1">
                          <button
                            className="w-full text-left p-1 rounded text-xs font-mono hover:bg-gray-100"
                            onClick={() => handleCopyColor(color, 'hex')}
                          >
                            HEX: {color.hex}
                          </button>
                          <button
                            className="w-full text-left p-1 rounded text-xs font-mono hover:bg-gray-100"
                            onClick={() => handleCopyColor(color, 'rgb')}
                          >
                            RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
                          </button>
                          <button
                            className="w-full text-left p-1 rounded text-xs font-mono hover:bg-gray-100"
                            onClick={() => handleCopyColor(color, 'hsl')}
                          >
                            HSL: {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Palette Types Info */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Palette Types</CardTitle>
              <CardDescription>
                Understanding different color harmony principles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paletteTypes.map((type: PaletteType) => (
                  <div 
                    key={type.name}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPaletteType === type.name 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedPaletteType(type.name)}
                  >
                    <h4 className="font-semibold capitalize mb-2">{type.name}</h4>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Professional color palette generation tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-pink-600 font-semibold mb-2">Color Theory</div>
                  <p className="text-sm text-gray-600">
                    Based on proven color harmony principles
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-blue-600 font-semibold mb-2">Multiple Formats</div>
                  <p className="text-sm text-gray-600">
                    Copy colors in HEX, RGB, and HSL formats
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-semibold mb-2">Export Palettes</div>
                  <p className="text-sm text-gray-600">
                    Download palettes as JSON files
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-orange-600 font-semibold mb-2">Random Generation</div>
                  <p className="text-sm text-gray-600">
                    Generate random color combinations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}