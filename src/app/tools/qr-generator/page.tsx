"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { QrCode, Download, Copy, Trash2, Smartphone } from "lucide-react"

export default function QrGeneratorPage() {
  const [text, setText] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [size, setSize] = useState(200)
  const [errorLevel, setErrorLevel] = useState("M")

  // Simple QR Code generation using a public API
  const generateQRCode = useCallback(async () => {
    if (!text.trim()) {
      setQrCodeUrl("")
      return
    }

    try {
      // Using QR Server API (free, no registration required)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&ecc=${errorLevel}&format=png&margin=10`
      setQrCodeUrl(qrUrl)
    } catch (error) {
      console.error("Failed to generate QR code:", error)
      setQrCodeUrl("")
    }
  }, [text, size, errorLevel])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateQRCode()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [generateQRCode])

  const handleDownload = async () => {
    if (!qrCodeUrl) return

    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'qrcode.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download QR code:", error)
    }
  }

  const handleCopyImage = async () => {
    if (!qrCodeUrl) return

    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ])
    } catch (error) {
      console.error("Failed to copy QR code:", error)
    }
  }

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error("Failed to copy text:", error)
    }
  }

  const handleClear = () => {
    setText("")
  }

  const loadTemplate = (template: string) => {
    setText(template)
  }

  const templates = [
    {
      name: "Website URL",
      template: "https://example.com",
      description: "Link to a website"
    },
    {
      name: "WiFi Network",
      template: "WIFI:T:WPA;S:NetworkName;P:Password;H:false;;",
      description: "WiFi connection details"
    },
    {
      name: "Email",
      template: "mailto:someone@example.com?subject=Hello&body=Hi%20there",
      description: "Send email with pre-filled details"
    },
    {
      name: "Phone Number",
      template: "tel:+1234567890",
      description: "Call a phone number"
    },
    {
      name: "SMS Message",
      template: "sms:+1234567890?body=Hello%20there",
      description: "Send SMS with pre-filled message"
    },
    {
      name: "Contact Card (vCard)",
      template: `BEGIN:VCARD
VERSION:3.0
FN:John Doe
ORG:Company Name
TEL:+1234567890
EMAIL:john@example.com
URL:https://johndoe.com
END:VCARD`,
      description: "Contact information"
    },
    {
      name: "Geographic Location",
      template: "geo:37.7749,-122.4194",
      description: "GPS coordinates (San Francisco)"
    },
    {
      name: "App Store Link",
      template: "https://apps.apple.com/app/id123456789",
      description: "Link to mobile app"
    }
  ]

  const errorLevels = [
    { value: "L", name: "Low (~7%)", description: "Good for clean environments" },
    { value: "M", name: "Medium (~15%)", description: "Balanced (recommended)" },
    { value: "Q", name: "Quartile (~25%)", description: "Good for noisy environments" },
    { value: "H", name: "High (~30%)", description: "Maximum error correction" }
  ]

  const sizeOptions = [
    { value: 150, name: "Small (150px)" },
    { value: 200, name: "Medium (200px)" },
    { value: 300, name: "Large (300px)" },
    { value: 400, name: "Extra Large (400px)" },
    { value: 500, name: "Maximum (500px)" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <QrCode className="h-12 w-12 text-gray-900" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            QR Code Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate QR codes for URLs, text, WiFi, contacts, and more. 
            Customize size and error correction level for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input and Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Text Input */}
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  Enter the text, URL, or data you want to encode in the QR code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter text, URL, or other data..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[150px] resize-none font-mono text-sm"
                />
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Characters: {text.length}</span>
                  <span>Max recommended: ~2,000 characters</span>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCopyText} variant="outline" size="sm" disabled={!text}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Text
                  </Button>
                  <Button onClick={handleClear} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>QR Code Settings</CardTitle>
                <CardDescription>
                  Customize the appearance and error correction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Size</label>
                    <select
                      value={size}
                      onChange={(e) => setSize(parseInt(e.target.value))}
                      className="w-full border rounded px-3 py-2 text-sm"
                    >
                      {sizeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Error Correction</label>
                    <select
                      value={errorLevel}
                      onChange={(e) => setErrorLevel(e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm"
                    >
                      {errorLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <strong>Error Correction:</strong> Higher levels allow the QR code to remain readable even when partially damaged or obscured.
                </div>
              </CardContent>
            </Card>

            {/* Generated QR Code */}
            {qrCodeUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated QR Code</CardTitle>
                  <CardDescription>
                    Your QR code is ready to use
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-lg border-2 border-dashed border-gray-300">
                      <Image 
                        src={qrCodeUrl} 
                        alt="Generated QR Code" 
                        className="max-w-full h-auto"
                        width={size}
                        height={size}
                        unoptimized
                        style={{ width: size, height: size }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-center">
                    <Button onClick={handleDownload} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PNG
                    </Button>
                    <Button onClick={handleCopyImage} variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Image
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-600">
                    <p>✓ QR Code generated successfully</p>
                    <p>Size: {size}x{size}px | Error Correction: {errorLevel}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Templates</CardTitle>
                <CardDescription>
                  Click to load common QR code formats
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {templates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => loadTemplate(template.template)}
                  >
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {template.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Usage Tips */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Smartphone className="h-5 w-5 inline mr-2" />
                  Usage Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Size Guidelines:</strong> Use larger sizes for printing or distant scanning.
                </p>
                <p>
                  <strong>Error Correction:</strong> Use higher levels if the QR code might be damaged.
                </p>
                <p>
                  <strong>Testing:</strong> Always test your QR code with multiple devices and apps.
                </p>
                <p>
                  <strong>Contrast:</strong> Ensure good contrast between QR code and background.
                </p>
              </CardContent>
            </Card>

            {/* Data Formats */}
            <Card>
              <CardHeader>
                <CardTitle>Supported Formats</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <div>
                  <strong>URLs:</strong> https://example.com
                </div>
                <div>
                  <strong>Email:</strong> mailto:user@domain.com
                </div>
                <div>
                  <strong>Phone:</strong> tel:+1234567890
                </div>
                <div>
                  <strong>SMS:</strong> sms:+1234567890?body=message
                </div>
                <div>
                  <strong>WiFi:</strong> WIFI:T:WPA;S:name;P:password;;
                </div>
                <div>
                  <strong>GPS:</strong> geo:latitude,longitude
                </div>
                <div>
                  <strong>Plain Text:</strong> Any text content
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Keep content concise for better readability</p>
                <p>• Test QR codes before final use</p>
                <p>• Use medium or high error correction for print</p>
                <p>• Maintain quiet zone (white space) around code</p>
                <p>• Choose appropriate size for viewing distance</p>
                <p>• Avoid very light colors or low contrast</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Professional QR code generation with advanced options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-gray-900 font-semibold mb-2">Multiple Formats</div>
                  <p className="text-sm text-gray-600">
                    Support for URLs, text, WiFi, email, and more
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-blue-600 font-semibold mb-2">Customizable Size</div>
                  <p className="text-sm text-gray-600">
                    Choose from multiple size options
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-semibold mb-2">Error Correction</div>
                  <p className="text-sm text-gray-600">
                    Multiple error correction levels
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-semibold mb-2">Easy Export</div>
                  <p className="text-sm text-gray-600">
                    Download or copy QR codes instantly
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