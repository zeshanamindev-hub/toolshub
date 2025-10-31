"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Link, Copy, Trash2, ArrowRightLeft, Info } from "lucide-react"

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

        {/* Full-width SEO Content Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
          <div className="max-w-full">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">About URL Encoder/Decoder</h2>
            </div>

            <div className="prose prose-sm text-gray-600 max-w-none">
              <p className="mb-4">
                The URL Encoder/Decoder is an essential web development tool that converts special characters in URLs and text into
                a percent-encoded format safe for transmission over the internet. URL encoding (also known as percent-encoding) replaces
                unsafe ASCII characters with a "%" followed by two hexadecimal digits, ensuring that URLs remain valid and functional
                regardless of the characters they contain.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span><strong>Bidirectional Conversion:</strong> Easily switch between encoding and decoding modes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span><strong>Real-time Processing:</strong> Instant conversion as you type with no delays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span><strong>Error Handling:</strong> Graceful handling of invalid encoded text with clear error messages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span><strong>Copy Functionality:</strong> One-click copying of both input and output text</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span><strong>Practical Examples:</strong> Built-in examples for common encoding scenarios</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
                  <ol className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">1.</span>
                      <span>Select "Encode" or "Decode" mode based on your needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">2.</span>
                      <span>Paste or type your text or URL into the input field</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">3.</span>
                      <span>View the converted result instantly in the output area</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">4.</span>
                      <span>Click "Copy Result" to copy the encoded/decoded text</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">5.</span>
                      <span>Use the swap button to quickly reverse the operation</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Encoding Examples</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <strong className="text-gray-900">Space character:</strong>
                      <code className="block bg-white px-2 py-1 rounded mt-1 font-mono">" " → "%20"</code>
                    </div>
                    <div>
                      <strong className="text-gray-900">@ symbol:</strong>
                      <code className="block bg-white px-2 py-1 rounded mt-1 font-mono">"@" → "%40"</code>
                    </div>
                    <div>
                      <strong className="text-gray-900">& symbol:</strong>
                      <code className="block bg-white px-2 py-1 rounded mt-1 font-mono">"&" → "%26"</code>
                    </div>
                    <div>
                      <strong className="text-gray-900">= symbol:</strong>
                      <code className="block bg-white px-2 py-1 rounded mt-1 font-mono">"=" → "%3D"</code>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">What is URL Encoding?</h3>
              <p className="mb-4">
                URL encoding is a mechanism for encoding information in a Uniform Resource Identifier (URI) so that it can be safely
                transmitted over the internet. URLs can only be sent over the internet using the ASCII character set. Since URLs often
                contain characters outside this set, they must be converted into a valid ASCII format. URL encoding replaces unsafe
                characters with a percent sign (%) followed by two hexadecimal digits representing the character's ASCII code.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Common Use Cases</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Query Parameters:</strong> Encode special characters in URL query strings (e.g., search terms, filters)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>API Requests:</strong> Properly format data sent to REST APIs and web services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Form Submissions:</strong> Encode form data before sending via GET or POST requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Email Links:</strong> Create mailto links with pre-filled subject lines and body text</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Social Media Sharing:</strong> Encode URLs for sharing on social platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Debugging:</strong> Decode encoded URLs to understand what data is being transmitted</span>
                </li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Characters That Need Encoding</h3>
                <p className="mb-3">The following characters are typically encoded in URLs:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm font-mono">
                  <div>Space → %20</div>
                  <div>! → %21</div>
                  <div>" → %22</div>
                  <div># → %23</div>
                  <div>$ → %24</div>
                  <div>% → %25</div>
                  <div>& → %26</div>
                  <div>' → %27</div>
                  <div>( → %28</div>
                  <div>) → %29</div>
                  <div>* → %2A</div>
                  <div>+ → %2B</div>
                  <div>, → %2C</div>
                  <div>/ → %2F</div>
                  <div>: → %3A</div>
                  <div>; → %3B</div>
                  <div>= → %3D</div>
                  <div>? → %3F</div>
                  <div>@ → %40</div>
                  <div>[ → %5B</div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">URL Encoding vs. Other Encoding Types</h3>
              <p className="mb-4">
                URL encoding is specifically designed for URLs and differs from other encoding methods. Unlike Base64 encoding (used
                for binary data), URL encoding preserves readability for simple ASCII text while only encoding special characters.
                It's also different from HTML entity encoding, which is used for displaying special characters in HTML documents.
                Each encoding method serves a specific purpose and should be used in the appropriate context.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy & Security</h3>
                <p>
                  All URL encoding and decoding operations are performed entirely in your browser using JavaScript. Your data never
                  leaves your device and is not sent to any server. This ensures complete privacy and security for all your conversions,
                  making it safe to use with sensitive URLs and data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}