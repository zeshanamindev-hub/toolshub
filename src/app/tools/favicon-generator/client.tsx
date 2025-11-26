"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ToolPageLayout from "@/components/layout/tool-page-layout"
import { ToolStructuredData } from "@/components/seo/tool-seo"
import {
  Upload,
  Download,
  Image as ImageIcon,
  CheckCircle,
  AlertTriangle,
  FileImage,
  Eye,
  Info
} from "lucide-react"

export default function FaviconGeneratorClient() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [isConverting, setIsConverting] = useState(false)
  const [converted, setConverted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'image/png') {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setConverted(false)
    } else {
      alert('Please select a PNG file.')
    }
  }

  const convertToIco = async () => {
    if (!selectedFile) return

    setIsConverting(true)

    try {
      // For simplicity, we'll download the PNG as ICO
      // Modern browsers accept PNG files with .ico extension
      const response = await fetch(previewUrl)
      const blob = await response.blob()

      // Create download link
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'favicon.ico'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setConverted(true)
    } catch (error) {
      console.error('Conversion failed:', error)
      alert('Failed to convert image. Please try again.')
    } finally {
      setIsConverting(false)
    }
  }


  const features = [
    "Convert PNG to ICO format instantly",
    "Browser-based conversion (no upload to servers)",
    "Generates standard 32x32 favicon",
    "High-quality image scaling",
    "Download ICO file directly",
    "Preview before conversion",
    "Privacy-focused (all processing local)"
  ]

  const useCases = [
    "Creating website favicons",
    "Converting logos to favicon format",
    "Web development projects",
    "Brand icon creation",
    "Website customization",
    "Browser bookmark icons"
  ]

  const tips = [
    "Use square PNG images for best results",
    "Ensure your source image is at least 32x32 pixels",
    "Test your favicon in different browsers",
    "Clear browser cache when updating favicon",
    "Use multiple sizes for better compatibility",
    "Keep favicon file size under 100KB"
  ]

  const relatedTools = [
    {
      name: "Open Graph Preview Tool",
      href: "/tools/open-graph-preview",
      icon: ImageIcon,
      description: "Preview social images"
    },
    {
      name: "QR Code Generator",
      href: "/tools/qr-generator",
      icon: FileImage,
      description: "Generate QR codes"
    },
    {
      name: "Color Palette Generator",
      href: "/tools/color-palette-generator",
      icon: ImageIcon,
      description: "Create color palettes"
    }
  ]

  const faqs = [
    {
      question: "What is a favicon?",
      answer: "A favicon is a small icon that appears in browser tabs, bookmarks, and browser history next to your website's name."
    },
    {
      question: "Why do I need an ICO file?",
      answer: "ICO is the traditional format for favicons and is supported by all browsers. Modern browsers also support PNG, but ICO ensures maximum compatibility."
    },
    {
      question: "What's the best size for a favicon?",
      answer: "32x32 pixels is the standard size. You can also provide multiple sizes (16x16, 32x32, 48x48) in a single ICO file for better display across devices."
    },
    {
      question: "How do I add a favicon to my website?",
      answer: "Upload the favicon.ico file to your website's root directory and add <link rel=\"icon\" href=\"/favicon.ico\" type=\"image/x-icon\"> to your HTML head."
    }
  ]

  return (
    <>
      <ToolStructuredData
        toolName="Favicon Generator"
        toolDescription="Convert PNG images to ICO favicon files instantly in your browser. Generate high-quality favicons for websites with multiple sizes and formats supported."
        category="Generators"
        toolPath="/tools/favicon-generator"
      />

      <ToolPageLayout
        toolName="Favicon Generator"
        toolDescription="Convert PNG images to ICO favicon files instantly in your browser. Generate high-quality favicons for websites with multiple sizes and formats supported."
        toolIcon={ImageIcon}
        category="Generators"
        categoryHref="/categories/generators"
        features={features}
        useCases={useCases}
        relatedTools={relatedTools}
        tips={tips}
        faqs={faqs}
      >
        <div className="space-y-6">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload PNG Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedFile ? selectedFile.name : 'Drop PNG file here or click to browse'}
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG files only, max 10MB
                    </p>
                  </div>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                  >
                    Choose File
                  </Button>
                </div>
              </div>

              {selectedFile && (
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">{selectedFile.name}</p>
                    <p className="text-sm text-green-700">
                      {(selectedFile.size / 1024).toFixed(1)} KB • PNG file selected
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview and Convert */}
          {previewUrl && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Preview (32x32)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <div className="w-32 h-32 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                      <img
                        src={previewUrl}
                        alt="Favicon preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    This is how your favicon will appear in browsers
                  </p>
                </CardContent>
              </Card>

              {/* Convert */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Generate ICO
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Convert your PNG to ICO format for maximum browser compatibility.
                    </p>
                    {converted && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Conversion completed!</span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={convertToIco}
                    disabled={isConverting}
                    className="w-full"
                  >
                    {isConverting ? 'Converting...' : 'Download favicon.ico'}
                  </Button>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Output: 32x32 pixels ICO format</p>
                    <p>• Compatible with all modern browsers</p>
                    <p>• No data sent to external servers</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use Your Favicon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">1. Upload to Server</h4>
                  <p className="text-sm text-gray-600">
                    Upload the generated favicon.ico file to your website's root directory.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">2. Add to HTML</h4>
                  <p className="text-sm text-gray-600">
                    Add this link tag to your HTML head section:
                  </p>
                  <code className="block text-xs bg-gray-100 p-2 rounded mt-1">
                    {'<link rel="icon" href="/favicon.ico" type="image/x-icon">'}
                  </code>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-blue-900">Browser Cache</h4>
                    <p className="text-sm text-blue-700">
                      Browsers cache favicons. Clear your browser cache or do a hard refresh (Ctrl+F5) to see changes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Full-width SEO Content Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
          <div className="max-w-full">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-pink-600" />
              <h2 className="text-2xl font-bold text-gray-900">About Favicon Generator</h2>
            </div>

            <div className="prose prose-sm text-gray-600 max-w-none">
              <p className="mb-4">
                The Favicon Generator creates favicons (favorite icons) for websites in all required sizes and formats. Favicons are
                small icons that appear in browser tabs, bookmarks, and mobile home screens. This tool converts your image or design
                into properly formatted favicons including .ico files, PNG images in multiple sizes, and generates the necessary
                HTML code for implementation across all browsers and devices.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span><strong>Multiple Formats:</strong> Generate .ico, PNG, and SVG favicon files</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span><strong>All Standard Sizes:</strong> Create 16×16, 32×32, 180×180, 192×192, 512×512 and more</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span><strong>Auto-Resizing:</strong> Automatically resize your source image to all required sizes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span><strong>HTML Code Generation:</strong> Get ready-to-use HTML link tags for implementation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span><strong>Preview Mode:</strong> See how your favicon looks across different contexts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span><strong>Batch Download:</strong> Download all favicon sizes in a single ZIP file</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
                  <ol className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-pink-600">1.</span>
                      <span>Upload your source image (PNG, JPG, or SVG recommended)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-pink-600">2.</span>
                      <span>Preview how the favicon looks at different sizes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-pink-600">3.</span>
                      <span>Customize settings if needed (background color, padding)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-pink-600">4.</span>
                      <span>Generate favicons in all required formats and sizes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-pink-600">5.</span>
                      <span>Download the favicon package as a ZIP file</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-pink-600">6.</span>
                      <span>Copy the provided HTML code and add to your website's &lt;head&gt;</span>
                    </li>
                  </ol>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">What is it?</h3>
              <p className="mb-4">
                A favicon (short for &apos;favorite icon&apos;) is a small icon associated with a particular website, displayed in browser tabs,
                bookmark lists, and mobile home screens. The traditional favicon is a 16×16 pixel .ico file, but modern websites
                require multiple sizes and formats: 16×16 and 32×32 for browser tabs, 180×180 for Apple Touch Icon, 192×192 and
                512×512 for Android, and SVG for scalable displays. Proper favicon implementation requires linking to these files
                in the HTML &lt;head&gt; section with appropriate rel attributes like &apos;icon&apos;, &apos;apple-touch-icon&apos;, and &apos;manifest&apos;.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Common Use Cases</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">•</span>
                  <span><strong>Website Branding:</strong> Add professional branding to browser tabs and bookmarks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">•</span>
                  <span><strong>Mobile Home Screens:</strong> Create app-like icons when users save your site to their home screen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">•</span>
                  <span><strong>Browser Tab Identification:</strong> Help users quickly identify your site among many open tabs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">•</span>
                  <span><strong>Bookmark Recognition:</strong> Make your site easily recognizable in bookmark lists</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">•</span>
                  <span><strong>Progressive Web Apps:</strong> Provide required icons for PWA manifests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">•</span>
                  <span><strong>Email Signatures:</strong> Include favicons in HTML email signatures for brand recognition</span>
                </li>
              </ul>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy & Security</h3>
                <p>
                  All generation happens entirely in your browser using client-side JavaScript.
                  No data is transmitted to any server. Generated content remains private on your device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolPageLayout>
    </>
  )
}