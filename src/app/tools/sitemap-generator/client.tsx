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
  Copy,
  Plus,
  Minus,
  Download,
  CheckCircle,
  Link as LinkIcon
} from "lucide-react"

interface SitemapUrl {
  url: string
  priority: number
  changefreq: string
  lastmod?: string
}

export default function SitemapGeneratorClient() {
  const [urls, setUrls] = useState<SitemapUrl[]>([
    {
      url: "https://example.com/",
      priority: 1.0,
      changefreq: "weekly",
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      url: "https://example.com/about",
      priority: 0.8,
      changefreq: "monthly",
      lastmod: new Date().toISOString().split('T')[0]
    }
  ])

  const [generatedSitemap, setGeneratedSitemap] = useState("")
  const [copied, setCopied] = useState(false)

  const changeFrequencies = [
    "always",
    "hourly",
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "never"
  ]

  const priorityOptions = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]

  const generateSitemap = useCallback(() => {
    if (urls.length === 0) {
      setGeneratedSitemap("")
      return
    }

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    urls.forEach(url => {
      if (url.url.trim()) {
        xml += '  <url>\n'
        xml += `    <loc>${url.url.trim()}</loc>\n`

        if (url.lastmod) {
          xml += `    <lastmod>${url.lastmod}</lastmod>\n`
        }

        xml += `    <changefreq>${url.changefreq}</changefreq>\n`
        xml += `    <priority>${url.priority}</priority>\n`
        xml += '  </url>\n'
      }
    })

    xml += '</urlset>'
    setGeneratedSitemap(xml)
  }, [urls])

  useEffect(() => {
    generateSitemap()
  }, [generateSitemap])

  const addUrl = () => {
    setUrls([...urls, {
      url: "",
      priority: 0.5,
      changefreq: "monthly",
      lastmod: new Date().toISOString().split('T')[0]
    }])
  }

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index))
  }

  const updateUrl = (index: number, field: keyof SitemapUrl, value: string | number) => {
    const newUrls = [...urls]
    newUrls[index] = { ...newUrls[index], [field]: value }
    setUrls(newUrls)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedSitemap)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([generatedSitemap], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sitemap.xml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const bulkAddUrls = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim())
    const newUrls = lines.map(line => ({
      url: line.trim(),
      priority: 0.5,
      changefreq: "monthly" as string,
      lastmod: new Date().toISOString().split('T')[0]
    }))
    setUrls([...urls, ...newUrls])
  }

  const features = [
    "Generate XML sitemaps with proper formatting",
    "Set custom priorities for each URL (0.1 to 1.0)",
    "Configure change frequencies for different content types",
    "Add last modified dates for better SEO",
    "Bulk URL import from text lists",
    "Real-time XML preview",
    "Download sitemap.xml file directly",
    "Copy to clipboard functionality"
  ]

  const useCases = [
    "Creating sitemaps for new websites",
    "Updating sitemaps after content changes",
    "Optimizing SEO with proper URL priorities",
    "Submitting sitemaps to search engines",
    "Managing large websites with multiple pages",
    "Setting appropriate crawl frequencies"
  ]

  const tips = [
    "Use priority 1.0 for your homepage, 0.8 for main sections",
    "Set appropriate change frequencies based on content update patterns",
    "Include lastmod dates for dynamic content",
    "Keep sitemaps under 50,000 URLs (50MB max)",
    "Submit your sitemap to Google Search Console and Bing Webmaster Tools",
    "Update sitemaps when you add or remove pages"
  ]

  const relatedTools = [
    {
      name: "Robots.txt Generator",
      href: "/tools/robots-txt-generator",
      icon: FileText,
      description: "Generate robots.txt files"
    },
    {
      name: "Meta Tag Preview Tool",
      href: "/tools/meta-tag-preview",
      icon: LinkIcon,
      description: "Preview meta tags"
    },
    {
      name: "URL Shortener",
      href: "/tools/url-shortener",
      icon: LinkIcon,
      description: "Shorten URLs"
    }
  ]

  const faqs = [
    {
      question: "What is an XML sitemap?",
      answer: "An XML sitemap is a file that lists all the pages on your website, helping search engines discover and crawl your content more efficiently."
    },
    {
      question: "How many URLs can I include in a sitemap?",
      answer: "A single sitemap can contain up to 50,000 URLs and should not exceed 50MB in size. For larger sites, you can create multiple sitemaps and use a sitemap index file."
    },
    {
      question: "What do the priority values mean?",
      answer: "Priority values range from 0.1 to 1.0 and indicate the relative importance of a URL compared to other URLs on your site. This is a hint to search engines, not a command."
    },
    {
      question: "Do I need to submit my sitemap to search engines?",
      answer: "While search engines can discover sitemaps automatically, it's good practice to submit them manually through tools like Google Search Console and Bing Webmaster Tools."
    }
  ]

  return (
    <>
      <ToolStructuredData
        toolName="Sitemap Generator"
        toolDescription="Generate XML sitemaps for your website with customizable URLs, priorities, and change frequencies. Perfect for SEO and helping search engines discover your content."
        category="Developer Tools"
        toolPath="/tools/sitemap-generator"
      />

      <ToolPageLayout
        toolName="Sitemap Generator"
        toolDescription="Generate XML sitemaps for your website with customizable URLs, priorities, and change frequencies. Perfect for SEO and helping search engines discover your content."
        toolIcon={FileText}
        category="SEO Tools"
        categoryHref="/categories/seo"
        features={features}
        useCases={useCases}
        relatedTools={relatedTools}
        tips={tips}
        faqs={faqs}
      >
        <div className="space-y-6">
          {/* URL Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-blue-600" />
                Sitemap URLs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {urls.map((url, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">URL #{index + 1}</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeUrl(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* URL Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                    <Input
                      value={url.url}
                      onChange={(e) => updateUrl(index, 'url', e.target.value)}
                      placeholder="https://example.com/page"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Priority */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <div className="grid grid-cols-5 gap-1">
                        {priorityOptions.map(priority => (
                          <Button
                            key={priority}
                            variant={url.priority === priority ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateUrl(index, 'priority', priority)}
                            className="text-xs"
                          >
                            {priority}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Change Frequency */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Change Frequency</label>
                      <div className="grid grid-cols-2 gap-1">
                        {changeFrequencies.map(freq => (
                          <Button
                            key={freq}
                            variant={url.changefreq === freq ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateUrl(index, 'changefreq', freq)}
                            className="text-xs capitalize"
                          >
                            {freq}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Last Modified */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Modified (Optional)</label>
                      <Input
                        type="date"
                        value={url.lastmod || ""}
                        onChange={(e) => updateUrl(index, 'lastmod', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-2">
                <Button onClick={addUrl} variant="outline" className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Add URL
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Import */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Bulk Import URLs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Paste URLs here, one per line&#10;https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
                  className="min-h-[100px]"
                  onChange={() => {
                    // This will be handled when user pastes and clicks import
                  }}
                  id="bulk-urls"
                />
                <Button
                  onClick={() => {
                    const textarea = document.getElementById('bulk-urls') as HTMLTextAreaElement
                    if (textarea?.value) {
                      bulkAddUrls(textarea.value)
                      textarea.value = ''
                    }
                  }}
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Import URLs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Generated Sitemap */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Generated sitemap.xml
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedSitemap}
                readOnly
                className="min-h-[300px] font-mono text-sm"
                placeholder="Your generated sitemap.xml will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </ToolPageLayout>
    </>
  )
}