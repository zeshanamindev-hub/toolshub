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
  AlertCircle,
  BarChart3,
  Settings
} from "lucide-react"

interface MinificationStats {
  originalSize: number
  minifiedSize: number
  compressionRatio: number
  spaceSaved: number
  originalLines: number
  minifiedLines: number
}

interface MinificationOptions {
  removeComments: boolean
  removeConsole: boolean
  preserveStrings: boolean
}

export default function JSMinifierPage() {
  const [js, setJs] = useState("")
  const [minifiedJs, setMinifiedJs] = useState("")
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState<MinificationOptions>({
    removeComments: true,
    removeConsole: false,
    preserveStrings: true
  })
  const [stats, setStats] = useState<MinificationStats>({
    originalSize: 0,
    minifiedSize: 0,
    compressionRatio: 0,
    spaceSaved: 0,
    originalLines: 0,
    minifiedLines: 0
  })

  const minifyJS = (jsCode: string, opts: MinificationOptions): string => {
    let minified = jsCode

    // Remove single-line comments (but preserve URLs and regex)
    if (opts.removeComments) {
      minified = minified.replace(/\/\/(?![^\r\n]*["'`]).*$/gm, '')
      // Remove multi-line comments
      minified = minified.replace(/\/\*[\s\S]*?\*\//g, '')
    }

    // Remove console statements if requested
    if (opts.removeConsole) {
      minified = minified.replace(/console\.(log|warn|error|info|debug)\([^)]*\);?/g, '')
    }

    // Remove unnecessary whitespace
    minified = minified
      // Replace multiple spaces with single space
      .replace(/\s+/g, ' ')
      // Remove spaces around operators and punctuation
      .replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, '$1')
      // Remove spaces after keywords
      .replace(/\b(if|for|while|function|return|var|let|const|else|switch|case|break|continue)\s+/g, '$1 ')
      // Remove trailing semicolons before closing braces
      .replace(/;}/g, '}')
      // Remove empty lines
      .replace(/^\s*[\r\n]/gm, '')
      // Trim
      .trim()

    return minified
  }

  const handleMinify = () => {
    if (!js.trim()) return

    try {
      const minified = minifyJS(js, options)
      setMinifiedJs(minified)

      // Calculate stats
      const originalSize = new Blob([js]).size
      const minifiedSize = new Blob([minified]).size
      const spaceSaved = originalSize - minifiedSize
      const compressionRatio = originalSize > 0 ? ((spaceSaved / originalSize) * 100) : 0
      const originalLines = js.split('\n').length
      const minifiedLines = minified.split('\n').length

      setStats({
        originalSize,
        minifiedSize,
        compressionRatio,
        spaceSaved,
        originalLines,
        minifiedLines
      })
    } catch (error) {
      console.error('Minification error:', error)
      alert('Error during minification. Please check your JavaScript syntax.')
    }
  }

  const handleCopy = async () => {
    if (!minifiedJs) return
    
    try {
      await navigator.clipboard.writeText(minifiedJs)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleDownload = () => {
    if (!minifiedJs) return

    const blob = new Blob([minifiedJs], { type: 'application/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'minified-script.js'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setJs("")
    setMinifiedJs("")
    setStats({
      originalSize: 0,
      minifiedSize: 0,
      compressionRatio: 0,
      spaceSaved: 0,
      originalLines: 0,
      minifiedLines: 0
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-50/30 to-orange-50/20 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-2xl">
                <Code className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-yellow-800 to-orange-800 bg-clip-text text-transparent mb-4 sm:mb-6">
            JavaScript Minifier
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Compress and optimize your JavaScript code by removing comments, whitespace, and unnecessary characters. 
            Reduce bundle size and improve application performance.
          </p>
        </div>

        {/* Options Panel */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-gray-600" />
              <span>Minification Options</span>
            </CardTitle>
            <CardDescription>
              Customize the minification process to suit your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.removeComments}
                  onChange={(e) => setOptions(prev => ({ ...prev, removeComments: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Remove Comments</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.removeConsole}
                  onChange={(e) => setOptions(prev => ({ ...prev, removeConsole: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Remove Console Logs</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.preserveStrings}
                  onChange={(e) => setOptions(prev => ({ ...prev, preserveStrings: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Preserve Strings</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        {minifiedJs && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <FileText className="h-5 w-5 text-yellow-600" />
                  <span className="text-2xl font-bold text-yellow-600">
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
                    {stats.originalLines} → {stats.minifiedLines}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-1">Lines Reduced</p>
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
                <Code className="h-6 w-6 text-yellow-600" />
                <span>Original JavaScript</span>
              </CardTitle>
              <CardDescription>
                Paste your JavaScript code here to minify and optimize
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={`// Paste your JavaScript code here
function calculateTotal(items) {
    let total = 0;
    
    // Loop through all items
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        if (item.price && item.quantity) {
            total += item.price * item.quantity;
            console.log('Added item:', item.name);
        }
    }
    
    return total;
}

// Usage example
const shoppingCart = [
    { name: 'Apple', price: 1.50, quantity: 3 },
    { name: 'Banana', price: 0.75, quantity: 6 }
];

const totalCost = calculateTotal(shoppingCart);
console.log('Total cost:', totalCost);`}
                value={js}
                onChange={(e) => setJs(e.target.value)}
                className="min-h-[400px] font-mono text-sm resize-none border-2 focus:border-yellow-300 transition-colors duration-200"
              />
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={handleMinify} 
                  disabled={!js.trim()}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Minify JavaScript
                </Button>
                <Button onClick={handleClear} variant="outline" size="default" disabled={!js.trim()}>
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
                <span>Minified JavaScript</span>
              </CardTitle>
              <CardDescription>
                Optimized and compressed JavaScript code ready for production
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea
                  value={minifiedJs}
                  readOnly
                  placeholder="Minified JavaScript will appear here..."
                  className="min-h-[400px] font-mono text-sm resize-none bg-gray-50 border-2"
                />
                {minifiedJs && (
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
                  disabled={!minifiedJs}
                  variant="outline"
                >
                  {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button 
                  onClick={handleDownload} 
                  disabled={!minifiedJs}
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
        <Card className="shadow-xl bg-gradient-to-r from-slate-50 to-yellow-50 border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl">Optimization Features</CardTitle>
            <CardDescription className="text-lg">
              Advanced JavaScript compression techniques for better performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Trash2,
                  title: "Remove Comments",
                  description: "Strips single-line and multi-line comments",
                  color: "text-red-600"
                },
                {
                  icon: Minimize2,
                  title: "Whitespace Removal",
                  description: "Eliminates unnecessary spaces and line breaks",
                  color: "text-blue-600"
                },
                {
                  icon: AlertCircle,
                  title: "Console Cleanup",
                  description: "Optionally removes console.log statements",
                  color: "text-yellow-600"
                },
                {
                  icon: Zap,
                  title: "Fast Processing",
                  description: "Instant minification with detailed statistics",
                  color: "text-green-600"
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

        {/* Tips Section */}
        <div className="mt-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <span>Minification Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Best Practices:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Always test minified code before deployment</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Keep original source files for debugging</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Use source maps in production for debugging</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Performance Benefits:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <Zap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Faster script loading and execution</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Reduced bandwidth usage and CDN costs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Improved user experience and SEO scores</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
