"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText, Copy, Trash2, ArrowRightLeft, Eye, EyeOff, Info } from "lucide-react"

export default function Base64ConverterClient() {
  const [inputText, setInputText] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [showOutput, setShowOutput] = useState(true)

  const processText = (text: string, mode: "encode" | "decode"): string => {
    if (!text) return ""
    
    try {
      if (mode === "encode") {
        return btoa(text)
      } else {
        return atob(text)
      }
    } catch {
      return "Invalid Base64 input"
    }
  }

  const outputText = processText(inputText, mode)
  const isValidOutput = outputText !== "Invalid Base64 input"

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
    if (isValidOutput) {
      setInputText(outputText)
    }
    setMode(mode === "encode" ? "decode" : "encode")
  }

  const getInputStats = () => {
    if (!inputText) return { chars: 0, bytes: 0, lines: 0 }
    return {
      chars: inputText.length,
      bytes: new TextEncoder().encode(inputText).length,
      lines: inputText.split('\n').length
    }
  }

  const getOutputStats = () => {
    if (!outputText || !isValidOutput) return { chars: 0, bytes: 0, efficiency: 0 }
    return {
      chars: outputText.length,
      bytes: new TextEncoder().encode(outputText).length,
      efficiency: Math.round((inputText.length / outputText.length) * 100)
    }
  }

  const inputStats = getInputStats()
  const outputStats = getOutputStats()

  const examples = [
    {
      input: "Hello, World!",
      encoded: "SGVsbG8sIFdvcmxkIQ==",
      description: "Simple text message"
    },
    {
      input: "The quick brown fox jumps over the lazy dog",
      encoded: "VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZw==",
      description: "Pangram sentence"
    },
    {
      input: '{"name": "John", "age": 30}',
      encoded: "eyJuYW1lIjogIkpvaG4iLCAiYWdlIjogMzB9",
      description: "JSON data structure"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Base64 Encoder/Decoder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert text to Base64 encoding for data transmission and storage, 
            or decode Base64 strings back to readable text.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Operation Mode</CardTitle>
              <CardDescription>
                Choose whether to encode to Base64 or decode from Base64
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  variant={mode === "encode" ? "default" : "outline"}
                  onClick={() => setMode("encode")}
                  className="flex-1"
                >
                  Encode to Base64
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSwapMode}
                  className="px-4"
                  disabled={!isValidOutput}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant={mode === "decode" ? "default" : "outline"}
                  onClick={() => setMode("decode")}
                  className="flex-1"
                >
                  Decode from Base64
                </Button>
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
                <CardTitle>
                  {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
                </CardTitle>
                <CardDescription>
                  {mode === "encode" 
                    ? "Enter plain text to convert to Base64"
                    : "Enter Base64-encoded text to decode"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder={mode === "encode" 
                    ? "Enter text to encode..."
                    : "Enter Base64 string to decode..."
                  }
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[200px] resize-none font-mono"
                />
                
                {/* Input Stats */}
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Characters: {inputStats.chars.toLocaleString()}</span>
                  <span>Bytes: {inputStats.bytes.toLocaleString()}</span>
                  <span>Lines: {inputStats.lines.toLocaleString()}</span>
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
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={isValidOutput ? "text-green-600" : "text-red-600"}>
                      {mode === "encode" ? "Base64 Encoded" : "Decoded Text"}
                    </CardTitle>
                    <CardDescription>
                      {mode === "encode" 
                        ? "Base64-encoded string ready for transmission"
                        : "Human-readable decoded text"
                      }
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowOutput(!showOutput)}
                  >
                    {showOutput ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {showOutput ? (
                  <Textarea
                    value={outputText}
                    readOnly
                    className={`min-h-[200px] resize-none font-mono ${
                      isValidOutput ? "bg-gray-50" : "bg-red-50 border-red-200"
                    }`}
                    placeholder={`${mode === "encode" ? "Base64" : "Decoded"} result will appear here...`}
                  />
                ) : (
                  <div className="min-h-[200px] bg-gray-100 rounded-md flex items-center justify-center border-2 border-dashed">
                    <div className="text-center text-gray-500">
                      <EyeOff className="h-8 w-8 mx-auto mb-2" />
                      <p>Output hidden for privacy</p>
                    </div>
                  </div>
                )}

                {/* Output Stats */}
                {isValidOutput && (
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>Characters: {outputStats.chars.toLocaleString()}</span>
                    <span>Bytes: {outputStats.bytes.toLocaleString()}</span>
                    {mode === "encode" && inputText && (
                      <span>Size increase: +{Math.round((outputStats.chars / inputStats.chars - 1) * 100)}%</span>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={handleCopyOutput} 
                    variant="outline" 
                    size="sm"
                    disabled={!outputText || !isValidOutput}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Result
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setInputText("Hello, World!")}
                >
                  Load Sample Text
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setInputText('{"message": "Hello from JSON"}')}
                >
                  Load Sample JSON
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setMode("decode")
                    setInputText("SGVsbG8sIFdvcmxkIQ==")
                  }}
                >
                  Load Sample Base64
                </Button>
              </CardContent>
            </Card>

            {/* About Base64 */}
            <Card>
              <CardHeader>
                <CardTitle>About Base64</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>What is Base64?</strong><br />
                  A binary-to-text encoding scheme that represents binary data 
                  in ASCII format.
                </p>
                <p>
                  <strong>Common Uses:</strong><br />
                  • Email attachments<br />
                  • Data URLs in web pages<br />
                  • API authentication<br />
                  • Storing binary data in text formats
                </p>
                <p>
                  <strong>Size Impact:</strong><br />
                  Base64 encoding increases data size by approximately 33%.
                </p>
              </CardContent>
            </Card>

            {/* Security Note */}
            <Card>
              <CardHeader>
                <CardTitle>Security Note</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>⚠️ Important:</strong> Base64 is encoding, NOT encryption. 
                  It provides no security and can be easily decoded by anyone.
                </p>
                <p>
                  Never use Base64 alone to protect sensitive information. 
                  Use proper encryption methods for security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Examples */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>
                Common Base64 encoding examples
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
                        <div className="text-xs font-medium text-gray-500 mb-1">Original Text:</div>
                        <div className="font-mono text-sm bg-white p-2 rounded border break-all">
                          {example.input}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">Base64 Encoded:</div>
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

        {/* Full-width SEO Content Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
          <div className="max-w-full">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">About Base64 Encoder/Decoder</h2>
            </div>

            <div className="prose prose-sm text-gray-600 max-w-none">
              <p className="mb-4">
                The Base64 Encoder/Decoder is a powerful tool that converts binary data into ASCII text format and vice versa.
                Base64 encoding is a binary-to-text encoding scheme that represents binary data in a printable ASCII string format
                by translating it into a radix-64 representation. This encoding method is widely used across the internet for
                transmitting data that needs to remain intact during transport across systems that are designed to handle text.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Bidirectional Conversion:</strong> Seamlessly switch between encoding and decoding with one click</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Real-time Stats:</strong> Track character count, byte size, and size increase percentage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Privacy Mode:</strong> Hide output with eye toggle for sensitive data processing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Error Handling:</strong> Clear error messages for invalid Base64 input</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Quick Examples:</strong> Pre-loaded samples for testing and learning</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
                  <ol className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">1.</span>
                      <span>Choose "Encode to Base64" or "Decode from Base64" mode</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">2.</span>
                      <span>Paste your text or Base64 string into the input field</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">3.</span>
                      <span>View the converted result instantly in the output area</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">4.</span>
                      <span>Review statistics to see size changes and byte counts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">5.</span>
                      <span>Copy the result with one click or use the swap button to reverse</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 my-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Base64 Encoding Examples</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <strong className="text-gray-900">Simple Text:</strong>
                    <code className="block bg-white px-2 py-1 rounded mt-1 font-mono text-xs">"Hello" → "SGVsbG8="</code>
                  </div>
                  <div>
                    <strong className="text-gray-900">With Spaces:</strong>
                    <code className="block bg-white px-2 py-1 rounded mt-1 font-mono text-xs">"Hello World" → "SGVsbG8gV29ybGQ="</code>
                  </div>
                  <div>
                    <strong className="text-gray-900">Numbers:</strong>
                    <code className="block bg-white px-2 py-1 rounded mt-1 font-mono text-xs">"12345" → "MTIzNDU="</code>
                  </div>
                  <div>
                    <strong className="text-gray-900">Special Characters:</strong>
                    <code className="block bg-white px-2 py-1 rounded mt-1 font-mono text-xs">"@#$%" → "QCMkJQ=="</code>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">What is Base64 Encoding?</h3>
              <p className="mb-4">
                Base64 is a group of binary-to-text encoding schemes that represent binary data in sequences of 24 bits that can be
                represented by four 6-bit Base64 digits. It uses 64 characters (A-Z, a-z, 0-9, +, /) to represent data, hence the
                name "Base64". The encoding process takes three bytes of binary data and converts them into four ASCII characters.
                This makes it possible to transmit binary data as text, which is essential for protocols like email (MIME), data URLs,
                and storing complex data in text-based formats like JSON or XML.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Common Use Cases</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Email Attachments:</strong> MIME email encoding for sending binary files via email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Data URLs:</strong> Embedding images and files directly in HTML, CSS, or JavaScript</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>API Authentication:</strong> Basic authentication headers and API tokens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>JSON Web Tokens (JWT):</strong> Encoding payload and signature in JWT authentication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Data Storage:</strong> Storing binary data in text-only databases or configuration files</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Web Development:</strong> Encoding form data and transmitting binary content over HTTP</span>
                </li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">⚠️ Important Security Notice</h3>
                <p className="mb-3">
                  <strong>Base64 is encoding, NOT encryption!</strong> Base64 encoding is reversible and provides no security
                  whatsoever. Anyone can easily decode Base64 strings back to their original form.
                </p>
                <ul className="space-y-1 text-sm">
                  <li>✗ Do NOT use Base64 to hide passwords or sensitive data</li>
                  <li>✗ Do NOT rely on Base64 for data security</li>
                  <li>✓ Use proper encryption (AES, RSA) for securing sensitive information</li>
                  <li>✓ Use Base64 only for encoding data for transport, not for security</li>
                </ul>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Size Impact of Base64 Encoding</h3>
              <p className="mb-4">
                One important characteristic of Base64 encoding is that it increases the size of the encoded data. Every 3 bytes
                of original data become 4 bytes of Base64-encoded data, resulting in approximately 33% size increase. For example,
                a 300 byte file will become approximately 400 bytes when Base64 encoded. This size increase should be considered
                when deciding whether to use Base64 encoding, especially for large files or bandwidth-constrained applications.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy & Security</h3>
                <p>
                  All Base64 encoding and decoding operations are performed entirely in your browser using client-side JavaScript.
                  Your data never leaves your device and is not transmitted to any server. This ensures complete privacy for all
                  your conversions, making it safe to use with any type of data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}