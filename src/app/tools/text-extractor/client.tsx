"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Filter, Copy, Trash2, Download, Eye, EyeOff } from "lucide-react"

interface ExtractionResult {
  type: string
  matches: string[]
  count: number
  pattern: RegExp
  description: string
}

export default function TextExtractorClient() {
  const [inputText, setInputText] = useState("")
  const [selectedExtractors, setSelectedExtractors] = useState<string[]>([
    "emails", "urls", "phones"
  ])
  const [showMatches, setShowMatches] = useState(true)

  const extractors = useMemo(() => [
    {
      id: "emails",
      name: "Email Addresses",
      pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      description: "Extract email addresses"
    },
    {
      id: "urls",
      name: "URLs",
      pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
      description: "Extract HTTP/HTTPS URLs"
    },
    {
      id: "phones",
      name: "Phone Numbers",
      pattern: /(?:\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b/g,
      description: "Extract phone numbers (US format)"
    },
    {
      id: "ips",
      name: "IP Addresses",
      pattern: /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g,
      description: "Extract IPv4 addresses"
    },
    {
      id: "dates",
      name: "Dates",
      pattern: /\b(?:\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}|\d{4}[-\/]\d{1,2}[-\/]\d{1,2}|\w{3,9}\s+\d{1,2},?\s+\d{4})\b/g,
      description: "Extract dates in various formats"
    },
    {
      id: "times",
      name: "Times",
      pattern: /\b(?:[01]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?(?:\s*[AaPp][Mm])?\b/g,
      description: "Extract time stamps"
    },
    {
      id: "numbers",
      name: "Numbers",
      pattern: /\b\d+(?:\.\d+)?\b/g,
      description: "Extract all numbers (integers and decimals)"
    },
    {
      id: "words",
      name: "Words Only",
      pattern: /\b[a-zA-Z]+\b/g,
      description: "Extract alphabetic words only"
    },
    {
      id: "hashtags",
      name: "Hashtags",
      pattern: /#[a-zA-Z0-9_]+/g,
      description: "Extract hashtags"
    },
    {
      id: "mentions",
      name: "Mentions",
      pattern: /@[a-zA-Z0-9_]+/g,
      description: "Extract @mentions"
    },
    {
      id: "creditcards",
      name: "Credit Cards",
      pattern: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
      description: "Extract credit card numbers (format: xxxx-xxxx-xxxx-xxxx)"
    },
    {
      id: "hexcolors",
      name: "Hex Colors",
      pattern: /#(?:[0-9a-fA-F]{3}){1,2}\b/g,
      description: "Extract hexadecimal color codes"
    }
  ], [])

  const extractionResults = useMemo<ExtractionResult[]>(() => {
    if (!inputText.trim()) return []

    return extractors
      .filter(extractor => selectedExtractors.includes(extractor.id))
      .map(extractor => {
        const matches = Array.from(inputText.matchAll(extractor.pattern))
          .map(match => match[0])
          .filter((match, index, arr) => arr.indexOf(match) === index) // Remove duplicates

        return {
          type: extractor.name,
          matches,
          count: matches.length,
          pattern: extractor.pattern,
          description: extractor.description
        }
      })
      .filter(result => result.count > 0)
  }, [inputText, selectedExtractors, extractors])

  const totalMatches = extractionResults.reduce((sum, result) => sum + result.count, 0)

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

  const handleCopyMatches = async (matches: string[]) => {
    try {
      await navigator.clipboard.writeText(matches.join('\n'))
    } catch (err) {
      console.error("Failed to copy matches:", err)
    }
  }

  const handleCopyAllMatches = async () => {
    const allMatches = extractionResults.flatMap(result => 
      result.matches.map(match => `${result.type}: ${match}`)
    )
    try {
      await navigator.clipboard.writeText(allMatches.join('\n'))
    } catch (err) {
      console.error("Failed to copy all matches:", err)
    }
  }

  const handleDownloadResults = () => {
    const results = extractionResults.map(result => ({
      type: result.type,
      count: result.count,
      matches: result.matches
    }))

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'extracted-text.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const toggleExtractor = (extractorId: string) => {
    setSelectedExtractors(prev => 
      prev.includes(extractorId)
        ? prev.filter(id => id !== extractorId)
        : [...prev, extractorId]
    )
  }

  const loadSample = () => {
    setInputText(`Contact us at support@example.com or call +1-555-123-4567.
Visit our website at https://www.example.com for more information.
Our office hours are 9:00 AM to 5:00 PM, Monday through Friday.
You can also reach us at admin@company.org or (555) 987-6543.
Check out our social media: @CompanyHandle #CompanyNews
Our server IP address is 192.168.1.100.
Meeting scheduled for 03/15/2024 at 2:30 PM.
Payment: 4532-1234-5678-9012 expires 12/25.
Brand color: #3B82F6, accent: #10B981
Temperature reading: 98.6°F, humidity: 45.2%`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Filter className="h-12 w-12 text-cyan-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Text Extractor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Extract emails, URLs, phone numbers, dates, and other patterns from text. 
            Perfect for data mining and content analysis.
          </p>
        </div>

        {/* Extractor Selection */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Extraction Types</CardTitle>
              <CardDescription>
                Select what you want to extract from your text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {extractors.map((extractor) => (
                  <label 
                    key={extractor.id}
                    className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedExtractors.includes(extractor.id)}
                      onChange={() => toggleExtractor(extractor.id)}
                      className="rounded"
                    />
                    <div>
                      <div className="font-medium text-sm">{extractor.name}</div>
                      <div className="text-xs text-gray-500">{extractor.description}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={loadSample} variant="outline" size="sm">
                  Load Sample Text
                </Button>
                <Button
                  onClick={() => setShowMatches(!showMatches)}
                  variant="outline"
                  size="sm"
                >
                  {showMatches ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showMatches ? "Hide" : "Show"} Results
                </Button>
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
                  Enter or paste the text you want to extract patterns from
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter text to extract patterns from..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[400px] resize-none font-mono text-sm"
                />

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Characters: {inputText.length}</span>
                  <span>Lines: {inputText.split('\n').length}</span>
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
          </div>

          {/* Summary */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Extraction Summary</CardTitle>
                <CardDescription>
                  Overview of found patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-4 bg-cyan-50 rounded-lg">
                  <div className="text-3xl font-bold text-cyan-600">{totalMatches}</div>
                  <div className="text-sm text-cyan-600">Total Matches Found</div>
                </div>
                
                {extractionResults.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {extractionResults.map((result, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{result.type}:</span>
                        <span className="font-medium">{result.count}</span>
                      </div>
                    ))}
                  </div>
                )}

                {totalMatches > 0 && (
                  <div className="mt-4 flex gap-2">
                    <Button onClick={handleCopyAllMatches} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All
                    </Button>
                    <Button onClick={handleDownloadResults} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pattern Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Pattern Examples</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <div>
                  <strong>Emails:</strong> user@domain.com
                </div>
                <div>
                  <strong>URLs:</strong> https://example.com
                </div>
                <div>
                  <strong>Phones:</strong> (555) 123-4567
                </div>
                <div>
                  <strong>IPs:</strong> 192.168.1.1
                </div>
                <div>
                  <strong>Dates:</strong> 12/31/2024, Dec 31, 2024
                </div>
                <div>
                  <strong>Times:</strong> 2:30 PM, 14:30
                </div>
                <div>
                  <strong>Colors:</strong> #FF0000, #3B82F6
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Extraction Results */}
        {showMatches && extractionResults.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Extraction Results</CardTitle>
                <CardDescription>
                  Found patterns organized by type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {extractionResults.map((result, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-lg">{result.type}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {result.count} found
                          </span>
                          <Button
                            onClick={() => handleCopyMatches(result.matches)}
                            variant="outline"
                            size="sm"
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {result.matches.map((match, matchIndex) => (
                          <div
                            key={matchIndex}
                            className="p-2 bg-gray-50 rounded border font-mono text-sm break-all"
                          >
                            {match}
                          </div>
                        ))}
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
                Advanced text extraction and pattern matching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-cyan-600 font-semibold mb-2">12 Pattern Types</div>
                  <p className="text-sm text-gray-600">
                    Extract emails, URLs, phones, dates, and more
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-blue-600 font-semibold mb-2">Duplicate Removal</div>
                  <p className="text-sm text-gray-600">
                    Automatically removes duplicate matches
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-semibold mb-2">Export Options</div>
                  <p className="text-sm text-gray-600">
                    Copy to clipboard or download as JSON
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-semibold mb-2">Real-time Results</div>
                  <p className="text-sm text-gray-600">
                    See extraction results instantly
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