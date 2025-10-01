"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { 
  Code, 
  Copy, 
  Trash2, 
  Download,
  Zap,
  FileText,
  Minimize2,
  CheckCircle,
  BarChart3
} from "lucide-react"

interface MinificationStats {
  originalSize: number
  minifiedSize: number
  compressionRatio: number
  spaceSaved: number
}

export default function CSSMinifierPage() {
  const [css, setCss] = useState("")
  const [minifiedCss, setMinifiedCss] = useState("")
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState<MinificationStats>({
    originalSize: 0,
    minifiedSize: 0,
    compressionRatio: 0,
    spaceSaved: 0
  })

  const minifyCSS = (cssCode: string): string => {
    return cssCode
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove unnecessary whitespace
      .replace(/\s+/g, ' ')
      // Remove spaces around certain characters
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
      // Remove trailing semicolons before closing braces
      .replace(/;}/g, '}')
      // Remove leading/trailing whitespace
      .trim()
  }

  const handleMinify = () => {
    if (!css.trim()) return

    const minified = minifyCSS(css)
    setMinifiedCss(minified)

    // Calculate stats
    const originalSize = new Blob([css]).size
    const minifiedSize = new Blob([minified]).size
    const spaceSaved = originalSize - minifiedSize
    const compressionRatio = originalSize > 0 ? ((spaceSaved / originalSize) * 100) : 0

    setStats({
      originalSize,
      minifiedSize,
      compressionRatio,
      spaceSaved
    })
  }

  const handleCopy = async () => {
    if (!minifiedCss) return
    
    try {
      await navigator.clipboard.writeText(minifiedCss)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleDownload = () => {
    if (!minifiedCss) return

    const blob = new Blob([minifiedCss], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'minified-styles.css'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setCss("")
    setMinifiedCss("")
    setStats({
      originalSize: 0,
      minifiedSize: 0,
      compressionRatio: 0,
      spaceSaved: 0
    })
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl">
                <Minimize2 className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 sm:mb-6">
            CSS Minifier
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Compress and optimize your CSS code by removing unnecessary whitespace, comments, and formatting. 
            Reduce file size and improve website loading speed.
          </p>
        </div>

        {/* Stats Cards */}
        {minifiedCss && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">
                    {formatBytes(stats.originalSize)}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-1">Original Size</p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Minimize2 className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">
                    {formatBytes(stats.minifiedSize)}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-1">Minified Size</p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <span className="text-2xl font-bold text-purple-600">
                    {stats.compressionRatio.toFixed(1)}%
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-1">Compression</p>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Zap className="h-5 w-5 text-orange-600" />
                  <span className="text-2xl font-bold text-orange-600">
                    {formatBytes(stats.spaceSaved)}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-1">Space Saved</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Input Section */}
          <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-6 w-6 text-blue-600" />
                <span>Original CSS</span>
              </CardTitle>
              <CardDescription>
                Paste your CSS code here to minify and optimize
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={`/* Paste your CSS code here */
.header {
    background-color: #ffffff;
    padding: 20px;
    margin: 0 auto;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.button {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    color: white;
    cursor: pointer;
}`}
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="min-h-[400px] font-mono text-sm resize-none border-2 focus:border-blue-300 transition-colors duration-200"
              />
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={handleMinify} 
                  disabled={!css.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Minify CSS
                </Button>
                <Button onClick={handleClear} variant="outline" size="default" disabled={!css.trim()}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Minimize2 className="h-6 w-6 text-green-600" />
                <span>Minified CSS</span>
              </CardTitle>
              <CardDescription>
                Optimized and compressed CSS code ready for production
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea
                  value={minifiedCss}
                  readOnly
                  placeholder="Minified CSS will appear here..."
                  className="min-h-[400px] font-mono text-sm resize-none bg-gray-50 border-2"
                />
                {minifiedCss && (
                  <div className="absolute top-3 right-3 flex items-center space-x-2">
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md font-medium">
                      Optimized
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={handleCopy} 
                  disabled={!minifiedCss}
                  variant="outline"
                >
                  {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button 
                  onClick={handleDownload} 
                  disabled={!minifiedCss}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="shadow-xl bg-gradient-to-r from-slate-50 to-blue-50 border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl">Optimization Features</CardTitle>
            <CardDescription className="text-lg">
              Advanced CSS compression techniques for maximum efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Trash2,
                  title: "Remove Comments",
                  description: "Strips all CSS comments and documentation",
                  color: "text-red-600"
                },
                {
                  icon: Minimize2,
                  title: "Whitespace Removal",
                  description: "Eliminates unnecessary spaces and line breaks",
                  color: "text-blue-600"
                },
                {
                  icon: Code,
                  title: "Syntax Optimization",
                  description: "Optimizes selectors and property formatting",
                  color: "text-green-600"
                },
                {
                  icon: Zap,
                  title: "Fast Processing",
                  description: "Instant minification with real-time stats",
                  color: "text-purple-600"
                }
              ].map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="text-center group">
                    <div className="mx-auto w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
