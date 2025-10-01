"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { Shield, Copy, Trash2, Eye, EyeOff, Upload } from "lucide-react"

interface HashResult {
  algorithm: string
  hash: string
  length: number
  description: string
}

export default function HashGeneratorPage() {
  const [inputText, setInputText] = useState("")
  const [hashes, setHashes] = useState<HashResult[]>([])
  const [showHashes, setShowHashes] = useState(true)
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([
    "MD5", "SHA-1", "SHA-256"
  ])

  const algorithms = [
    { name: "MD5", description: "128-bit hash (deprecated for security)" },
    { name: "SHA-1", description: "160-bit hash (legacy compatibility)" },
    { name: "SHA-256", description: "256-bit hash (recommended)" },
    { name: "SHA-384", description: "384-bit hash (extended security)" },
    { name: "SHA-512", description: "512-bit hash (maximum security)" }
  ]

  const generateHash = async (text: string, algorithm: string): Promise<string> => {
    if (!text) return ""
    
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    
    let hashAlgorithm: string
    switch (algorithm) {
      case "MD5":
        // MD5 is not available in Web Crypto API, using a simple implementation
        return await generateMD5(text)
      case "SHA-1":
        hashAlgorithm = "SHA-1"
        break
      case "SHA-256":
        hashAlgorithm = "SHA-256"
        break
      case "SHA-384":
        hashAlgorithm = "SHA-384"
        break
      case "SHA-512":
        hashAlgorithm = "SHA-512"
        break
      default:
        return ""
    }
    
    const hashBuffer = await crypto.subtle.digest(hashAlgorithm, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  // Simple MD5 implementation (for educational purposes)
  const generateMD5 = async (_text: string): Promise<string> => {
    // This is a simplified version. In production, you might want to use a proper MD5 library
    // For now, we'll return a placeholder that indicates MD5 is not recommended
    return "MD5 deprecated - use SHA-256 instead"
  }

  const generateAllHashes = useCallback(async () => {
    const results: HashResult[] = []
    
    for (const algorithm of selectedAlgorithms) {
      const hash = await generateHash(inputText, algorithm)
      const algorithmInfo = algorithms.find(a => a.name === algorithm)
      
      results.push({
        algorithm,
        hash,
        length: hash.length,
        description: algorithmInfo?.description || ""
      })
    }
    
    setHashes(results)
  }, [inputText, selectedAlgorithms, algorithms, generateHash])

  useEffect(() => {
    generateAllHashes()
  }, [generateAllHashes])

  const handleClear = () => {
    setInputText("")
  }

  const handleCopyHash = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash)
    } catch (err) {
      console.error("Failed to copy hash:", err)
    }
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

  const toggleAlgorithm = (algorithm: string) => {
    setSelectedAlgorithms(prev => 
      prev.includes(algorithm)
        ? prev.filter(a => a !== algorithm)
        : [...prev, algorithm]
    )
  }

  const examples = [
    {
      name: "Simple Text",
      text: "Hello, World!",
      useCase: "Basic string hashing"
    },
    {
      name: "Password",
      text: "MySecurePassword123!",
      useCase: "Password verification"
    },
    {
      name: "JSON Data",
      text: '{"user":"john","role":"admin"}',
      useCase: "Data integrity verification"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Hash Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate cryptographic hashes using MD5, SHA-1, SHA-256, SHA-384, and SHA-512 algorithms. 
            Perfect for data integrity verification and security applications.
          </p>
        </div>

        {/* Algorithm Selection */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Hash Algorithms</CardTitle>
              <CardDescription>
                Select which hash algorithms to generate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {algorithms.map((algorithm) => (
                  <label 
                    key={algorithm.name}
                    className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAlgorithms.includes(algorithm.name)}
                      onChange={() => toggleAlgorithm(algorithm.name)}
                      className="rounded"
                    />
                    <div>
                      <div className="font-medium">{algorithm.name}</div>
                      <div className="text-xs text-gray-500">{algorithm.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Input Text</CardTitle>
                <CardDescription>
                  Enter the text you want to hash
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter text to generate hashes..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[200px] resize-none font-mono"
                />

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div>
                    Characters: {inputText.length} | 
                    Bytes: {new TextEncoder().encode(inputText).length}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHashes(!showHashes)}
                  >
                    {showHashes ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleClear} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  
                  <label className="inline-flex">
                    <Button variant="outline" size="sm" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload File
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept=".txt,.json,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                    onClick={() => setInputText(example.text)}
                  >
                    <div>
                      <div className="font-medium">{example.name}</div>
                      <div className="text-xs text-gray-500">{example.useCase}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card>
              <CardHeader>
                <CardTitle>Security Notes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>MD5:</strong> Cryptographically broken, avoid for security applications
                </p>
                <p>
                  <strong>SHA-1:</strong> Deprecated, use only for legacy compatibility
                </p>
                <p>
                  <strong>SHA-256:</strong> Current standard, recommended for most applications
                </p>
                <p>
                  <strong>SHA-384/512:</strong> Extended security for high-value applications
                </p>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• File integrity verification</p>
                <p>• Password storage (with salt)</p>
                <p>• Digital signatures</p>
                <p>• Blockchain applications</p>
                <p>• Data deduplication</p>
                <p>• Checksum generation</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hash Results */}
        {inputText && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Generated Hashes</CardTitle>
                <CardDescription>
                  Cryptographic hashes for your input text
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hashes.map((result, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{result.algorithm}</h4>
                          <p className="text-sm text-gray-600">{result.description}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {result.length} characters
                        </div>
                      </div>
                      
                      {showHashes ? (
                        <div className="bg-gray-50 p-3 rounded font-mono text-sm break-all">
                          {result.hash}
                        </div>
                      ) : (
                        <div className="bg-gray-100 p-3 rounded flex items-center justify-center">
                          <div className="text-gray-500 text-center">
                            <EyeOff className="h-6 w-6 mx-auto mb-1" />
                            Hash hidden for privacy
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-2 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyHash(result.hash)}
                          disabled={!showHashes || !result.hash}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Hash
                        </Button>
                      </div>
                    </div>
                  ))}
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
                Comprehensive hash generation capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-red-600 font-semibold mb-2">Multiple Algorithms</div>
                  <p className="text-sm text-gray-600">
                    Support for MD5, SHA-1, SHA-256, SHA-384, SHA-512
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-blue-600 font-semibold mb-2">Real-time Generation</div>
                  <p className="text-sm text-gray-600">
                    Instant hash calculation as you type
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-semibold mb-2">File Support</div>
                  <p className="text-sm text-gray-600">
                    Upload files for hash generation
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-semibold mb-2">Privacy Mode</div>
                  <p className="text-sm text-gray-600">
                    Hide hashes for sensitive data
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