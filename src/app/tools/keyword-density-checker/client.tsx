"use client"

import { useState, useEffect, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ToolPageLayout from "@/components/layout/tool-page-layout"
import { ToolStructuredData } from "@/components/seo/tool-seo"
import {
  FileText,
  Search,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Trash2
} from "lucide-react"

interface KeywordData {
  keyword: string
  count: number
  density: number
  status: 'good' | 'high' | 'low'
}

export default function KeywordDensityCheckerClient() {
  const [text, setText] = useState("")
  const [keywords, setKeywords] = useState<KeywordData[]>([])
  const [totalWords, setTotalWords] = useState(0)
  const [targetKeyword, setTargetKeyword] = useState("")
  const [targetDensity, setTargetDensity] = useState<KeywordData | null>(null)

  const analyzeText = useCallback(() => {
    if (!text.trim()) {
      setKeywords([])
      setTotalWords(0)
      return
    }

    // Count total words
    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    setTotalWords(words.length)

    // Extract keywords (words with 3+ characters, excluding common stop words)
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does',
      'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that',
      'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us',
      'them', 'my', 'your', 'his', 'its', 'our', 'their', 'what', 'which', 'who', 'when',
      'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other',
      'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very'
    ])

    const keywordCounts = new Map<string, number>()

    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '')
      if (cleanWord.length >= 3 && !stopWords.has(cleanWord)) {
        keywordCounts.set(cleanWord, (keywordCounts.get(cleanWord) || 0) + 1)
      }
    })

    // Convert to array and calculate density
    const keywordData: KeywordData[] = Array.from(keywordCounts.entries())
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: (count / words.length) * 100,
        status: getDensityStatus((count / words.length) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50) // Top 50 keywords

    setKeywords(keywordData)
  }, [text])

  useEffect(() => {
    analyzeText()
  }, [analyzeText])

  useEffect(() => {
    if (targetKeyword && keywords.length > 0) {
      const found = keywords.find(k =>
        k.keyword.toLowerCase() === targetKeyword.toLowerCase()
      )
      setTargetDensity(found || null)
    } else {
      setTargetDensity(null)
    }
  }, [targetKeyword, keywords])

  const getDensityStatus = (density: number): 'good' | 'high' | 'low' => {
    if (density < 0.5) return 'low'
    if (density > 3.0) return 'high'
    return 'good'
  }

  const clearText = () => {
    setText("")
    setTargetKeyword("")
  }

  const features = [
    "Analyze keyword density in real-time",
    "Identify over-optimized and under-optimized keywords",
    "Check target keyword density",
    "View top keywords by frequency",
    "SEO recommendations based on density",
    "Exclude common stop words automatically",
    "Support for long-form content analysis"
  ]

  const useCases = [
    "SEO content optimization",
    "Keyword research and analysis",
    "Content marketing strategy",
    "Blog post optimization",
    "Article writing for SEO",
    "Competitor content analysis",
    "Writing quality assessment"
  ]

  const tips = [
    "Aim for 0.5-3% keyword density for optimal SEO",
    "Don't over-optimize - Google penalizes keyword stuffing",
    "Focus on semantic keywords and related terms",
    "Use long-tail keywords for better targeting",
    "Balance keyword density with natural writing",
    "Monitor density across different content types"
  ]

  const relatedTools = [
    {
      name: "Word Counter",
      href: "/tools/word-counter",
      icon: FileText,
      description: "Count words and analyze text"
    },
    {
      name: "Text Extractor",
      href: "/tools/text-extractor",
      icon: Search,
      description: "Extract keywords and patterns"
    },
    {
      name: "Letter Counter",
      href: "/tools/letter-counter",
      icon: BarChart3,
      description: "Analyze character frequency"
    }
  ]

  const faqs = [
    {
      question: "What is keyword density?",
      answer: "Keyword density is the percentage of times a keyword appears in your content compared to the total number of words. It's calculated as (keyword count / total words) × 100."
    },
    {
      question: "What's the ideal keyword density for SEO?",
      answer: "The ideal keyword density is typically between 0.5% and 3%. Going below 0.5% may mean you're not optimizing enough, while going above 3% could be seen as keyword stuffing."
    },
    {
      question: "Does keyword density still matter for SEO?",
      answer: "While keyword density is less important than it used to be due to semantic search, it still plays a role in SEO. Focus on natural usage and semantic keywords rather than exact-match density."
    },
    {
      question: "Should I include stop words in density analysis?",
      answer: "No, stop words (common words like 'the', 'a', 'and') are typically excluded from keyword density analysis as they don't provide SEO value and would skew the results."
    }
  ]

  return (
    <>
      <ToolStructuredData
        toolName="Keyword Density Checker"
        toolDescription="Analyze keyword density in your content for SEO optimization. Check keyword frequency, density percentage, and get recommendations for optimal keyword usage."
        category="Text & Writing"
        toolPath="/tools/keyword-density-checker"
      />

      <ToolPageLayout
        toolName="Keyword Density Checker"
        toolDescription="Analyze keyword density in your content for SEO optimization. Check keyword frequency, density percentage, and get recommendations for optimal keyword usage."
        toolIcon={BarChart3}
        category="Text & Writing"
        categoryHref="/categories/text-writing"
        features={features}
        useCases={useCases}
        relatedTools={relatedTools}
        tips={tips}
        faqs={faqs}
      >
        <div className="space-y-6">
          {/* Text Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Content Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your content here to analyze keyword density..."
                className="min-h-[200px]"
              />

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Total words: <span className="font-bold">{totalWords.toLocaleString()}</span>
                </div>
                <Button variant="outline" size="sm" onClick={clearText}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Target Keyword Check */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Target Keyword Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder="Enter your target keyword..."
                />

                {targetDensity && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-blue-900">"{targetDensity.keyword}"</span>
                      <div className="flex items-center gap-2">
                        {targetDensity.status === 'good' && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {targetDensity.status === 'high' && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                        {targetDensity.status === 'low' && <AlertTriangle className="h-4 w-4 text-gray-600" />}
                        <span className={`text-sm font-medium ${
                          targetDensity.status === 'good' ? 'text-green-600' :
                          targetDensity.status === 'high' ? 'text-orange-600' : 'text-gray-600'
                        }`}>
                          {targetDensity.status === 'good' ? 'Good density' :
                           targetDensity.status === 'high' ? 'High density' : 'Low density'}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Count:</span>
                        <span className="font-bold ml-2">{targetDensity.count}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Density:</span>
                        <span className="font-bold ml-2">{targetDensity.density.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {!targetDensity && targetKeyword && keywords.length > 0 && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">Keyword "{targetKeyword}" not found in the content.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Keyword Density Results */}
          {keywords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Keyword Density Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {keywords.slice(0, 20).map((keyword, index) => (
                    <div key={keyword.keyword} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-medium rounded-full">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-900">{keyword.keyword}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">{keyword.count} times</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${
                            keyword.status === 'good' ? 'text-green-600' :
                            keyword.status === 'high' ? 'text-orange-600' : 'text-gray-600'
                          }`}>
                            {keyword.density.toFixed(2)}%
                          </span>
                          {keyword.status === 'good' && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {keyword.status === 'high' && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {keywords.length > 20 && (
                  <p className="text-sm text-gray-500 mt-4">
                    Showing top 20 keywords. {keywords.length - 20} more keywords found.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* SEO Recommendations */}
          {keywords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>SEO Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {keywords.filter(k => k.status === 'high').length > 0 && (
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-orange-900">High Density Keywords</h4>
                          <p className="text-sm text-orange-700">
                            Consider reducing the frequency of: {keywords.filter(k => k.status === 'high').slice(0, 3).map(k => k.keyword).join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {keywords.filter(k => k.status === 'low' && k.count >= 3).length > 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-blue-900">Potential Target Keywords</h4>
                          <p className="text-sm text-blue-700">
                            Consider optimizing for: {keywords.filter(k => k.status === 'low' && k.count >= 3).slice(0, 3).map(k => k.keyword).join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-green-900">Optimization Tips</h4>
                        <ul className="text-sm text-green-700 list-disc list-inside space-y-1">
                          <li>Aim for 0.5-3% keyword density for optimal SEO</li>
                          <li>Use semantic keywords and related terms</li>
                          <li>Focus on natural, readable content</li>
                          <li>Include keywords in headings and introduction</li>
                        </ul>
                      </div>
                    </div>
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