"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Hash, 
  Copy, 
  RotateCcw, 
  Check,
  BarChart3,
  TrendingUp,
  Download
} from "lucide-react"



export default function LetterCounterClient() {
  const [text, setText] = useState("")
  const [copied, setCopied] = useState(false)
  const [sortBy, setSortBy] = useState<'alphabetical' | 'frequency' | 'percentage'>('frequency')
  const [showOnlyLetters, setShowOnlyLetters] = useState(true)

  const analysis = useMemo(() => {
    if (!text) return { letters: {}, total: 0, totalLetters: 0, totalChars: 0 }

    const letterCount: { [key: string]: number } = {}
    let totalLetters = 0
    const totalChars = text.length

    for (const char of text) {
      if (showOnlyLetters) {
        if (/[a-zA-Z]/.test(char)) {
          const letter = char.toLowerCase()
          letterCount[letter] = (letterCount[letter] || 0) + 1
          totalLetters++
        }
      } else {
        if (char !== ' ' && char !== '\n' && char !== '\t') {
          letterCount[char] = (letterCount[char] || 0) + 1
          totalLetters++
        }
      }
    }

    return {
      letters: letterCount,
      total: Object.keys(letterCount).length,
      totalLetters,
      totalChars
    }
  }, [text, showOnlyLetters])

  const sortedLetters = useMemo(() => {
    const entries = Object.entries(analysis.letters)
    
    switch (sortBy) {
      case 'alphabetical':
        return entries.sort(([a], [b]) => a.localeCompare(b))
      case 'frequency':
        return entries.sort(([, a], [, b]) => b - a)
      case 'percentage':
        return entries.sort(([, a], [, b]) => b - a)
      default:
        return entries
    }
  }, [analysis.letters, sortBy])

  const copyResults = async () => {
    const results = sortedLetters
      .map(([letter, count]) => {
        const percentage = ((count / analysis.totalLetters) * 100).toFixed(2)
        return `${letter}: ${count} (${percentage}%)`
      })
      .join('\n')
    
    const summary = `Letter Frequency Analysis\n${'='.repeat(25)}\nTotal characters: ${analysis.totalChars}\nTotal letters analyzed: ${analysis.totalLetters}\nUnique letters: ${analysis.total}\n\n${results}`
    
    await navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadResults = () => {
    const results = sortedLetters
      .map(([letter, count]) => {
        const percentage = ((count / analysis.totalLetters) * 100).toFixed(2)
        return `${letter},${count},${percentage}%`
      })
      .join('\n')
    
    const csv = `Letter,Count,Percentage\n${results}`
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'letter-frequency-analysis.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearText = () => {
    setText("")
  }

  const getBarWidth = (count: number) => {
    if (analysis.totalLetters === 0) return 0
    return Math.max((count / Math.max(...Object.values(analysis.letters))) * 100, 2)
  }

  const getFrequencyColor = (percentage: number) => {
    if (percentage >= 8) return 'bg-red-500'
    if (percentage >= 6) return 'bg-orange-500'
    if (percentage >= 4) return 'bg-yellow-500'
    if (percentage >= 2) return 'bg-green-500'
    return 'bg-blue-500'
  }

  const vowels = ['a', 'e', 'i', 'o', 'u']
  const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']

  const vowelCount = vowels.reduce((sum, vowel) => sum + (analysis.letters[vowel] || 0), 0)
  const consonantCount = consonants.reduce((sum, consonant) => sum + (analysis.letters[consonant] || 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Hash className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Letter Counter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze letter frequency and character distribution in your text. 
            Perfect for linguistic analysis, cryptography, and text statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Text Input */}
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Text</CardTitle>
                <CardDescription>
                  Paste or type your text to analyze letter frequency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your text here to analyze letter frequency..."
                  className="min-h-[200px] resize-none"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={showOnlyLetters}
                        onChange={(e) => setShowOnlyLetters(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Letters only (A-Z)</span>
                    </label>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={clearText}
                    disabled={!text}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {text && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Letter Frequency Analysis</CardTitle>
                      <CardDescription>
                        Detailed breakdown of character usage
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyResults}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadResults}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        CSV
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Sort Options */}
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "frequency" | "alphabetical")}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="frequency">Frequency</option>
                      <option value="alphabetical">Alphabetical</option>
                      <option value="percentage">Percentage</option>
                    </select>
                  </div>

                  {/* Letter Frequency Chart */}
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {sortedLetters.map(([letter, count]) => {
                      const percentage = (count / analysis.totalLetters) * 100
                      return (
                        <div key={letter} className="flex items-center space-x-3">
                          <div className="w-8 text-center font-mono font-bold text-lg">
                            {letter}
                          </div>
                          <div className="flex-1 relative">
                            <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${getFrequencyColor(percentage)}`}
                                style={{ width: `${getBarWidth(count)}%` }}
                              />
                              <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-medium">
                                <span className="text-white mix-blend-difference">
                                  {count} times
                                </span>
                                <span className="text-white mix-blend-difference">
                                  {percentage.toFixed(2)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Characters:</span>
                  <span className="font-semibold">{analysis.totalChars.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Letters Analyzed:</span>
                  <span className="font-semibold">{analysis.totalLetters.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Unique Letters:</span>
                  <span className="font-semibold">{analysis.total}</span>
                </div>
                {showOnlyLetters && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Vowels:</span>
                      <span className="font-semibold">{vowelCount} ({((vowelCount / analysis.totalLetters) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Consonants:</span>
                      <span className="font-semibold">{consonantCount} ({((consonantCount / analysis.totalLetters) * 100).toFixed(1)}%)</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Most Common Letters */}
            {text && showOnlyLetters && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Top Letters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {sortedLetters.slice(0, 5).map(([letter, count], index) => {
                      const percentage = (count / analysis.totalLetters) * 100
                      return (
                        <div key={letter} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            <span className="font-mono font-bold text-lg uppercase">
                              {letter}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{count}</div>
                            <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* English Letter Frequency Reference */}
            {showOnlyLetters && (
              <Card>
                <CardHeader>
                  <CardTitle>English Letter Frequency</CardTitle>
                  <CardDescription>
                    Common letter frequencies in English text
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <div>
                    <strong>Most Common:</strong> E, T, A, O, I, N, S, H, R
                  </div>
                  <div>
                    <strong>Least Common:</strong> Q, X, J, Z
                  </div>
                  <div>
                    <strong>Vowels:</strong> A, E, I, O, U (~40% of text)
                  </div>
                  <div className="text-xs text-gray-500 mt-3">
                    * Frequencies vary by language and text type
                  </div>
                </CardContent>
              </Card>
            )}

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About This Tool</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  This letter counter analyzes the frequency of characters in your text, 
                  providing insights into character distribution patterns.
                </p>
                <p>
                  <strong>Use cases:</strong> Cryptography, linguistic analysis, 
                  writing analysis, and educational purposes.
                </p>
                <p>
                  <strong>Privacy:</strong> All analysis is performed locally in your browser.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}