"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RotateCcw, Copy, Trash2, Shuffle, CheckCircle, XCircle } from "lucide-react"

export default function PalindromeCheckerClient() {
  const [inputText, setInputText] = useState("")

  const cleanText = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]/g, "")
  }

  const isPalindrome = (text: string) => {
    const cleaned = cleanText(text)
    return cleaned === cleaned.split("").reverse().join("")
  }

  const cleanedInput = cleanText(inputText)
  const palindromeResult = inputText.trim() ? isPalindrome(inputText) : null

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

  const handleCopyCleaned = async () => {
    try {
      await navigator.clipboard.writeText(cleanedInput)
    } catch (err) {
      console.error("Failed to copy cleaned text:", err)
    }
  }

  const handleRandomExample = () => {
    const examples = [
      "A man, a plan, a canal: Panama",
      "racecar",
      "Was it a car or a cat I saw?",
      "Madam",
      "Able was I ere I saw Elba",
      "12321",
      "No 'x' in Nixon",
      "Eva, can I see bees in a cave?",
      "A Santa at NASA",
      "Live on time, emit no evil",
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
            <RotateCcw className="h-12 w-12 text-cyan-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Palindrome Checker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check if your text reads the same forwards and backwards. Ignores case, spaces, and punctuation for accurate detection.
          </p>
        </div>

        {/* Text Processing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle>Input Text</CardTitle>
              <CardDescription>
                Enter the text you want to check for palindrome
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your text here to check if it's a palindrome..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
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
                <div>Cleaned Characters: {cleanedInput.length.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {palindromeResult === true && <CheckCircle className="h-5 w-5 text-green-600" />}
                {palindromeResult === false && <XCircle className="h-5 w-5 text-red-600" />}
                Result
              </CardTitle>
              <CardDescription>
                {palindromeResult === null
                  ? "Enter text to check"
                  : palindromeResult
                    ? "This is a palindrome!"
                    : "This is not a palindrome"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Cleaned Text:</div>
                <Textarea
                  value={cleanedInput}
                  readOnly
                  className="min-h-[100px] resize-none bg-gray-50 font-mono text-sm"
                  placeholder="Cleaned text will appear here..."
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={handleCopyCleaned}
                  variant="outline"
                  size="sm"
                  disabled={!cleanedInput}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Cleaned
                </Button>
              </div>

              {/* Result Stats */}
              {palindromeResult !== null && (
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Status: <span className={palindromeResult ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {palindromeResult ? "Palindrome" : "Not a Palindrome"}
                  </span></div>
                  <div>Reversed: {cleanedInput.split("").reverse().join("")}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Examples */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>
                Famous palindromes and test cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="font-semibold text-green-600">Palindromes:</div>
                  {[
                    "racecar",
                    "A man, a plan, a canal: Panama",
                    "Madam",
                    "12321",
                  ].map((example) => (
                    <div key={example} className="p-3 bg-green-50 rounded-lg">
                      <div className="font-mono text-sm text-gray-800">"{example}"</div>
                      <div className="text-xs text-green-600 mt-1">✓ Palindrome</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="font-semibold text-red-600">Non-Palindromes:</div>
                  {[
                    "hello world",
                    "This is not a palindrome",
                    "OpenAI",
                    "12345",
                  ].map((example) => (
                    <div key={example} className="p-3 bg-red-50 rounded-lg">
                      <div className="font-mono text-sm text-gray-800">"{example}"</div>
                      <div className="text-xs text-red-600 mt-1">✗ Not a Palindrome</div>
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
                When and why to use palindrome checking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-cyan-600 font-semibold mb-2">Word Games</div>
                  <p className="text-sm text-gray-600">
                    Check words in puzzles and crosswords
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-semibold mb-2">Programming</div>
                  <p className="text-sm text-gray-600">
                    Test algorithms and string manipulation
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-semibold mb-2">Education</div>
                  <p className="text-sm text-gray-600">
                    Learn about symmetry and patterns
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-orange-600 font-semibold mb-2">Fun & Creativity</div>
                  <p className="text-sm text-gray-600">
                    Create palindromic poems and phrases
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
