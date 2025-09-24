"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Scissors, Copy, Trash2, RotateCcw } from "lucide-react"

interface SpaceOperation {
  name: string
  description: string
  operation: (text: string) => string
  color: string
  example: string
}

export default function RemoveSpacesPage() {
  const [inputText, setInputText] = useState("")
  const [selectedOperation, setSelectedOperation] = useState<string>("extraspaces")

  const spaceOperations: SpaceOperation[] = [
    {
      name: "Remove Extra Spaces",
      description: "Remove multiple consecutive spaces, keeping only single spaces",
      operation: (text: string) => text.replace(/\s+/g, " "),
      color: "text-blue-600",
      example: "hello    world" + " → " + "hello world",
    },
    {
      name: "Remove All Spaces",
      description: "Remove all spaces from the text",
      operation: (text: string) => text.replace(/\s/g, ""),
      color: "text-red-600",
      example: "hello world" + " → " + "helloworld",
    },
    {
      name: "Remove Leading Spaces",
      description: "Remove spaces at the beginning of each line",
      operation: (text: string) => text.replace(/^\s+/gm, ""),
      color: "text-green-600",
      example: "   hello world" + " → " + "hello world",
    },
    {
      name: "Remove Trailing Spaces",
      description: "Remove spaces at the end of each line",
      operation: (text: string) => text.replace(/\s+$/gm, ""),
      color: "text-purple-600",
      example: "hello world   " + " → " + "hello world",
    },
    {
      name: "Remove Leading & Trailing",
      description: "Remove spaces at the beginning and end of each line",
      operation: (text: string) => text.replace(/^\s+|\s+$/gm, ""),
      color: "text-orange-600",
      example: "  hello world  " + " → " + "hello world",
    },
    {
      name: "Normalize Whitespace",
      description: "Remove extra spaces, tabs, and normalize line breaks",
      operation: (text: string) => 
        text.replace(/[\t ]+/g, " ")
            .replace(/^\s+|\s+$/gm, "")
            .replace(/\n\s*\n/g, "\n"),
      color: "text-indigo-600",
      example: "hello\\t\\tworld\\n\\n\\ntest" + " → " + "hello world\\ntest",
    },
    {
      name: "Remove Empty Lines",
      description: "Remove lines that contain only whitespace",
      operation: (text: string) => 
        text.split("\n")
            .filter(line => line.trim().length > 0)
            .join("\n"),
      color: "text-pink-600",
      example: "line1\\n\\nline2" + " → " + "line1\\nline2",
    },
    {
      name: "Single Space Only",
      description: "Replace all whitespace characters with single spaces",
      operation: (text: string) => text.replace(/\s+/g, " ").trim(),
      color: "text-teal-600",
      example: "hello\\n\\tworld" + " → " + "hello world",
    },
  ]

  const selectedOp = spaceOperations.find(op => 
    op.name.toLowerCase().replace(/\s+/g, "").replace(/&/g, "") === selectedOperation
  ) || spaceOperations[0]

  const processedText = inputText ? selectedOp.operation(inputText) : ""

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
      await navigator.clipboard.writeText(processedText)
    } catch (err) {
      console.error("Failed to copy processed text:", err)
    }
  }

  const handleReset = () => {
    setInputText("")
    setSelectedOperation("extraspaces")
  }

  // Calculate statistics
  const inputStats = {
    characters: inputText.length,
    spaces: (inputText.match(/\s/g) || []).length,
    lines: inputText ? inputText.split("\n").length : 0,
  }

  const outputStats = {
    characters: processedText.length,
    spaces: (processedText.match(/\s/g) || []).length,
    lines: processedText ? processedText.split("\n").length : 0,
  }

  const spacesRemoved = inputStats.spaces - outputStats.spaces
  const charactersRemoved = inputStats.characters - outputStats.characters

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Scissors className="h-12 w-12 text-orange-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Remove Extra Spaces
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Clean up your text by removing extra spaces, normalizing whitespace, 
            and formatting text properly with various space removal options.
          </p>
        </div>

        {/* Operation Selection */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Choose Operation</CardTitle>
              <CardDescription>
                Select the type of space removal or text cleaning you need
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {spaceOperations.map((operation) => (
                  <Button
                    key={operation.name}
                    variant={selectedOperation === operation.name.toLowerCase().replace(/\s+/g, "").replace(/&/g, "") ? "default" : "outline"}
                    className="h-auto p-4 text-left justify-start"
                    onClick={() => setSelectedOperation(operation.name.toLowerCase().replace(/\s+/g, "").replace(/&/g, ""))}
                  >
                    <div className="w-full">
                      <div className={`font-semibold ${operation.color} mb-1`}>
                        {operation.name}
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        {operation.description}
                      </div>
                      <div className="text-xs font-mono bg-gray-100 p-1 rounded">
                        {operation.example}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Text Processing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle>Original Text</CardTitle>
              <CardDescription>
                Enter the text you want to clean up
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your text with extra spaces here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[250px] resize-none font-mono"
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
              
              {/* Input Stats */}
              <div className="text-sm text-gray-600 space-y-1">
                <div>Characters: {inputStats.characters.toLocaleString()}</div>
                <div>Spaces: {inputStats.spaces.toLocaleString()}</div>
                <div>Lines: {inputStats.lines.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle className={selectedOp.color}>
                {selectedOp.name}
              </CardTitle>
              <CardDescription>
                {selectedOp.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={processedText}
                readOnly
                className="min-h-[250px] resize-none bg-gray-50 font-mono"
                placeholder="Cleaned text will appear here..."
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleCopyOutput} 
                  variant="outline" 
                  size="sm"
                  disabled={!processedText}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Result
                </Button>
                <Button onClick={handleReset} variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              
              {/* Output Stats */}
              <div className="text-sm text-gray-600 space-y-1">
                <div>Characters: {outputStats.characters.toLocaleString()}</div>
                <div>Spaces: {outputStats.spaces.toLocaleString()}</div>
                <div>Lines: {outputStats.lines.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        {inputText && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Cleaning Results</CardTitle>
                <CardDescription>
                  Summary of changes made to your text
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {spacesRemoved.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Spaces Removed</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {charactersRemoved.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Characters Removed</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {inputText ? Math.round((charactersRemoved / inputStats.characters) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600">Size Reduction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Powerful text cleaning capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-blue-600 font-semibold mb-2">8 Operations</div>
                  <p className="text-sm text-gray-600">
                    Multiple space removal and cleaning options
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-semibold mb-2">Real-time Preview</div>
                  <p className="text-sm text-gray-600">
                    See results instantly as you select operations
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-semibold mb-2">Statistics</div>
                  <p className="text-sm text-gray-600">
                    Track spaces and characters removed
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-orange-600 font-semibold mb-2">Examples</div>
                  <p className="text-sm text-gray-600">
                    See examples for each operation type
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