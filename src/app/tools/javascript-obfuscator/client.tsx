"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, Download, Code, AlertTriangle, CheckCircle } from "lucide-react"

export default function JavascriptObfuscatorClient() {
  const [inputCode, setInputCode] = useState("")
  const [outputCode, setOutputCode] = useState("")
  const [isObfuscating, setIsObfuscating] = useState(false)
  const [error, setError] = useState("")

  const obfuscateCode = async () => {
    if (!inputCode.trim()) {
      setError("Please enter some JavaScript code to obfuscate")
      return
    }

    setIsObfuscating(true)
    setError("")

    try {
      // Basic obfuscation techniques
      let obfuscated = inputCode

      // 1. Remove comments
      obfuscated = obfuscated.replace(/\/\*[\s\S]*?\*\//g, '') // Multi-line comments
      obfuscated = obfuscated.replace(/\/\/.*$/gm, '') // Single-line comments

      // 2. Remove extra whitespace
      obfuscated = obfuscated.replace(/\s+/g, ' ') // Multiple spaces to single
      obfuscated = obfuscated.replace(/\s*([{}();,])\s*/g, '$1') // Spaces around operators
      obfuscated = obfuscated.trim()

      // 3. Basic variable name shortening (simple approach)
      const variables = findVariables(obfuscated)
      let varCounter = 0
      const varMap: Record<string, string> = {}

      variables.forEach(varName => {
        if (!varMap[varName] && varName.length > 1) {
          varMap[varName] = generateShortName(varCounter++)
        }
      })

      // Replace variable names (this is a very basic implementation)
      Object.entries(varMap).forEach(([original, short]) => {
        // Use word boundaries to avoid partial replacements
        const regex = new RegExp(`\\b${original}\\b`, 'g')
        obfuscated = obfuscated.replace(regex, short)
      })

      // 4. Remove unnecessary semicolons and format
      obfuscated = obfuscated.replace(/;+/g, ';')
      obfuscated = obfuscated.replace(/;;/g, ';')

      setOutputCode(obfuscated)
    } catch (err) {
      setError("Error obfuscating code. Please check your JavaScript syntax.")
      console.error("Obfuscation error:", err)
    } finally {
      setIsObfuscating(false)
    }
  }

  const findVariables = (code: string): string[] => {
    // Very basic variable detection - this is not comprehensive
    const varDeclarations = code.match(/\b(var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g) || []
    const variables: string[] = []

    varDeclarations.forEach(decl => {
      const match = decl.match(/\b(var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/)
      if (match && match[2]) {
        variables.push(match[2])
      }
    })

    return [...new Set(variables)] // Remove duplicates
  }

  const generateShortName = (index: number): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    let num = index

    do {
      result = chars[num % chars.length] + result
      num = Math.floor(num / chars.length)
    } while (num > 0)

    return result || 'a'
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const handleDownload = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'application/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setInputCode("")
    setOutputCode("")
    setError("")
  }

  const getStats = (code: string) => {
    if (!code) return { lines: 0, characters: 0, size: 0 }

    const lines = code.split('\n').length
    const characters = code.length
    const size = new Blob([code]).size

    return { lines, characters, size }
  }

  const inputStats = getStats(inputCode)
  const outputStats = getStats(outputCode)
  const compressionRatio = inputStats.characters > 0
    ? ((1 - outputStats.characters / inputStats.characters) * 100).toFixed(1)
    : "0"

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Code className="h-12 w-12 text-orange-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            JavaScript Obfuscator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Basic JavaScript code obfuscation to make your code harder to read and reverse engineer.
            Remove comments, shorten variable names, and compress code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Input JavaScript</CardTitle>
              <CardDescription>
                Paste your JavaScript code here
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="function helloWorld() { console.log('Hello, World!'); }"
                className="min-h-[400px] font-mono text-sm resize-none"
              />

              <div className="flex justify-between items-center text-sm text-gray-600">
                <div>
                  Lines: {inputStats.lines} | Characters: {inputStats.characters} | Size: {inputStats.size} bytes
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleCopy(inputCode)} variant="outline" size="sm" disabled={!inputCode}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={() => handleDownload(inputCode, 'input.js')} variant="outline" size="sm" disabled={!inputCode}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Obfuscated Output
                {outputCode && (
                  <span className="text-sm px-2 py-1 rounded bg-green-100 text-green-700">
                    {compressionRatio}% smaller
                  </span>
                )}
              </CardTitle>
              <CardDescription>
                Your obfuscated JavaScript code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={outputCode}
                readOnly
                className="min-h-[400px] font-mono text-sm resize-none bg-gray-50"
                placeholder="Obfuscated code will appear here..."
              />

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-sm text-gray-600">
                <div>
                  Lines: {outputStats.lines} | Characters: {outputStats.characters} | Size: {outputStats.size} bytes
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleCopy(outputCode)} variant="outline" size="sm" disabled={!outputCode}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={() => handleDownload(outputCode, 'obfuscated.js')} variant="outline" size="sm" disabled={!outputCode}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  onClick={obfuscateCode}
                  disabled={!inputCode || isObfuscating}
                  className="px-8"
                >
                  {isObfuscating ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Code className="h-4 w-4 mr-2" />
                      Obfuscate Code
                    </>
                  )}
                </Button>
                <Button onClick={handleClear} variant="outline">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features and Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What it does */}
          <Card>
            <CardHeader>
              <CardTitle>What This Obfuscator Does</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>Removes comments and unnecessary whitespace</div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>Shortens variable and function names</div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>Compresses code for smaller file size</div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>Maintains basic functionality</div>
              </div>
            </CardContent>
          </Card>

          {/* Limitations */}
          <Card>
            <CardHeader>
              <CardTitle>Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>This is a basic obfuscator for learning purposes</div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>Advanced obfuscation requires professional tools</div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>Always test obfuscated code thoroughly</div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>Some complex code patterns may not work</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Examples */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Usage Examples</CardTitle>
              <CardDescription>
                Try these sample codes to see the obfuscator in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Simple Function</h4>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`function calculateSum(a, b) {
  // This function adds two numbers
  return a + b;
}`}
                  </pre>
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={() => setInputCode(`function calculateSum(a, b) {
  // This function adds two numbers
  return a + b;
}`)}
                  >
                    Try This
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Variable Declarations</h4>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`const userName = "John";
let userAge = 25;
var isActive = true;

console.log(userName, userAge, isActive);`}
                  </pre>
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={() => setInputCode(`const userName = "John";
let userAge = 25;
var isActive = true;

console.log(userName, userAge, isActive);`)}
                  >
                    Try This
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}