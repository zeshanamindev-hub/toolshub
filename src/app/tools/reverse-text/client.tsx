"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RotateCcw, Copy, Trash2, Shuffle } from "lucide-react"

interface ReverseOperation {
  name: string
  description: string
  operation: (text: string) => string
  color: string
  example: string
}

export default function ReverseTextClient() {
  const [inputText, setInputText] = useState("")
  const [selectedOperation, setSelectedOperation] = useState<string>("characters")

  const reverseOperations: ReverseOperation[] = [
    {
      name: "Reverse Characters",
      description: "Reverse the entire text character by character",
      operation: (text: string) => text.split("").reverse().join(""),
      color: "text-blue-600",
      example: "hello world → dlrow olleh",
    },
    {
      name: "Reverse Words",
      description: "Reverse the order of words while keeping characters in each word intact",
      operation: (text: string) => text.split(/\s+/).reverse().join(" "),
      color: "text-green-600",
      example: "hello world → world hello",
    },
    {
      name: "Reverse Lines",
      description: "Reverse the order of lines in the text",
      operation: (text: string) => text.split("\n").reverse().join("\n"),
      color: "text-purple-600",
      example: "line1\\nline2 → line2\\nline1",
    },
    {
      name: "Reverse Each Word",
      description: "Reverse characters within each word separately",
      operation: (text: string) => 
        text.split(/(\s+)/).map(part => 
          /\s/.test(part) ? part : part.split("").reverse().join("")
        ).join(""),
      color: "text-orange-600",
      example: "hello world → olleh dlrow",
    },
    {
      name: "Reverse Sentences",
      description: "Reverse the order of sentences",
      operation: (text: string) => {
        const sentences = text.split(/([.!?]+\s*)/)
        const reversed = []
        for (let i = sentences.length - 1; i >= 0; i -= 2) {
          if (i > 0) {
            reversed.push(sentences[i - 1] + sentences[i])
          } else {
            reversed.push(sentences[i])
          }
        }
        return reversed.join("")
      },
      color: "text-red-600",
      example: "Hi there. How are you? → How are you? Hi there.",
    },
    {
      name: "Reverse Paragraphs",
      description: "Reverse the order of paragraphs",
      operation: (text: string) => 
        text.split(/\n\s*\n/).reverse().join("\n\n"),
      color: "text-indigo-600",
      example: "Para1\\n\\nPara2 → Para2\\n\\nPara1",
    },
    {
      name: "Mirror Text",
      description: "Create a mirror effect by appending reversed text",
      operation: (text: string) => text + " | " + text.split("").reverse().join(""),
      color: "text-pink-600",
      example: "hello → hello | olleh",
    },
    {
      name: "Reverse & Flip Case",
      description: "Reverse text and flip the case of each character",
      operation: (text: string) => 
        text.split("").reverse().map(char => 
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join(""),
      color: "text-teal-600",
      example: "Hello → OLLEh",
    },
  ]

  const selectedOp = reverseOperations.find(op => 
    op.name.toLowerCase().replace(/\s+/g, "").replace(/&/g, "") === selectedOperation
  ) || reverseOperations[0]

  const reversedText = inputText ? selectedOp.operation(inputText) : ""

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
      await navigator.clipboard.writeText(reversedText)
    } catch (err) {
      console.error("Failed to copy reversed text:", err)
    }
  }

  const handleSwap = () => {
    setInputText(reversedText)
  }

  const handleRandomExample = () => {
    const examples = [
      "Hello World! How are you today?",
      "The quick brown fox jumps over the lazy dog.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "JavaScript is a powerful programming language.",
      "Reverse text tools are very useful for creative writing.",
      "This is line one.\nThis is line two.\nThis is line three.",
      "First paragraph here.\n\nSecond paragraph here.\n\nThird paragraph here.",
    ]
    const randomExample = examples[Math.floor(Math.random() * examples.length)]
    setInputText(randomExample)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <RotateCcw className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Reverse Text Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reverse your text in multiple ways - by characters, words, lines, sentences, 
            and more. Perfect for creative writing, puzzles, and text manipulation.
          </p>
        </div>

        {/* Operation Selection */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Choose Reverse Method</CardTitle>
              <CardDescription>
                Select how you want to reverse your text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {reverseOperations.map((operation) => (
                  <Button
                    key={operation.name}
                    variant={selectedOperation === operation.name.toLowerCase().replace(/\s+/g, "").replace(/&/g, "") ? "default" : "outline"}
                    className="h-auto p-4 text-left justify-start"
                    onClick={() => setSelectedOperation(operation.name.toLowerCase().replace(/\s+/g, "").replace(/&/g, ""))}
                  >
                    <div className="w-full">
                      <div className={`font-bold ${operation.color} mb-1`}>
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
                Enter the text you want to reverse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your text here to reverse it..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[250px] resize-none"
              />
              <div className="flex gap-2 flex-wrap">
                <Button onClick={handleCopyInput} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={handleClear} variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={handleRandomExample} variant="outline" size="sm">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Random Example
                </Button>
              </div>
              
              {/* Input Stats */}
              <div className="text-sm text-gray-600 space-y-1">
                <div>Characters: {inputText.length.toLocaleString()}</div>
                <div>Words: {inputText.trim() ? inputText.trim().split(/\s+/).length : 0}</div>
                <div>Lines: {inputText ? inputText.split("\n").length : 0}</div>
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
                value={reversedText}
                readOnly
                className="min-h-[250px] resize-none bg-gray-50"
                placeholder="Reversed text will appear here..."
              />
              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={handleCopyOutput} 
                  variant="outline" 
                  size="sm"
                  disabled={!reversedText}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Result
                </Button>
                <Button 
                  onClick={handleSwap} 
                  variant="outline" 
                  size="sm"
                  disabled={!reversedText}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Use as Input
                </Button>
              </div>
              
              {/* Output Stats */}
              <div className="text-sm text-gray-600 space-y-1">
                <div>Characters: {reversedText.length.toLocaleString()}</div>
                <div>Words: {reversedText.trim() ? reversedText.trim().split(/\s+/).length : 0}</div>
                <div>Lines: {reversedText ? reversedText.split("\n").length : 0}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Examples */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>
                See how different reverse methods work with sample text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Sample text: "Hello World! How are you?"
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reverseOperations.slice(0, 6).map((operation) => (
                    <div key={operation.name} className="p-3 bg-gray-50 rounded-lg">
                      <div className={`font-bold text-sm ${operation.color} mb-2`}>
                        {operation.name}
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="font-mono text-gray-600">
                          Input: "Hello World! How are you?"
                        </div>
                        <div className="font-mono bg-white p-2 rounded border">
                          Output: "{operation.operation("Hello World! How are you?")}"
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Use Cases */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
              <CardDescription>
                When to use different reverse methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-blue-600 font-bold mb-2">Creative Writing</div>
                  <p className="text-sm text-gray-600">
                    Create interesting effects and hidden messages
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-bold mb-2">Puzzles & Games</div>
                  <p className="text-sm text-gray-600">
                    Generate word puzzles and brain teasers
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-bold mb-2">Data Processing</div>
                  <p className="text-sm text-gray-600">
                    Reverse data for analysis or formatting
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-orange-600 font-bold mb-2">Fun & Entertainment</div>
                  <p className="text-sm text-gray-600">
                    Create mirror text and amusing effects
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