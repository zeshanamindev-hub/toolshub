"use client"

import { useState, useEffect, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ToolPageLayout from "@/components/layout/tool-page-layout"
import { ToolStructuredData } from "@/components/seo/tool-seo"
import {
  FileText,
  Hash,
  CheckCircle,
  AlertTriangle,
  List,
  Trash2,
  Copy
} from "lucide-react"

interface Heading {
  level: number
  text: string
  id?: string
}

interface HeadingStats {
  h1: number
  h2: number
  h3: number
  h4: number
  h5: number
  h6: number
  total: number
}

export default function HeadingExtractorClient() {
  const [html, setHtml] = useState("")
  const [headings, setHeadings] = useState<Heading[]>([])
  const [stats, setStats] = useState<HeadingStats>({
    h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0, total: 0
  })
  const [copied, setCopied] = useState(false)

  const extractHeadings = useCallback(() => {
    if (!html.trim()) {
      setHeadings([])
      setStats({ h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0, total: 0 })
      return
    }

    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html

    const extractedHeadings: Heading[] = []
    const headingStats = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0, total: 0 }

    // Find all heading elements
    for (let level = 1; level <= 6; level++) {
      const headingElements = tempDiv.querySelectorAll(`h${level}`)
      headingElements.forEach(element => {
        const text = element.textContent?.trim() || ''
        if (text) {
          extractedHeadings.push({
            level,
            text,
            id: element.id || undefined
          })
          headingStats[`h${level}` as keyof HeadingStats]++
          headingStats.total++
        }
      })
    }

    setHeadings(extractedHeadings)
    setStats(headingStats)
  }, [html])

  useEffect(() => {
    extractHeadings()
  }, [extractHeadings])

  const handleCopy = async () => {
    const headingText = headings.map(h => `${'#'.repeat(h.level)} ${h.text}`).join('\n\n')
    try {
      await navigator.clipboard.writeText(headingText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy headings:", err)
    }
  }

  const clearHtml = () => {
    setHtml("")
  }

  const getSeoRecommendations = () => {
    const recommendations = []

    if (stats.h1 === 0) {
      recommendations.push({
        type: 'error',
        message: 'Missing H1 tag - Every page should have exactly one H1 tag'
      })
    } else if (stats.h1 > 1) {
      recommendations.push({
        type: 'warning',
        message: `Multiple H1 tags (${stats.h1}) - Consider using only one H1 per page`
      })
    }

    if (stats.h2 === 0) {
      recommendations.push({
        type: 'warning',
        message: 'No H2 tags found - Use H2 tags to structure your content'
      })
    }

    // Check for proper hierarchy
    let lastLevel = 0
    for (const heading of headings) {
      if (heading.level > lastLevel + 1 && lastLevel > 0) {
        recommendations.push({
          type: 'warning',
          message: 'Heading hierarchy may be broken - avoid skipping heading levels'
        })
        break
      }
      lastLevel = heading.level
    }

    return recommendations
  }

  const features = [
    "Extract all heading levels (H1-H6) from HTML",
    "Analyze heading structure and hierarchy",
    "SEO recommendations for heading optimization",
    "Copy headings in Markdown format",
    "Real-time parsing and analysis",
    "Heading statistics and counts",
    "Accessibility and SEO compliance checks"
  ]

  const useCases = [
    "SEO content analysis",
    "Content structure review",
    "Accessibility auditing",
    "Content migration planning",
    "Technical SEO audits",
    "Content management",
    "Website optimization"
  ]

  const tips = [
    "Use only one H1 tag per page",
    "Maintain proper heading hierarchy (don't skip levels)",
    "Include target keywords in headings",
    "Keep headings descriptive and concise",
    "Use headings to improve content readability",
    "Ensure headings follow a logical structure"
  ]

  const relatedTools = [
    {
      name: "Meta Tag Preview Tool",
      href: "/tools/meta-tag-preview",
      icon: FileText,
      description: "Preview meta tags"
    },
    {
      name: "Keyword Density Checker",
      href: "/tools/keyword-density-checker",
      icon: Hash,
      description: "Check keyword density"
    },
    {
      name: "Text Extractor",
      href: "/tools/text-extractor",
      icon: List,
      description: "Extract text patterns"
    }
  ]

  const faqs = [
    {
      question: "Why are headings important for SEO?",
      answer: "Headings help search engines understand your content structure and hierarchy. They also improve user experience by making content easier to scan and read."
    },
    {
      question: "How many H1 tags should I use per page?",
      answer: "You should use exactly one H1 tag per page. The H1 typically contains your main page title or primary keyword."
    },
    {
      question: "What's proper heading hierarchy?",
      answer: "Headings should follow a logical hierarchy: H1 → H2 → H3 → H4, etc. Avoid skipping levels (e.g., H1 directly to H3) as this can confuse both users and search engines."
    },
    {
      question: "Do headings affect accessibility?",
      answer: "Yes, proper heading structure is crucial for screen readers and other assistive technologies. It helps users with disabilities navigate your content more easily."
    }
  ]

  return (
    <>
      <ToolStructuredData
        toolName="Heading Extractor for HTML"
        toolDescription="Extract and analyze headings (H1, H2, H3, etc.) from HTML content. Perfect for SEO analysis, content structure review, and accessibility checking."
        category="Developer Tools"
        toolPath="/tools/heading-extractor"
      />

      <ToolPageLayout
        toolName="Heading Extractor for HTML"
        toolDescription="Extract and analyze headings (H1, H2, H3, etc.) from HTML content. Perfect for SEO analysis, content structure review, and accessibility checking."
        toolIcon={Hash}
        category="SEO Tools"
        categoryHref="/categories/seo"
        features={features}
        useCases={useCases}
        relatedTools={relatedTools}
        tips={tips}
        faqs={faqs}
      >
        <div className="space-y-6">
          {/* HTML Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                HTML Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="Paste your HTML content here to extract headings..."
                className="min-h-[200px] font-mono text-sm"
              />

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Total headings found: <span className="font-bold">{stats.total}</span>
                </div>
                <Button variant="outline" size="sm" onClick={clearHtml}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Heading Statistics */}
          {stats.total > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="h-5 w-5 text-primary" />
                  Heading Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(stats).filter(([key]) => key !== 'total').map(([level, count]) => (
                    <div key={level} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{count}</div>
                      <div className="text-sm text-gray-600 uppercase">{level}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* SEO Recommendations */}
          {stats.total > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>SEO & Accessibility Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getSeoRecommendations().map((rec, index) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      rec.type === 'error' ? 'bg-red-50 border border-red-200' :
                      rec.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-green-50 border border-green-200'
                    }`}>
                      <div className="flex items-start gap-2">
                        {rec.type === 'error' && <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />}
                        {rec.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />}
                        {rec.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />}
                        <p className={`text-sm ${
                          rec.type === 'error' ? 'text-red-800' :
                          rec.type === 'warning' ? 'text-yellow-800' :
                          'text-green-800'
                        }`}>
                          {rec.message}
                        </p>
                      </div>
                    </div>
                  ))}

                  {getSeoRecommendations().length === 0 && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <p className="text-sm text-green-800">
                          Your heading structure looks good! All basic SEO and accessibility requirements are met.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Extracted Headings */}
          {headings.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5 text-primary" />
                    Extracted Headings
                  </CardTitle>
                  <Button onClick={handleCopy}>
                    {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy as Markdown'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {headings.map((heading, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                        heading.level === 1 ? 'bg-red-100 text-red-800' :
                        heading.level === 2 ? 'bg-blue-100 text-blue-800' :
                        heading.level === 3 ? 'bg-green-100 text-green-800' :
                        heading.level === 4 ? 'bg-yellow-100 text-yellow-800' :
                        heading.level === 5 ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        H{heading.level}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{heading.text}</p>
                        {heading.id && (
                          <p className="text-xs text-gray-500">ID: {heading.id}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolPageLayout>
    </>
  )
}