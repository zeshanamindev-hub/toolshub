"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Braces, 
  Copy, 
  Trash2, 
  Check, 
  AlertTriangle, 
  Download,
  Upload,
  Indent,
  Minimize
} from "lucide-react"

interface ValidationResult {
  isValid: boolean
  error?: string
  lineNumber?: number
  position?: number
}

export default function JsonFormatterClient() {
  const [inputText, setInputText] = useState("")
  const [indentSize, setIndentSize] = useState(2)
  const [minified, setMinified] = useState(false)

  const validateJson = (text: string): ValidationResult => {
    if (!text.trim()) {
      return { isValid: true }
    }

    try {
      JSON.parse(text)
      return { isValid: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      const match = errorMessage.match(/position (\d+)/)
      const position = match ? parseInt(match[1]) : undefined
      
      let lineNumber = undefined
      if (position !== undefined) {
        const lines = text.substring(0, position).split('\n')
        lineNumber = lines.length
      }

      return {
        isValid: false,
        error: errorMessage,
        lineNumber,
        position
      }
    }
  }

  const formatJson = (text: string, indent: number, minimize: boolean = false): string => {
    if (!text.trim()) return ""
    
    try {
      const parsed = JSON.parse(text)
      return minimize
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, indent)
    } catch {
      return text // Return original if invalid
    }
  }

  const validation = validateJson(inputText)
  const formattedText = validation.isValid && inputText.trim() 
    ? formatJson(inputText, indentSize, minified)
    : ""

  const handleClear = () => {
    setInputText("")
  }

  const handleCopyInput = async () => {
    try {
      await navigator.clipboard.writeText(inputText)
    } catch (err) {
      console.error("Failed to copy input:", err)
    }
  }

  const handleCopyOutput = async () => {
    try {
      await navigator.clipboard.writeText(formattedText)
    } catch (err) {
      console.error("Failed to copy output:", err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([formattedText], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInputText(content)
      }
      reader.readAsText(file)
    }
  }

  const getJsonStats = () => {
    if (!validation.isValid || !inputText.trim()) {
      return { objects: 0, arrays: 0, properties: 0, size: 0 }
    }

    try {
      const parsed = JSON.parse(inputText)
      const stats = {
        objects: 0,
        arrays: 0,
        properties: 0,
        size: inputText.length
      }

      const count = (obj: unknown, isRoot = true) => {
        if (Array.isArray(obj)) {
          if (!isRoot) stats.arrays++
          obj.forEach(item => count(item, false))
        } else if (obj !== null && typeof obj === 'object') {
          if (!isRoot) stats.objects++
          const jsonObj = obj as { [key: string]: unknown }
          const keys = Object.keys(jsonObj)
          stats.properties += keys.length
          keys.forEach(key => count(jsonObj[key], false))
        }
      }

      count(parsed)
      return stats
    } catch {
      return { objects: 0, arrays: 0, properties: 0, size: 0 }
    }
  }

  const stats = getJsonStats()

  const examples = [
    {
      name: "Simple Object",
      json: '{"name":"John","age":30,"city":"New York"}'
    },
    {
      name: "Nested Object",
      json: '{"user":{"name":"John","profile":{"age":30,"address":{"city":"NYC","country":"USA"}}}}'
    },
    {
      name: "Array with Objects",
      json: '[{"id":1,"name":"Item 1"},{"id":2,"name":"Item 2"}]'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Braces className="h-12 w-12 text-orange-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            JSON Formatter & Validator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Format, validate, and beautify JSON data. Check syntax errors, 
            minify or prettify JSON, and analyze structure.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Formatting Options</CardTitle>
              <CardDescription>
                Customize how your JSON is formatted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="indent" className="text-sm font-medium">
                    Indent:
                  </label>
                  <Input
                    id="indent"
                    type="number"
                    min="1"
                    max="8"
                    value={indentSize}
                    onChange={(e) => setIndentSize(parseInt(e.target.value) || 2)}
                    className="w-16"
                  />
                  <span className="text-sm text-gray-500">spaces</span>
                </div>
                
                <Button
                  variant={minified ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMinified(!minified)}
                >
                  <Minimize className="h-4 w-4 mr-2" />
                  {minified ? "Minified" : "Minify"}
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    disabled={!validation.isValid || !inputText.trim()}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  
                  <label className="inline-flex">
                    <Button variant="outline" size="sm" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Tool */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle>JSON Input</CardTitle>
                <CardDescription>
                  Paste or type your JSON data here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter JSON data..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[300px] resize-none font-mono text-sm"
                />

                {/* Validation Status */}
                <div className="flex items-center gap-2">
                  {validation.isValid ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Valid JSON</span>
                    </>
                  ) : inputText.trim() ? (
                    <>
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600 font-medium">Invalid JSON</span>
                      {validation.error && (
                        <span className="text-sm text-red-600">
                          - {validation.error}
                          {validation.lineNumber && ` (Line ${validation.lineNumber})`}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="h-4 w-4 bg-gray-300 rounded-full" />
                      <span className="text-sm text-gray-500">Enter JSON to validate</span>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCopyInput} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={handleClear} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">
                  <Indent className="h-5 w-5 inline mr-2" />
                  Formatted JSON
                </CardTitle>
                <CardDescription>
                  Beautified and validated JSON output
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={formattedText}
                  readOnly
                  className="min-h-[300px] resize-none font-mono text-sm bg-gray-50"
                  placeholder="Formatted JSON will appear here..."
                />

                <div className="flex gap-2">
                  <Button 
                    onClick={handleCopyOutput} 
                    variant="outline" 
                    size="sm"
                    disabled={!formattedText}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Formatted
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>JSON Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Objects:</span>
                  <span className="text-sm font-medium">{stats.objects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Arrays:</span>
                  <span className="text-sm font-medium">{stats.arrays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Properties:</span>
                  <span className="text-sm font-medium">{stats.properties}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Size:</span>
                  <span className="text-sm font-medium">{stats.size} chars</span>
                </div>
                {formattedText && !minified && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Formatted:</span>
                    <span className="text-sm font-medium">{formattedText.length} chars</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {examples.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => setInputText(example.json)}
                  >
                    <div>
                      <div className="font-medium">{example.name}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {example.json.substring(0, 40)}...
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Validation:</strong> Automatically checks for syntax errors 
                  and highlights issues.
                </p>
                <p>
                  <strong>Formatting:</strong> Beautifies JSON with proper indentation 
                  and structure.
                </p>
                <p>
                  <strong>Minification:</strong> Removes unnecessary whitespace to 
                  reduce file size.
                </p>
                <p>
                  <strong>File Support:</strong> Upload .json files directly or 
                  download formatted results.
                </p>
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
                Comprehensive JSON processing capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-green-600 font-semibold mb-2">Real-time Validation</div>
                  <p className="text-sm text-gray-600">
                    Instant syntax checking with error details
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-blue-600 font-semibold mb-2">Smart Formatting</div>
                  <p className="text-sm text-gray-600">
                    Customizable indentation and minification
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-semibold mb-2">File Support</div>
                  <p className="text-sm text-gray-600">
                    Upload and download JSON files
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-orange-600 font-semibold mb-2">Statistics</div>
                  <p className="text-sm text-gray-600">
                    Detailed analysis of JSON structure
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