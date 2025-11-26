"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Copy, Trash2, AlertTriangle, CheckCircle, Info } from "lucide-react"

interface PlatformLimit {
  name: string
  maxLength: number
  recommendedMax?: number
  description: string
  color: string
}

const platforms: PlatformLimit[] = [
  {
    name: "Google Title",
    maxLength: 600,
    recommendedMax: 50,
    description: "Google displays ~50-60 characters",
    color: "text-blue-600"
  },
  {
    name: "Twitter Card",
    maxLength: 70,
    description: "Twitter card titles",
    color: "text-sky-500"
  },
  {
    name: "Facebook OG",
    maxLength: 60,
    description: "Facebook Open Graph titles",
    color: "text-blue-700"
  },
  {
    name: "LinkedIn",
    maxLength: 60,
    description: "LinkedIn post titles",
    color: "text-blue-800"
  },
  {
    name: "Instagram",
    maxLength: 125,
    description: "Instagram caption limit",
    color: "text-pink-600"
  },
  {
    name: "SEO Title",
    maxLength: 60,
    description: "Recommended for SEO",
    color: "text-green-600"
  }
]

export default function HtmlCharacterCounterClient() {
  const [inputText, setInputText] = useState("")
  const [customLimit, setCustomLimit] = useState(60)
  const [showHTML, setShowHTML] = useState(false)

  const stats = useMemo(() => {
    const text = inputText
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
    const lines = text.split('\n').length

    // HTML entities count
    const htmlEntities = (text.match(/&[a-zA-Z0-9#]+;/g) || []).length

    // Check for HTML tags
    const hasHTML = /<[^>]*>/.test(text)
    const htmlTags = hasHTML ? (text.match(/<\/?[a-zA-Z][^>]*>/g) || []).length : 0

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      htmlEntities,
      hasHTML,
      htmlTags
    }
  }, [inputText])

  const getStatusForLimit = (current: number, limit: number, recommended?: number) => {
    if (current === 0) return { status: 'empty', color: 'text-gray-400', icon: Info }
    if (current > limit) return { status: 'over', color: 'text-red-600', icon: AlertTriangle }
    if (recommended && current > recommended) return { status: 'warning', color: 'text-yellow-600', icon: AlertTriangle }
    return { status: 'good', color: 'text-green-600', icon: CheckCircle }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inputText)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const handleClear = () => {
    setInputText("")
  }

  const stripHTML = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').replace(/&[a-zA-Z0-9#]+;/g, (match) => {
      const textarea = document.createElement('textarea')
      textarea.innerHTML = match
      return textarea.value
    })
  }

  const getPlainText = () => {
    return stripHTML(inputText)
  }

  const getWordCount = (text: string): number => {
    return text.trim() ? text.trim().split(/\s+/).length : 0
  }

  const getReadingTime = (wordCount: number): string => {
    const wordsPerMinute = 200
    const minutes = wordCount / wordsPerMinute
    if (minutes < 1) {
      return `${Math.ceil(minutes * 60)} sec`
    }
    return `${Math.ceil(minutes)} min`
  }


  const plainText = getPlainText()
  const plainStats = {
    characters: plainText.length,
    words: getWordCount(plainText)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            HTML Character Counter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Count characters, words, and check SEO limits for titles and meta descriptions.
            Perfect for optimizing content for search engines and social media.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Text Input */}
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Text</CardTitle>
                <CardDescription>
                  Paste your title, meta description, or any text to analyze
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your title, description, or text here..."
                  className="min-h-[120px] resize-none"
                />

                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleCopy} variant="outline" size="sm" disabled={!inputText}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Text
                  </Button>
                  <Button onClick={handleClear} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={showHTML}
                      onChange={(e) => setShowHTML(e.target.checked)}
                      className="rounded"
                    />
                    Show HTML entities
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Platform Limits */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Limits</CardTitle>
                <CardDescription>
                  Check how your text performs across different platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platforms.map((platform) => {
                    const status = getStatusForLimit(plainStats.characters, platform.maxLength, platform.recommendedMax)
                    const StatusIcon = status.icon

                    return (
                      <div key={platform.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <StatusIcon className={`h-4 w-4 ${status.color}`} />
                            <span className="font-medium text-sm">{platform.name}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{platform.description}</p>
                          <div className="flex items-center gap-4 text-xs">
                            <span className={`${plainStats.characters > platform.maxLength ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                              {plainStats.characters}/{platform.maxLength}
                            </span>
                            {platform.recommendedMax && (
                              <span className={`text-xs ${plainStats.characters > platform.recommendedMax ? 'text-yellow-600' : 'text-green-600'}`}>
                                Recommended: ≤{platform.recommendedMax}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Custom Limit Checker */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Limit Checker</CardTitle>
                <CardDescription>
                  Set your own character limit to check against
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Custom Limit:</label>
                  <Input
                    type="number"
                    min="1"
                    max="10000"
                    value={customLimit}
                    onChange={(e) => setCustomLimit(parseInt(e.target.value) || 60)}
                    className="w-24"
                  />
                  <span className="text-sm text-gray-600">characters</span>
                </div>

                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className={`text-2xl ${plainStats.characters > customLimit ? 'text-red-600' : 'text-green-600'}`}>
                    {plainStats.characters > customLimit ? '❌' : '✅'}
                  </div>
                  <div>
                    <div className="font-medium">
                      {plainStats.characters}/{customLimit} characters
                    </div>
                    <div className="text-sm text-gray-600">
                      {plainStats.characters > customLimit
                        ? `${plainStats.characters - customLimit} characters over limit`
                        : `${customLimit - plainStats.characters} characters remaining`
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Text Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Characters:</span>
                    <div className="font-bold text-lg">{stats.characters.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">No Spaces:</span>
                    <div className="font-bold text-lg">{stats.charactersNoSpaces.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Words:</span>
                    <div className="font-bold text-lg">{stats.words.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Sentences:</span>
                    <div className="font-bold text-lg">{stats.sentences.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Paragraphs:</span>
                    <div className="font-bold text-lg">{stats.paragraphs.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Lines:</span>
                    <div className="font-bold text-lg">{stats.lines.toLocaleString()}</div>
                  </div>
                </div>

                {stats.hasHTML && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>HTML Tags: <span className="font-bold">{stats.htmlTags}</span></div>
                      <div>HTML Entities: <span className="font-bold">{stats.htmlEntities}</span></div>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    <div>Reading Time: <span className="font-bold">{getReadingTime(stats.words)}</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plain Text Preview */}
            {stats.hasHTML && (
              <Card>
                <CardHeader>
                  <CardTitle>Plain Text Preview</CardTitle>
                  <CardDescription>
                    How search engines see your text
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded border max-h-32 overflow-y-auto">
                    {plainText || "No text entered"}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Characters: {plainStats.characters} | Words: {plainStats.words}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* SEO Tips */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Title Tags:</strong> Keep under 60 characters for optimal display
                </p>
                <p>
                  <strong>Meta Descriptions:</strong> Aim for 150-160 characters
                </p>
                <p>
                  <strong>Keywords:</strong> Include primary keyword near the beginning
                </p>
                <p>
                  <strong>CTR:</strong> Compelling titles improve click-through rates
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-bold text-sm">Multi-Platform</div>
                      <p className="text-xs text-gray-600">Check limits for all major platforms</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-bold text-sm">HTML Aware</div>
                      <p className="text-xs text-gray-600">Handles HTML entities and tags</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-bold text-sm">Real-time Analysis</div>
                      <p className="text-xs text-gray-600">Instant character and word counts</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}