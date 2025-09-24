"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, CheckCircle, XCircle, Search, Lightbulb } from "lucide-react"
import StructuredData from "@/components/structured-data"

interface PalindromeResult {
  isPalindrome: boolean
  originalText: string
  cleanedText: string
  reversedText: string
  length: number
  ignoreSpaces: boolean
  ignorePunctuation: boolean
  ignoreCase: boolean
}

export default function PalindromeChecker() {
  const [inputText, setInputText] = useState("")
  const [result, setResult] = useState<PalindromeResult | null>(null)
  const [ignoreSpaces, setIgnoreSpaces] = useState(true)
  const [ignorePunctuation, setIgnorePunctuation] = useState(true)
  const [ignoreCase, setIgnoreCase] = useState(true)

  const cleanText = (text: string): string => {
    let cleaned = text

    if (ignoreCase) {
      cleaned = cleaned.toLowerCase()
    }

    if (ignoreSpaces) {
      cleaned = cleaned.replace(/\s/g, '')
    }

    if (ignorePunctuation) {
      cleaned = cleaned.replace(/[^\w\s]/g, '')
    }

    return cleaned
  }

  const checkPalindrome = () => {
    if (!inputText.trim()) {
      setResult(null)
      return
    }

    const cleaned = cleanText(inputText)
    const reversed = cleaned.split('').reverse().join('')
    const isPalindrome = cleaned === reversed

    setResult({
      isPalindrome,
      originalText: inputText,
      cleanedText: cleaned,
      reversedText: reversed,
      length: cleaned.length,
      ignoreSpaces,
      ignorePunctuation,
      ignoreCase
    })
  }

  const handleClear = () => {
    setInputText("")
    setResult(null)
  }

  const getExamples = () => {
    return [
      { text: "racecar", description: "Simple word palindrome" },
      { text: "A man a plan a canal Panama", description: "Famous sentence palindrome" },
      { text: "race a car", description: "Not a palindrome" },
      { text: "Was it a car or a cat I saw?", description: "Question palindrome" },
      { text: "Madam", description: "Case-insensitive palindrome" },
      { text: "No 'x' in Nixon", description: "Phrase with punctuation" },
      { text: "Mr. Owl ate my metal worm", description: "Creative palindrome" },
      { text: "12321", description: "Numeric palindrome" }
    ]
  }

  const handleExampleClick = (exampleText: string) => {
    setInputText(exampleText)
  }

  const renderTextComparison = () => {
    if (!result) return null

    const { cleanedText, reversedText, isPalindrome } = result
    const maxLength = Math.max(cleanedText.length, reversedText.length)

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Cleaned Text (Forward)</Label>
            <div className="p-3 bg-gray-50 rounded-lg font-mono text-sm break-all">
              {cleanedText || "Empty"}
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Cleaned Text (Reversed)</Label>
            <div className="p-3 bg-gray-50 rounded-lg font-mono text-sm break-all">
              {reversedText || "Empty"}
            </div>
          </div>
        </div>

        {!isPalindrome && cleanedText.length > 0 && (
          <div>
            <Label className="text-sm font-medium text-gray-700">Character Comparison</Label>
            <div className="p-3 bg-gray-50 rounded-lg font-mono text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {cleanedText.split('').map((char, index) => (
                    <span
                      key={`forward-${index}`}
                      className={`inline-block w-6 h-6 text-center text-xs leading-6 m-0.5 rounded ${
                        char === reversedText[index]
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <div>
                  {reversedText.split('').map((char, index) => (
                    <span
                      key={`reverse-${index}`}
                      className={`inline-block w-6 h-6 text-center text-xs leading-6 m-0.5 rounded ${
                        char === cleanedText[index]
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Palindrome Checker",
    "description": "Check if text is a palindrome with customizable options for spaces, punctuation, and case sensitivity.",
    "url": "https://toolshub.com/tools/palindrome-checker",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Palindrome detection and verification",
      "Customizable checking options",
      "Visual character comparison",
      "Support for words, sentences, and phrases",
      "Example palindromes for testing"
    ]
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Palindrome Checker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check if your text is a palindrome - reads the same forwards and backwards. 
            Customize the checking rules to ignore spaces, punctuation, and case.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Palindrome Detection
            </CardTitle>
            <CardDescription>
              Enter text to check if it's a palindrome
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="input">Text to Check</Label>
              <Textarea
                id="input"
                placeholder="Enter text to check for palindrome..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[100px] mt-2"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Checking Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="ignoreCase"
                    checked={ignoreCase}
                    onChange={(e) => setIgnoreCase(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="ignoreCase" className="text-sm">
                    Ignore case (A = a)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="ignoreSpaces"
                    checked={ignoreSpaces}
                    onChange={(e) => setIgnoreSpaces(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="ignoreSpaces" className="text-sm">
                    Ignore spaces and whitespace
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="ignorePunctuation"
                    checked={ignorePunctuation}
                    onChange={(e) => setIgnorePunctuation(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="ignorePunctuation" className="text-sm">
                    Ignore punctuation and special characters
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={checkPalindrome} className="flex-1">
                Check Palindrome
              </Button>
              <Button onClick={handleClear} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            {result && (
              <div className="space-y-4">
                <div className="flex items-center justify-center p-6 rounded-lg border-2 border-dashed">
                  {result.isPalindrome ? (
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                      <div className="text-xl font-semibold text-green-700">
                        Yes, it's a palindrome! ✨
                      </div>
                      <div className="text-sm text-green-600 mt-1">
                        Reads the same forwards and backwards
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <XCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
                      <div className="text-xl font-semibold text-red-700">
                        No, it's not a palindrome
                      </div>
                      <div className="text-sm text-red-600 mt-1">
                        Reads differently forwards and backwards
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{result.length}</div>
                    <div className="text-sm text-gray-600">Characters</div>
                  </div>
                  <div className="text-center">
                    <Badge variant={result.ignoreCase ? "default" : "secondary"}>
                      {result.ignoreCase ? "Case Ignored" : "Case Sensitive"}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <Badge variant={result.ignoreSpaces ? "default" : "secondary"}>
                      {result.ignoreSpaces ? "Spaces Ignored" : "Spaces Counted"}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <Badge variant={result.ignorePunctuation ? "default" : "secondary"}>
                      {result.ignorePunctuation ? "Punctuation Ignored" : "Punctuation Counted"}
                    </Badge>
                  </div>
                </div>

                {renderTextComparison()}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Try These Examples
            </CardTitle>
            <CardDescription>
              Click on any example to test it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getExamples().map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example.text)}
                  className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
                >
                  <div className="font-medium text-gray-900 mb-1">"{example.text}"</div>
                  <div className="text-sm text-gray-600">{example.description}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">What is a Palindrome?</h4>
              <p className="text-sm text-blue-800 mb-3">
                A palindrome is a word, phrase, number, or other sequence of characters that reads 
                the same forward and backward. Examples include "racecar", "level", and "A man a plan a canal Panama".
              </p>
              <div className="text-sm text-blue-800">
                <strong>Types of palindromes:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Word palindromes: racecar, level, radar</li>
                  <li>Phrase palindromes: "A man a plan a canal Panama"</li>
                  <li>Number palindromes: 12321, 1001</li>
                  <li>Sentence palindromes: "Was it a car or a cat I saw?"</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}