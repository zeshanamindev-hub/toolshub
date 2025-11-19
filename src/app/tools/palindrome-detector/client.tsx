"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, Shuffle, Search, CheckCircle } from "lucide-react"

export default function PalindromeDetectorClient() {
  const [inputText, setInputText] = useState("")

  const cleanWord = (word: string) => {
    return word.toLowerCase().replace(/[^a-z0-9]/g, "")
  }

  const isPalindromeWord = (word: string) => {
    const cleaned = cleanWord(word)
    return cleaned.length > 1 && cleaned === cleaned.split("").reverse().join("")
  }

  const detectPalindromes = (text: string) => {
    const words = text.split(/\s+/)
    const palindromes = words.filter(word => isPalindromeWord(word))
    return [...new Set(palindromes)] // Remove duplicates
  }

  const highlightPalindromes = (text: string) => {
    const words = text.split(/(\s+)/)
    return words.map((word, index) => {
      if (isPalindromeWord(word)) {
        return <span key={index} className="bg-yellow-200 px-1 rounded">{word}</span>
      }
      return word
    })
  }

  const palindromes = inputText.trim() ? detectPalindromes(inputText) : []

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

  const handleCopyPalindromes = async () => {
    try {
      await navigator.clipboard.writeText(palindromes.join(", "))
    } catch (err) {
      console.error("Failed to copy palindromes:", err)
    }
  }

  const handleRandomExample = () => {
    const examples = [
      "A man, a plan, a canal: Panama. Madam, racecar is cool.",
      "Able was I ere I saw Elba. No 'x' in Nixon.",
      "Eva, can I see bees in a cave? A Santa at NASA.",
      "Live on time, emit no evil. Madam in Eden, I'm Adam.",
      "Was it a car or a cat I saw? Radar and level work too.",
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
            <Search className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Palindrome Detector
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Detect and highlight all palindromic words and phrases within your text. Perfect for finding hidden palindromes in larger texts.
          </p>
        </div>

        {/* Text Processing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle>Input Text</CardTitle>
              <CardDescription>
                Enter text to detect palindromic words
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your text here to detect palindromes..."
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
                <div>Palindromes Found: {palindromes.length}</div>
              </div>
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Detected Palindromes
              </CardTitle>
              <CardDescription>
                {palindromes.length === 0
                  ? "No palindromes detected"
                  : `${palindromes.length} palindrome${palindromes.length !== 1 ? 's' : ''} found`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Highlighted Text:</div>
                <div className="min-h-[100px] p-3 bg-gray-50 rounded border font-mono text-sm leading-relaxed">
                  {inputText ? highlightPalindromes(inputText) : "Highlighted text will appear here..."}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Palindrome Words:</div>
                <Textarea
                  value={palindromes.join(", ")}
                  readOnly
                  className="min-h-[80px] resize-none bg-gray-50 font-mono text-sm"
                  placeholder="Detected palindromes will appear here..."
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={handleCopyPalindromes}
                  variant="outline"
                  size="sm"
                  disabled={palindromes.length === 0}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Palindromes
                </Button>
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
                Texts with multiple palindromes to detect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Sample text: "A man, a plan, a canal: Panama. Madam, racecar is cool."
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-mono text-sm text-gray-800 mb-3">
                    {highlightPalindromes("A man, a plan, a canal: Panama. Madam, racecar is cool.")}
                  </div>
                  <div className="text-sm text-green-600 font-semibold">
                    Detected: {detectPalindromes("A man, a plan, a canal: Panama. Madam, racecar is cool.").join(", ")}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-purple-600 mb-2">Common Palindromes:</div>
                    <div className="text-sm space-y-1">
                      <div>radar, level, madam, racecar</div>
                      <div>deed, peep, noon, civic</div>
                      <div>rotor, kayak, refer, stats</div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-600 mb-2">Longer Examples:</div>
                    <div className="text-sm space-y-1">
                      <div>Able was I ere I saw Elba</div>
                      <div>A Santa at NASA</div>
                      <div>Live on time, emit no evil</div>
                    </div>
                  </div>
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
                When to use palindrome detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-purple-600 font-semibold mb-2">Literature Analysis</div>
                  <p className="text-sm text-gray-600">
                    Find palindromic words in poems and stories
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-semibold mb-2">Word Games</div>
                  <p className="text-sm text-gray-600">
                    Discover palindromes in crosswords and puzzles
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-indigo-600 font-semibold mb-2">Content Creation</div>
                  <p className="text-sm text-gray-600">
                    Identify palindromic elements in writing
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-orange-600 font-semibold mb-2">Language Learning</div>
                  <p className="text-sm text-gray-600">
                    Study symmetrical words and patterns
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
