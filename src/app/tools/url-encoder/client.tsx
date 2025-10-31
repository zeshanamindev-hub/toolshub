"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Link, Copy, Trash2, ArrowRightLeft } from "lucide-react"

export default function UrlEncoderClient() {
  const [inputText, setInputText] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")

  const processText = (text: string, mode: "encode" | "decode"): string => {
    if (!text) return ""
    
    try {
      if (mode === "encode") {
        return encodeURIComponent(text)
      } else {
        return decodeURIComponent(text)
      }
    } catch (error) {
      return "Invalid input for decoding"
    }
  }

  const outputText = processText(inputText, mode)

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
      await navigator.clipboard.writeText(outputText)
    } catch (err) {
      console.error("Failed to copy output text:", err)
    }
  }

  const handleSwapMode = () => {
    if (outputText && outputText !== "Invalid input for decoding") {
      setInputText(outputText)
    }
    setMode(mode === "encode" ? "decode" : "encode")
  }

  const examples = [
    {
      input: "Hello World!",
      encoded: "Hello%20World%21",
      description: "Basic text with space and exclamation"
    },
    {
      input: "user@example.com",
      encoded: "user%40example.com",
      description: "Email address with @ symbol"
    },
    {
      input: "price=$100&currency=USD",
      encoded: "price%3D%24100%26currency%3DUSD",
      description: "Query parameters with special characters"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Link className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            URL Encoder/Decoder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encode or decode URLs and text for safe transmission in web applications. 
            Convert special characters to percent-encoded format and vice versa.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Operation Mode</CardTitle>
              <CardDescription>
                Choose whether to encode or decode your text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  variant={mode === "encode" ? "default" : "outline"}
                  onClick={() => setMode("encode")}
                  className="flex-1"
                >
                  Encode
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSwapMode}
                  className="px-4"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant={mode === "decode" ? "default" : "outline"}
                  onClick={() => setMode("decode")}
                  className="flex-1"
                >
                  Decode
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle>
                {mode === "encode" ? "Text to Encode" : "Text to Decode"}
              </CardTitle>
              <CardDescription>
                {mode === "encode" 
                  ? "Enter text or URL that needs to be URL-encoded"
                  : "Enter URL-encoded text that needs to be decoded"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={mode === "encode" 
                  ? "Enter text to encode..."
                  : "Enter encoded text to decode..."
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none font-mono"
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
              <CardTitle className="text-green-600">
                {mode === "encode" ? "Encoded Result" : "Decoded Result"}
              </CardTitle>
              <CardDescription>
                {mode === "encode" 
                  ? "URL-encoded text safe for web transmission"
                  : "Human-readable decoded text"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={outputText}
                readOnly
                className="min-h-[200px] resize-none bg-gray-50 font-mono"
                placeholder={`${mode === "encode" ? "Encoded" : "Decoded"} result will appear here...`}
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleCopyOutput} 
                  variant="outline" 
                  size="sm"
                  disabled={!outputText || outputText === "Invalid input for decoding"}
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
                Common use cases for URL encoding and decoding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examples.map((example, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">
                      {example.description}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">Original:</div>
                        <div className="font-mono text-sm bg-white p-2 rounded border break-all">
                          {example.input}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">Encoded:</div>
                        <div className="font-mono text-sm bg-white p-2 rounded border break-all">
                          {example.encoded}
                        </div>
                      </div>
                    </div>
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
                What makes our URL encoder/decoder powerful
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-blue-600 font-semibold mb-2">Bidirectional</div>
                  <p className="text-sm text-gray-600">
                    Both encoding and decoding with easy mode switching
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-semibold mb-2">Real-time Processing</div>
                  <p className="text-sm text-gray-600">
                    Instant conversion as you type
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-semibold mb-2">Error Handling</div>
                  <p className="text-sm text-gray-600">
                    Graceful handling of invalid encoded text
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-orange-600 font-semibold mb-2">Copy & Paste</div>
                  <p className="text-sm text-gray-600">
                    Easy copying of input and output
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