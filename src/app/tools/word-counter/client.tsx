"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ToolPageLayout from "@/components/layout/tool-page-layout"
import { ToolStructuredData } from "@/components/seo/tool-seo"
import { 
  FileText, 
  Copy, 
  Trash2, 
  Clock,
  Hash,
  Type,
  AlignLeft,
  BarChart3,
  Download,
  Settings,
  TrendingUp,
  CheckCircle,
  Target,
  Eye
} from "lucide-react"

interface TextStats {
  characters: number
  charactersNoSpaces: number
  words: number
  sentences: number
  paragraphs: number
  readingTime: number
  speakingTime: number
  avgWordsPerSentence: number
  avgSentencesPerParagraph: number
  mostCommonWords: Array<{ word: string; count: number }>
  keywordDensity: Array<{ word: string; density: number }>
}

interface WritingGoal {
  type: 'words' | 'characters' | 'paragraphs'
  target: number
  enabled: boolean
}

export default function WordCounterClient() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0,
    avgWordsPerSentence: 0,
    avgSentencesPerParagraph: 0,
    mostCommonWords: [],
    keywordDensity: []
  })
  
  const [writingGoal, setWritingGoal] = useState<WritingGoal>({
    type: 'words',
    target: 500,
    enabled: false
  })
  
  const [copied, setCopied] = useState(false)

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
    
    // Calculate speaking time (average 150 words per minute)
    const speakingTime = Math.ceil(words / 150)
    
    // Calculate averages
    const avgWordsPerSentence = sentences > 0 ? Math.round(words / sentences * 10) / 10 : 0
    const avgSentencesPerParagraph = paragraphs > 0 ? Math.round(sentences / paragraphs * 10) / 10 : 0
    
    // Find most common words (excluding common stop words)
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'])
    
    const wordCounts = new Map<string, number>()
    if (inputText.trim()) {
      const cleanWords = inputText.toLowerCase().match(/\b[a-z]+\b/g) || []
      cleanWords.forEach(word => {
        if (!stopWords.has(word) && word.length > 2) {
          wordCounts.set(word, (wordCounts.get(word) || 0) + 1)
        }
      })
    }
    
    const mostCommonWords = Array.from(wordCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }))
    
    // Calculate keyword density for top words
    const keywordDensity = mostCommonWords.map(({ word, count }) => ({
      word,
      density: Math.round((count / words) * 100 * 10) / 10
    }))

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      avgWordsPerSentence,
      avgSentencesPerParagraph,
      mostCommonWords,
      keywordDensity
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
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const exportStats = () => {
    const exportData = {
      text: text,
      statistics: {
        ...stats,
        timestamp: new Date().toISOString(),
        wordGoal: writingGoal.enabled ? writingGoal : null
      }
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `word-count-analysis-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getProgressPercentage = () => {
    if (!writingGoal.enabled) return 0
    const current = stats[writingGoal.type] || 0
    return Math.min(100, (current / writingGoal.target) * 100)
  }

  const isGoalReached = () => {
    if (!writingGoal.enabled) return false
    const current = stats[writingGoal.type] || 0
    return current >= writingGoal.target
  }

  const primaryStats = [
    { 
      label: "Words", 
      value: stats.words, 
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      icon: Type,
      bgColor: "bg-blue-50"
    },
    { 
      label: "Characters", 
      value: stats.characters, 
      color: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600",
      icon: Hash,
      bgColor: "bg-emerald-50"
    },
    { 
      label: "Characters (no spaces)", 
      value: stats.charactersNoSpaces, 
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      icon: Hash,
      bgColor: "bg-purple-50"
    },
    { 
      label: "Sentences", 
      value: stats.sentences, 
      color: "from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      icon: AlignLeft,
      bgColor: "bg-orange-50"
    }
  ]

  const secondaryStats = [
    { label: "Paragraphs", value: stats.paragraphs, icon: FileText },
    { label: "Reading Time", value: `${stats.readingTime} min`, icon: Eye },
    { label: "Speaking Time", value: `${stats.speakingTime} min`, icon: Clock },
    { label: "Avg Words/Sentence", value: stats.avgWordsPerSentence, icon: BarChart3 },
  ]

  const features = [
    "Real-time word and character counting",
    "Detailed text analysis including sentences and paragraphs",
    "Reading time estimation (200 words/minute)",
    "Speaking time calculation (150 words/minute)",
    "Most common words analysis with keyword density",
    "Writing goal tracker with progress visualization",
    "Export analysis results to JSON format",
    "Copy text functionality",
    "Advanced text statistics and averages"
  ]

  const useCases = [
    "Content writers checking article length requirements",
    "Students meeting essay word count limits",
    "Social media managers optimizing post lengths",
    "Bloggers analyzing content readability",
    "Authors tracking writing progress",
    "SEO specialists optimizing content length",
    "Copywriters adhering to character limits",
    "Researchers analyzing text density"
  ]

  const tips = [
    "Set writing goals to track your progress and stay motivated",
    "Use the reading time estimate to gauge content consumption",
    "Monitor keyword density to avoid over-optimization",
    "Keep sentences under 20 words for better readability",
    "Aim for 3-5 sentences per paragraph for online content",
    "Export your analysis for record keeping and comparison"
  ]

  const relatedTools = [
    {
      name: "Character Counter",
      href: "/tools/character-counter",
      icon: Hash,
      description: "Count characters for social media"
    },
    {
      name: "Text to ASCII",
      href: "/tools/text-to-ascii",
      icon: Type,
      description: "Convert text to ASCII codes"
    },
    {
      name: "Case Converter",
      href: "/tools/case-converter",
      icon: Type,
      description: "Change text case formatting"
    }
  ]

  const faqs = [
    {
      question: "How accurate is the word count?",
      answer: "Our word counter uses industry-standard algorithms that split text by whitespace and filter empty strings, providing highly accurate word counts that match most professional writing tools."
    },
    {
      question: "What reading speed is used for time calculations?",
      answer: "We use 200 words per minute for reading time (average adult reading speed) and 150 words per minute for speaking time (average presentation pace)."
    },
    {
      question: "Can I use this for academic writing?",
      answer: "Yes! Our word counter is perfect for academic writing, essays, research papers, and any content where word count requirements matter."
    },
    {
      question: "Does this tool store my text?",
      answer: "No, your text is processed entirely in your browser and never sent to our servers. Your content remains completely private."
    }
  ]

  return (
    <>
      <ToolStructuredData
        toolName="Word Counter"
        toolDescription="Count words, characters, paragraphs, and sentences in your text instantly. Advanced text analysis with reading time, keyword density, and writing goals."
        category="Text & Writing"
        toolPath="/tools/word-counter"
      />
      
      <ToolPageLayout
        toolName="Word Counter"
        toolDescription="Count words, characters, paragraphs, and sentences in your text instantly. Get detailed analysis with reading time estimates, keyword density, and writing goal tracking."
        toolIcon={FileText}
        category="Text & Writing"
        categoryHref="/categories/text-writing"
        features={features}
        useCases={useCases}
        relatedTools={relatedTools}
        tips={tips}
        faqs={faqs}
      >
        <div className="space-y-6">
          {/* Writing Goal Section */}
          {writingGoal.enabled && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Writing Goal: {writingGoal.target} {writingGoal.type}
                  </CardTitle>
                  {isGoalReached() && (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700">Progress: {stats[writingGoal.type]} / {writingGoal.target}</span>
                    <span className="font-medium text-blue-700">{Math.round(getProgressPercentage())}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isGoalReached()
                          ? 'bg-green-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${getProgressPercentage()}%` }}
                    />
                  </div>
                  {isGoalReached() && (
                    <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                      <CheckCircle className="h-4 w-4" />
                      Goal achieved! Great work!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Text Input Area */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Enter Your Text</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setWritingGoal({ ...writingGoal, enabled: !writingGoal.enabled })}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {writingGoal.enabled ? 'Hide' : 'Set'} Goal
                </Button>
                {text && (
                  <>
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleClear}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Writing Goal Settings */}
            {writingGoal.enabled && (
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Goal Type</label>
                      <select 
                        value={writingGoal.type}
                        onChange={(e) => setWritingGoal({ ...writingGoal, type: e.target.value as 'words' | 'characters' | 'paragraphs' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="words">Words</option>
                        <option value="characters">Characters</option>
                        <option value="paragraphs">Paragraphs</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Target</label>
                      <Input
                        type="number"
                        min="1"
                        value={writingGoal.target}
                        onChange={(e) => setWritingGoal({ ...writingGoal, target: parseInt(e.target.value) || 500 })}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        onClick={() => setWritingGoal({ ...writingGoal, enabled: false })}
                        className="w-full"
                      >
                        Remove Goal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Textarea
              placeholder="Type or paste your text here to analyze..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[300px] text-base leading-relaxed resize-y"
            />
          </div>

          {/* Primary Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {primaryStats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className={`${stat.bgColor} border-gray-200 hover:shadow-md transition-shadow`}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.textColor}`}>
                          {stat.value.toLocaleString()}
                        </p>
                      </div>
                      <div className={`p-2 rounded-lg bg-white/60`}>
                        <Icon className={`h-5 w-5 ${stat.textColor}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Secondary Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Advanced Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {secondaryStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="text-center">
                      <div className="flex justify-center mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Most Common Words */}
          {stats.mostCommonWords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Most Common Words
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.mostCommonWords.map((word, index) => {
                    const density = stats.keywordDensity[index]?.density || 0
                    return (
                      <div key={word.word} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-6 h-6 bg-primary text-white text-xs font-medium rounded-full">
                            {index + 1}
                          </span>
                          <span className="font-medium text-gray-900">{word.word}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{word.count} times</div>
                          <div className="text-xs text-gray-500">{density}% density</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Export Actions */}
          {text && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">Export Analysis</h3>
                    <p className="text-sm text-green-700">Download your text analysis results</p>
                  </div>
                  <Button onClick={exportStats} className="bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export JSON
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolPageLayout>
    </>
  )
}