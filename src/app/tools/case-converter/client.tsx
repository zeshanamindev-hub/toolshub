"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Type, Copy, Trash2 } from "lucide-react"

interface CaseConversion {
  name: string
  description: string
  convert: (text: string) => string
  color: string
}

export default function CaseConverterClient() {
  const [inputText, setInputText] = useState("")
  const [selectedCase, setSelectedCase] = useState<string>("uppercase")

  const caseConversions: CaseConversion[] = [
    {
      name: "UPPERCASE",
      description: "Convert all letters to uppercase",
      convert: (text: string) => text.toUpperCase(),
      color: "text-blue-600",
    },
    {
      name: "lowercase",
      description: "Convert all letters to lowercase",
      convert: (text: string) => text.toLowerCase(),
      color: "text-green-600",
    },
    {
      name: "Title Case",
      description: "Capitalize the first letter of each word",
      convert: (text: string) => 
        text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
      color: "text-purple-600",
    },
    {
      name: "Sentence case",
      description: "Capitalize the first letter of each sentence",
      convert: (text: string) => 
        text.toLowerCase().replace(/(^\w|[.!?]\s*\w)/g, (char) => char.toUpperCase()),
      color: "text-orange-600",
    },
    {
      name: "camelCase",
      description: "Remove spaces and capitalize each word except the first",
      convert: (text: string) => {
        const words = text.toLowerCase().split(/\s+/)
        return words[0] + words.slice(1).map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join("")
      },
      color: "text-red-600",
    },
    {
      name: "PascalCase",
      description: "Remove spaces and capitalize each word",
      convert: (text: string) => 
        text.toLowerCase().split(/\s+/).map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(""),
      color: "text-indigo-600",
    },
    {
      name: "snake_case",
      description: "Replace spaces with underscores and use lowercase",
      convert: (text: string) => 
        text.toLowerCase().replace(/\s+/g, "_"),
      color: "text-pink-600",
    },
    {
      name: "kebab-case",
      description: "Replace spaces with hyphens and use lowercase",
      convert: (text: string) => 
        text.toLowerCase().replace(/\s+/g, "-"),
      color: "text-teal-600",
    },
    {
      name: "CONSTANT_CASE",
      description: "Replace spaces with underscores and use uppercase",
      convert: (text: string) => 
        text.toUpperCase().replace(/\s+/g, "_"),
      color: "text-yellow-600",
    },
    {
      name: "aLtErNaTiNg CaSe",
      description: "Alternate between uppercase and lowercase letters",
      convert: (text: string) => 
        text.split("").map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join(""),
      color: "text-gray-600",
    },
    {
      name: "iNVERSE cASE",
      description: "Invert the case of each letter",
      convert: (text: string) => 
        text.split("").map(char => 
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join(""),
      color: "text-cyan-600",
    },
  ]

  const selectedConversion = caseConversions.find(c => 
    c.name.toLowerCase().replace(/\s+/g, "") === selectedCase
  ) || caseConversions[0]

  const convertedText = inputText ? selectedConversion.convert(inputText) : ""

  const handleClear = () => {
    setInputText("")
  }

  const handleCopyInput = async () => {
    try {
      await navigator.clipboard.writeText(inputText)
    } catch (err) {
      console.error("Failed to copy input text:", err)
    }
  }

  const handleCopyOutput = async () => {
    try {
      await navigator.clipboard.writeText(convertedText)
    } catch (err) {
      console.error("Failed to copy converted text:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Type className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Case Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert text between different case formats including UPPERCASE, lowercase, 
            Title Case, camelCase, snake_case, and more.
          </p>
        </div>

        {/* Case Selection */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Choose Case Format</CardTitle>
              <CardDescription>
                Select the case format you want to convert your text to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {caseConversions.map((conversion) => (
                  <Button
                    key={conversion.name}
                    variant={selectedCase === conversion.name.toLowerCase().replace(/\s+/g, "") ? "default" : "outline"}
                    className="h-auto p-3 text-left justify-start"
                    onClick={() => setSelectedCase(conversion.name.toLowerCase().replace(/\s+/g, ""))}
                  >
                    <div>
                      <div className={`font-semibold ${conversion.color}`}>
                        {conversion.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {conversion.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Text Conversion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle>Original Text</CardTitle>
              <CardDescription>
                Enter the text you want to convert
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
              />
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
              <CardTitle className={selectedConversion.color}>
                {selectedConversion.name}
              </CardTitle>
              <CardDescription>
                {selectedConversion.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={convertedText}
                readOnly
                className="min-h-[200px] resize-none bg-gray-50"
                placeholder="Converted text will appear here..."
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleCopyOutput} 
                  variant="outline" 
                  size="sm"
                  disabled={!convertedText}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Result
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Examples */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>
                See how different case formats work with sample text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Sample text: "hello world this is a test"
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {caseConversions.slice(0, 9).map((conversion) => (
                    <div key={conversion.name} className="p-3 bg-gray-50 rounded-lg">
                      <div className={`font-semibold text-sm ${conversion.color} mb-1`}>
                        {conversion.name}
                      </div>
                      <div className="text-sm font-mono bg-white p-2 rounded border">
                        {conversion.convert("hello world this is a test")}
                      </div>
                    </div>
                  ))}
                </div>
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
                What makes our case converter powerful
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-blue-600 font-semibold mb-2">11 Case Formats</div>
                  <p className="text-sm text-gray-600">
                    Support for all popular case formats
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-semibold mb-2">Instant Conversion</div>
                  <p className="text-sm text-gray-600">
                    Real-time conversion as you type
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-semibold mb-2">Copy & Paste</div>
                  <p className="text-sm text-gray-600">
                    Easy copying of input and output text
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-orange-600 font-semibold mb-2">Examples Included</div>
                  <p className="text-sm text-gray-600">
                    See examples for each case format
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