"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  FileText, 
  Copy, 
  Trash2, 
  Target,
  BookOpen,
  Clock,
  Hash,
  Type,
  AlignLeft,
  BarChart3,
  Download,
  Settings,
  TrendingUp,
  Eye,
  CheckCircle
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

export default function WordCounterPage() {
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
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'among', 'within', 'without', 'along', 'following', 'across', 'behind', 'beyond', 'plus', 'except', 'but', 'up', 'out', 'around', 'down', 'off', 'above', 'below', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'this', 'that', 'these', 'those'])
    
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
      label: "Sentences", 
      value: stats.sentences, 
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      icon: AlignLeft,
      bgColor: "bg-purple-50"
    },
    { 
      label: "Paragraphs", 
      value: stats.paragraphs, 
      color: "from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      icon: BookOpen,
      bgColor: "bg-orange-50"
    }
  ]

  const secondaryStats = [
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces, icon: Hash },
    { label: "Reading time", value: `${stats.readingTime} min`, icon: Clock },
    { label: "Speaking time", value: `${stats.speakingTime} min`, icon: Eye },
    { label: "Avg words/sentence", value: stats.avgWordsPerSentence, icon: BarChart3 },
    { label: "Avg sentences/paragraph", value: stats.avgSentencesPerParagraph, icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl">
                <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 sm:mb-6">
            Advanced Word Counter
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive text analysis with AI-powered insights. Count words, analyze patterns, 
            and track writing goals with beautiful visualizations.
          </p>
        </div>

        {/* Writing Goal Section */}
        {writingGoal.enabled && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">Writing Goal</span>
                    {isGoalReached() && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    isGoalReached() ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {stats[writingGoal.type]} / {writingGoal.target} {writingGoal.type}
                  </span>
                </div>
                <div className="w-full bg-white/60 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ease-out ${
                      isGoalReached() 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                    }`}
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {isGoalReached() 
                    ? '🎉 Congratulations! You\'ve reached your writing goal!' 
                    : `${writingGoal.target - (stats[writingGoal.type] || 0)} ${writingGoal.type} remaining to reach your goal`
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Text Input - Spans 3 columns */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl flex items-center space-x-2">
                      <Type className="h-6 w-6 text-blue-600" />
                      <span>Text Editor</span>
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      Start typing or paste your content for real-time analysis
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={exportStats} 
                      variant="outline" 
                      size="sm"
                      disabled={!text.trim()}
                      className="hidden sm:flex"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button
                      onClick={() => setWritingGoal(prev => ({ ...prev, enabled: !prev.enabled }))}
                      variant="outline"
                      size="sm"
                      className="hidden sm:flex"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      {writingGoal.enabled ? 'Hide' : 'Set'} Goal
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="✍️ Start writing your masterpiece here... The world is waiting for your words!"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[400px] resize-none text-base leading-relaxed border-2 focus:border-blue-300 transition-colors duration-200"
                  />
                  {text.trim() && (
                    <div className="absolute top-3 right-3 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-md">
                      Live counting...
                    </div>
                  )}
                </div>
                
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleCopy} variant="outline" size="sm" disabled={!text.trim()}>
                    {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </Button>
                  <Button onClick={handleClear} variant="outline" size="sm" disabled={!text.trim()}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button 
                    onClick={exportStats} 
                    variant="outline" 
                    size="sm"
                    disabled={!text.trim()}
                    className="sm:hidden"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Writing Goal Settings */}
                {writingGoal.enabled && (
                  <div className="border-t pt-4 mt-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Settings className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Goal Settings:</span>
                      </div>
                      <select 
                        value={writingGoal.type}
                        onChange={(e) => setWritingGoal(prev => ({ ...prev, type: e.target.value as 'words' | 'characters' | 'paragraphs' }))}
                        className="text-sm border rounded-md px-2 py-1"
                      >
                        <option value="words">Words</option>
                        <option value="characters">Characters</option>
                        <option value="paragraphs">Paragraphs</option>
                      </select>
                      <Input
                        type="number"
                        value={writingGoal.target}
                        onChange={(e) => setWritingGoal(prev => ({ ...prev, target: parseInt(e.target.value) || 0 }))}
                        className="w-20 h-8 text-sm"
                        min="1"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Statistics Panel - 1 column */}
          <div className="space-y-6">
            {/* Primary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {primaryStats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label} className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`h-5 w-5 ${stat.textColor}`} />
                        <span className={`text-2xl lg:text-3xl font-bold ${stat.textColor}`}>
                          {stat.value.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-700">{stat.label}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Secondary Stats */}
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Additional Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {secondaryStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{stat.value}</span>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advanced Analytics */}
        {text.trim() && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Most Common Words */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                  <span>Most Used Words</span>
                </CardTitle>
                <CardDescription>
                  Top words in your text (excluding common words)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats.mostCommonWords.length > 0 ? (
                  <div className="space-y-3">
                    {stats.mostCommonWords.map((word, index) => (
                      <div key={word.word} className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium capitalize">{word.word}</span>
                            <span className="text-sm text-gray-500">{word.count} times</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${Math.min(100, (word.count / Math.max(...stats.mostCommonWords.map(w => w.count))) * 100)}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Start typing to see word frequency analysis</p>
                )}
              </CardContent>
            </Card>

            {/* Keyword Density */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <span>Keyword Density</span>
                </CardTitle>
                <CardDescription>
                  Percentage of total words for each keyword
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats.keywordDensity.length > 0 ? (
                  <div className="space-y-3">
                    {stats.keywordDensity.map((keyword) => (
                      <div key={keyword.word} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                        <span className="font-medium capitalize text-emerald-800">{keyword.word}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-emerald-600">{keyword.density}%</span>
                          <div className="w-16 h-2 bg-emerald-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 transition-all duration-500"
                              style={{ width: `${Math.min(100, keyword.density * 10)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Word analysis will appear here</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Section */}
        <Card className="shadow-xl bg-gradient-to-r from-slate-50 to-blue-50 border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl">Powerful Features</CardTitle>
            <CardDescription className="text-lg">
              Everything you need for comprehensive text analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Clock,
                  title: "Real-time Analysis",
                  description: "Instant results as you type with smooth animations",
                  color: "text-blue-600"
                },
                {
                  icon: Target,
                  title: "Writing Goals",
                  description: "Set and track word, character, or paragraph targets",
                  color: "text-emerald-600"
                },
                {
                  icon: BarChart3,
                  title: "Advanced Analytics",
                  description: "Word frequency, keyword density, and reading metrics",
                  color: "text-purple-600"
                },
                {
                  icon: Download,
                  title: "Export Data",
                  description: "Download your analysis results in JSON format",
                  color: "text-orange-600"
                }
              ].map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="text-center group">
                    <div className="mx-auto w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* How it Works */}
        <div className="mt-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>How Analysis Works</CardTitle>
              <CardDescription>Understanding your text metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">📝 Words</p>
                  <p className="text-gray-600">Separated by spaces, punctuation ignored</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">📊 Sentences</p>
                  <p className="text-gray-600">Ended by periods, exclamation marks, or question marks</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">📋 Paragraphs</p>
                  <p className="text-gray-600">Separated by double line breaks or empty lines</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">⏱️ Reading Time</p>
                  <p className="text-gray-600">Based on 200 words per minute (speaking: 150 WPM)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}