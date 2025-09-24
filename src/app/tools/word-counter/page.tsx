"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText, Copy, Trash2 } from "lucide-react"

interface TextStats {
  characters: number
  charactersNoSpaces: number
  words: number
  sentences: number
  paragraphs: number
  readingTime: number
}

export default function WordCounterPage() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  })

  const calculateStats = (inputText: string): TextStats => {
    const characters = inputText.length
    const charactersNoSpaces = inputText.replace(/\s/g, "").length
    
    // Count words (split by whitespace and filter empty strings)
    const words = inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length
    
    // Count sentences (split by sentence endings)
    const sentences = inputText.trim() === "" ? 0 : inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    
    // Count paragraphs (split by double line breaks)
    const paragraphs = inputText.trim() === "" ? 0 : inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
    
    // Calculate reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200)

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
    }
  }

  useEffect(() => {
    setStats(calculateStats(text))
  }, [text])

  const handleClear = () => {
    setText("")
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const statCards = [
    { label: "Characters", value: stats.characters, color: "text-blue-600" },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces, color: "text-green-600" },
    { label: "Words", value: stats.words, color: "text-purple-600" },
    { label: "Sentences", value: stats.sentences, color: "text-orange-600" },
    { label: "Paragraphs", value: stats.paragraphs, color: "text-red-600" },
    { label: "Reading time (min)", value: stats.readingTime, color: "text-indigo-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Word Counter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Count words, characters, sentences, and paragraphs in your text. 
            Get detailed statistics and reading time estimates instantly.
          </p>
        </div>

        {/* Main Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Text Input */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Text</CardTitle>
                <CardDescription>
                  Type or paste your text below to get instant word count and statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Start typing or paste your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
                <div className="flex gap-2">
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Text
                  </Button>
                  <Button onClick={handleClear} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>
                  Real-time text analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {statCards.map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      {stat.label}
                    </span>
                    <span className={`text-lg font-bold ${stat.color}`}>
                      {stat.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle>How it works</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p><strong>Words:</strong> Separated by spaces</p>
                <p><strong>Sentences:</strong> Ended by . ! or ?</p>
                <p><strong>Paragraphs:</strong> Separated by empty lines</p>
                <p><strong>Reading time:</strong> Based on 200 words/minute</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                What makes our word counter special
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="text-blue-600 font-semibold mb-2">Real-time Counting</div>
                  <p className="text-sm text-gray-600">
                    See results update instantly as you type
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-semibold mb-2">Detailed Statistics</div>
                  <p className="text-sm text-gray-600">
                    Get comprehensive text analysis beyond just word count
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-semibold mb-2">Reading Time</div>
                  <p className="text-sm text-gray-600">
                    Estimate how long it takes to read your text
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