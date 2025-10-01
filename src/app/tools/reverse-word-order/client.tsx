"use client"

import { useState, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ToolPageLayout from "@/components/layout/tool-page-layout"
import { ToolStructuredData } from "@/components/seo/tool-seo"
import {
  RotateCcw,
  Copy,
  Trash2,
  Shuffle,
  Check,
  ArrowLeftRight,
  FileText,
  Hash,
  Type,
  Eye,
  Zap
} from "lucide-react"

export default function ReverseWordOrderClient() {
  const [inputText, setInputText] = useState("")
  const [copied, setCopied] = useState(false)

  const reverseWordOrder = (text: string): string => {
    if (!text.trim()) return ""
    // Split by whitespace, filter out empty strings, reverse, and join
    return text.trim().split(/\s+/).reverse().join(" ")
  }

  const reversedText = useMemo(() => reverseWordOrder(inputText), [inputText])

  const getStats = () => {
    const originalWords = inputText.trim() ? inputText.trim().split(/\s+/).length : 0
    const reversedWords = reversedText ? reversedText.split(/\s+/).length : 0
    const characters = inputText.length
    const charactersReversed = reversedText.length
    return { originalWords, reversedWords, characters, charactersReversed }
  }

  const stats = getStats()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reversedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const handleClear = () => {
    setInputText("")
    setCopied(false)
  }

  const handleRandomExample = () => {
    const examples = [
      "The quick brown fox jumps over the lazy dog",
      "To be or not to be that is the question",
      "All happy families are alike every unhappy family is unhappy in its own way",
      "It was the best of times it was the worst of times",
      "Ask not what your country can do for you ask what you can do for your country"
    ]
    const randomExample = examples[Math.floor(Math.random() * examples.length)]
    setInputText(randomExample)
  }

  const features = [
    "Instant word order reversal with real-time preview",
    "Preserves punctuation and formatting",
    "Detailed statistics showing word and character counts",
    "Copy reversed text to clipboard",
    "Random example generator for testing",
    "Clear and intuitive interface",
    "Works with any text length",
    "Perfect for creative writing and puzzles"
  ]

  const useCases = [
    "Creating reversed sentences for creative writing",
    "Analyzing sentence structure in linguistics",
    "Generating puzzles and brain teasers",
    "Text manipulation for art projects",
    "Reversing quotes for unique presentations",
    "Educational exercises in language learning",
    "Content creation for social media challenges",
    "Testing reading comprehension with reversed text"
  ]

  const tips = [
    "Use reversed text for creative writing prompts",
    "Try reversing famous quotes for interesting results",
    "Combine with other text tools for complex manipulations",
    "Use for language learning exercises",
    "Perfect for creating palindromic-like effects",
    "Great for puzzle creation and brain teasers",
    "Experiment with different sentence lengths"
  ]

  const relatedTools = [
    {
      name: "Reverse Text",
      href: "/tools/reverse-text",
      icon: RotateCcw,
      description: "Reverse characters in text"
    },
    {
      name: "Word Counter",
      href: "/tools/word-counter",
      icon: FileText,
      description: "Count words and analyze text"
    },
    {
      name: "Case Converter",
      href: "/tools/case-converter",
      icon: Type,
      description: "Change text case"
    }
  ]

  const faqs = [
    {
      question: "How does the word order reversal work?",
      answer: "The tool splits your text by spaces, reverses the order of the words, and joins them back together. Punctuation and formatting are preserved."
    },
    {
      question: "Does it preserve punctuation?",
      answer: "Yes, punctuation marks attached to words remain with their respective words during the reversal process."
    },
    {
      question: "Can I reverse very long texts?",
      answer: "Yes, the tool can handle texts of any length. Processing happens instantly in your browser."
    },
    {
      question: "What happens to multiple spaces?",
      answer: "Multiple consecutive spaces are treated as single word separators, and the output uses single spaces between words."
    }
  ]

  return (
    <>
      <ToolStructuredData
        toolName="Reverse Word Order Tool"
        toolDescription="Reverse the order of words in your text instantly. Perfect for creating unique text variations, puzzles, or analyzing sentence structure."
        category="Text & Writing"
        toolPath="/tools/reverse-word-order"
      />

      <ToolPageLayout
        toolName="Reverse Word Order Tool"
        toolDescription="Reverse the order of words in your text instantly. Create unique text variations, puzzles, or analyze sentence structure with real-time processing."
        toolIcon={ArrowLeftRight}
        category="Text & Writing"
        categoryHref="/categories/text-writing"
        features={features}
        useCases={useCases}
        relatedTools={relatedTools}
        tips={tips}
        faqs={faqs}
      >
        <div className="space-y-6">
          {/* Input and Output */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Original Text
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter text to reverse word order..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={handleCopy}
                    className="flex items-center gap-2"
                    disabled={!reversedText}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Result
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="flex items-center gap-2"
                    disabled={!inputText}
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleRandomExample}
                    className="flex items-center gap-2"
                  >
                    <Shuffle className="h-4 w-4" />
                    Random Example
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  Reversed Word Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
                  <div className="whitespace-pre-wrap break-words">
                    {reversedText || "Reversed text will appear here..."}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Text Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.originalWords}</div>
                  <div className="text-sm text-gray-600">Original Words</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.reversedWords}</div>
                  <div className="text-sm text-gray-600">Reversed Words</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{stats.characters}</div>
                  <div className="text-sm text-gray-600">Characters</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{stats.charactersReversed}</div>
                  <div className="text-sm text-gray-600">Reversed Characters</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="font-semibold text-gray-900">Simple Examples:</div>
                  {[
                    { original: "Hello world", reversed: "world Hello" },
                    { original: "The cat sat on the mat", reversed: "mat the on sat cat The" },
                    { original: "I love coding", reversed: "coding love I" }
                  ].map((example, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Original:</div>
                      <div className="font-medium text-gray-800 mb-2">"{example.original}"</div>
                      <div className="text-sm text-blue-600">→ "{example.reversed}"</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="font-semibold text-gray-900">Complex Examples:</div>
                  {[
                    { original: "To be or not to be", reversed: "be to not or be To" },
                    { original: "The quick brown fox", reversed: "fox brown quick The" },
                    { original: "All you need is love", reversed: "love is need you All" }
                  ].map((example, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Original:</div>
                      <div className="font-medium text-gray-800 mb-2">"{example.original}"</div>
                      <div className="text-sm text-green-600">→ "{example.reversed}"</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Before/After Comparison */}
          {inputText && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Before & After Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="font-semibold text-red-900 mb-2">Before (Original):</div>
                    <div className="text-sm text-gray-800 whitespace-pre-wrap">"{inputText}"</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-900 mb-2">After (Reversed):</div>
                    <div className="text-sm text-gray-800 whitespace-pre-wrap">"{reversedText}"</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolPageLayout>
    </>
  )
}
