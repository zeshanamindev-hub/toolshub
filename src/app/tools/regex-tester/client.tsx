"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Copy, Trash2, AlertCircle, CheckCircle, Info } from "lucide-react"

interface RegexMatch {
  match: string
  index: number
  groups?: string[]
  namedGroups?: { [key: string]: string }
}

interface RegexResult {
  isValid: boolean
  error?: string
  matches: RegexMatch[]
  matchCount: number
}

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [testString, setTestString] = useState("")
  const [result, setResult] = useState<RegexResult>({ isValid: true, matches: [], matchCount: 0 })
  const [highlightedText, setHighlightedText] = useState("")

  const testRegex = useCallback(() => {
    if (!pattern) {
      setResult({ isValid: true, matches: [], matchCount: 0 })
      setHighlightedText(testString)
      return
    }

    try {
      const regex = new RegExp(pattern, flags)
      const matches: RegexMatch[] = []
      let match
      let highlightedString = testString

      // Handle global flag
      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            namedGroups: match.groups
          })
          
          // Prevent infinite loop
          if (match.index === regex.lastIndex) break
        }
      } else {
        match = regex.exec(testString)
        if (match) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            namedGroups: match.groups
          })
        }
      }

      // Create highlighted text
      if (matches.length > 0) {
        let offset = 0
        matches.forEach((m, index) => {
          const beforeMatch = highlightedString.substring(0, m.index + offset)
          const matchText = highlightedString.substring(m.index + offset, m.index + offset + m.match.length)
          const afterMatch = highlightedString.substring(m.index + offset + m.match.length)
          
          highlightedString = beforeMatch + 
            `<mark class="bg-yellow-200 px-1 rounded" data-match="${index}">${matchText}</mark>` + 
            afterMatch
          offset += `<mark class="bg-yellow-200 px-1 rounded" data-match="${index}"></mark>`.length - m.match.length
        })
      }

      setResult({
        isValid: true,
        matches,
        matchCount: matches.length
      })
      setHighlightedText(highlightedString)
    } catch (error) {
      setResult({
        isValid: false,
        error: error instanceof Error ? error.message : "Invalid regex",
        matches: [],
        matchCount: 0
      })
      setHighlightedText(testString)
    }
  }, [pattern, flags, testString])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      testRegex()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [testRegex])

  const handleCopyPattern = async () => {
    try {
      await navigator.clipboard.writeText(`/${pattern}/${flags}`)
    } catch (err) {
      console.error("Failed to copy pattern:", err)
    }
  }

  const handleClear = () => {
    setPattern("")
    setTestString("")
  }

  const flagOptions = [
    { flag: 'g', description: 'Global - Find all matches' },
    { flag: 'i', description: 'Ignore case - Case insensitive matching' },
    { flag: 'm', description: 'Multiline - ^ and $ match line breaks' },
    { flag: 's', description: 'Dotall - . matches newlines' },
    { flag: 'u', description: 'Unicode - Full unicode support' },
    { flag: 'y', description: 'Sticky - Match from lastIndex only' }
  ]

  const commonPatterns = [
    {
      name: "Email",
      pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
      description: "Basic email validation",
      testString: "Contact us at support@example.com or admin@test.org"
    },
    {
      name: "Phone Number",
      pattern: "\\(?\\d{3}\\)?[-\\s]?\\d{3}[-\\s]?\\d{4}",
      description: "US phone number format",
      testString: "Call us at (555) 123-4567 or 555-987-6543"
    },
    {
      name: "URL",
      pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
      description: "HTTP/HTTPS URLs",
      testString: "Visit https://www.example.com or http://test.org/page"
    },
    {
      name: "Date (MM/DD/YYYY)",
      pattern: "\\d{1,2}\\/\\d{1,2}\\/\\d{4}",
      description: "Date in MM/DD/YYYY format",
      testString: "Important dates: 12/25/2023, 1/1/2024, and 07/04/2023"
    },
    {
      name: "Credit Card",
      pattern: "\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}",
      description: "Credit card number format",
      testString: "Card numbers: 1234-5678-9012-3456 or 1234 5678 9012 3456"
    }
  ]

  const loadPattern = (patternData: typeof commonPatterns[0]) => {
    setPattern(patternData.pattern)
    setTestString(patternData.testString)
    setFlags("g")
  }


  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Search className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Regex Tester
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test and debug regular expressions with real-time matching, 
            highlighting, and detailed match information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Testing Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Regex Input */}
            <Card>
              <CardHeader>
                <CardTitle>Regular Expression</CardTitle>
                <CardDescription>
                  Enter your regex pattern and select flags
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-mono text-lg">/</span>
                  <Input
                    placeholder="Enter regex pattern..."
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="flex-1 font-mono"
                  />
                  <span className="text-gray-600 font-mono text-lg">/</span>
                  <Input
                    placeholder="flags"
                    value={flags}
                    onChange={(e) => setFlags(e.target.value)}
                    className="w-16 font-mono"
                  />
                </div>

                {/* Flags */}
                <div>
                  <div className="text-sm font-medium mb-2">Flags:</div>
                  <div className="flex flex-wrap gap-2">
                    {flagOptions.map((option) => (
                      <label key={option.flag} className="flex items-center gap-1 text-sm">
                        <input
                          type="checkbox"
                          checked={flags.includes(option.flag)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFlags(prev => prev + option.flag)
                            } else {
                              setFlags(prev => prev.replace(option.flag, ''))
                            }
                          }}
                          className="rounded"
                        />
                        <span className="font-mono font-bold">{option.flag}</span>
                        <span className="text-gray-600">- {option.description}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {result.isValid ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">
                        Valid regex - {result.matchCount} matches found
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600 font-medium">
                        Invalid regex: {result.error}
                      </span>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCopyPattern} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Pattern
                  </Button>
                  <Button onClick={handleClear} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Test String */}
            <Card>
              <CardHeader>
                <CardTitle>Test String</CardTitle>
                <CardDescription>
                  Enter the text you want to test against your regex
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter test string..."
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  className="min-h-[200px] resize-none font-mono"
                />
                
                <div className="text-sm text-gray-500">
                  Length: {testString.length} characters
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>
                  Highlighted matches and match details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Highlighted Text */}
                <div className="min-h-[200px] p-4 bg-gray-50 rounded border font-mono text-sm whitespace-pre-wrap">
                  {highlightedText ? (
                    <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
                  ) : (
                    <div className="text-gray-400">Test results will appear here...</div>
                  )}
                </div>

                {/* Match Details */}
                {result.matches.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-bold">Match Details:</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {result.matches.map((match, index) => (
                        <div key={index} className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                          <div className="font-medium">Match {index + 1}:</div>
                          <div className="font-mono">&quot;{match.match}&quot;</div>
                          <div className="text-gray-600">Position: {match.index}-{match.index + match.match.length}</div>
                          {match.groups && match.groups.length > 0 && (
                            <div className="text-gray-600">
                              Groups: {match.groups.map((group, i) => `$${i + 1}: "${group}"`).join(', ')}
                            </div>
                          )}
                          {match.namedGroups && Object.keys(match.namedGroups).length > 0 && (
                            <div className="text-gray-600">
                              Named groups: {Object.entries(match.namedGroups).map(([name, value]) => `${name}: "${value}"`).join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Common Patterns */}
            <Card>
              <CardHeader>
                <CardTitle>Common Patterns</CardTitle>
                <CardDescription>
                  Click to load popular regex patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {commonPatterns.map((patternData, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => loadPattern(patternData)}
                  >
                    <div>
                      <div className="font-medium">{patternData.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {patternData.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Reference</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div>
                  <strong>Character Classes:</strong><br />
                  <code className="bg-gray-100 px-1 rounded">.</code> - Any character<br />
                  <code className="bg-gray-100 px-1 rounded">\d</code> - Digit<br />
                  <code className="bg-gray-100 px-1 rounded">\w</code> - Word character<br />
                  <code className="bg-gray-100 px-1 rounded">\s</code> - Whitespace
                </div>
                <div>
                  <strong>Quantifiers:</strong><br />
                  <code className="bg-gray-100 px-1 rounded">*</code> - 0 or more<br />
                  <code className="bg-gray-100 px-1 rounded">+</code> - 1 or more<br />
                  <code className="bg-gray-100 px-1 rounded">?</code> - 0 or 1<br />
                  <code className="bg-gray-100 px-1 rounded">{`{n,m}`}</code> - Between n and m
                </div>
                <div>
                  <strong>Anchors:</strong><br />
                  <code className="bg-gray-100 px-1 rounded">^</code> - Start of line<br />
                  <code className="bg-gray-100 px-1 rounded">$</code> - End of line<br />
                  <code className="bg-gray-100 px-1 rounded">\b</code> - Word boundary
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Info className="h-5 w-5 inline mr-2" />
                  Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Test incrementally:</strong> Build your regex step by step 
                  to understand how each part works.
                </p>
                <p>
                  <strong>Use capturing groups:</strong> Parentheses create groups 
                  that can be referenced in matches.
                </p>
                <p>
                  <strong>Escape special characters:</strong> Use backslashes to 
                  match literal special characters.
                </p>
                <p>
                  <strong>Consider performance:</strong> Complex patterns can be slow 
                  on large texts.
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
                Comprehensive regex testing and debugging
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-indigo-600 font-bold mb-2">Real-time Testing</div>
                  <p className="text-sm text-gray-600">
                    See results instantly as you type
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-bold mb-2">Match Highlighting</div>
                  <p className="text-sm text-gray-600">
                    Visual highlighting of regex matches
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-blue-600 font-bold mb-2">Group Details</div>
                  <p className="text-sm text-gray-600">
                    Detailed information about capture groups
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-bold mb-2">Common Patterns</div>
                  <p className="text-sm text-gray-600">
                    Pre-built patterns for common use cases
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