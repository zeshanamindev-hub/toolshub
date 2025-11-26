"use client"

import { useState, useEffect, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ToolPageLayout from "@/components/layout/tool-page-layout"
import { ToolStructuredData } from "@/components/seo/tool-seo"
import {
  FileText,
  Link as LinkIcon,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Trash2,
  Search
} from "lucide-react"

interface LinkData {
  url: string
  text: string
  status: 'valid' | 'invalid' | 'unknown'
  type: 'internal' | 'external' | 'anchor' | 'mailto' | 'tel'
  element: string
}

interface LinkStats {
  total: number
  valid: number
  invalid: number
  internal: number
  external: number
  anchor: number
  mailto: number
  tel: number
}

export default function BrokenLinkCheckerClient() {
  const [html, setHtml] = useState("")
  const [links, setLinks] = useState<LinkData[]>([])
  const [stats, setStats] = useState<LinkStats>({
    total: 0, valid: 0, invalid: 0, internal: 0, external: 0, anchor: 0, mailto: 0, tel: 0
  })

  const extractLinks = useCallback(() => {
    if (!html.trim()) {
      setLinks([])
      setStats({ total: 0, valid: 0, invalid: 0, internal: 0, external: 0, anchor: 0, mailto: 0, tel: 0 })
      return
    }

    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html

    const extractedLinks: LinkData[] = []
    const linkStats = { total: 0, valid: 0, invalid: 0, internal: 0, external: 0, anchor: 0, mailto: 0, tel: 0 }

    // Find all link elements
    const linkElements = tempDiv.querySelectorAll('a[href]')
    linkElements.forEach(element => {
      const href = element.getAttribute('href') || ''
      const text = element.textContent?.trim() || ''
      const linkType = getLinkType(href)
      const validity = validateUrl(href)

      const linkData: LinkData = {
        url: href,
        text: text || '[No text]',
        status: validity,
        type: linkType,
        element: element.outerHTML.substring(0, 100) + (element.outerHTML.length > 100 ? '...' : '')
      }

      extractedLinks.push(linkData)
      linkStats.total++
      linkStats[linkType]++
      if (validity === 'valid') linkStats.valid++
      else if (validity === 'invalid') linkStats.invalid++
    })

    setLinks(extractedLinks)
    setStats(linkStats)
  }, [html])

  useEffect(() => {
    extractLinks()
  }, [extractLinks])

  const getLinkType = (url: string): LinkData['type'] => {
    if (url.startsWith('mailto:')) return 'mailto'
    if (url.startsWith('tel:')) return 'tel'
    if (url.startsWith('#')) return 'anchor'
    if (url.startsWith('http://') || url.startsWith('https://')) return 'external'
    return 'internal'
  }

  const validateUrl = (url: string): LinkData['status'] => {
    if (!url.trim()) return 'invalid'

    try {
      // For anchor links
      if (url.startsWith('#')) {
        return url.length > 1 ? 'valid' : 'invalid'
      }

      // For mailto and tel
      if (url.startsWith('mailto:') || url.startsWith('tel:')) {
        const value = url.split(':')[1]
        return value && value.trim().length > 0 ? 'valid' : 'invalid'
      }

      // For HTTP URLs
      if (url.startsWith('http://') || url.startsWith('https://')) {
        new URL(url)
        return 'valid'
      }

      // For relative URLs (basic validation)
      if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../') || /^[a-zA-Z0-9]/.test(url)) {
        return 'unknown' // Can't fully validate without base URL
      }

      return 'invalid'
    } catch {
      return 'invalid'
    }
  }

  const clearHtml = () => {
    setHtml("")
  }

  const features = [
    "Extract all links from HTML content",
    "Validate URL formats and structure",
    "Categorize links (internal, external, anchor, etc.)",
    "Identify potentially broken or malformed links",
    "Link statistics and analysis",
    "Real-time parsing and validation",
    "Support for various link types (mailto, tel, etc.)"
  ]

  const useCases = [
    "Website maintenance and link checking",
    "Content migration planning",
    "SEO audits and link analysis",
    "Broken link detection",
    "Content quality assurance",
    "Technical SEO reviews",
    "Website health monitoring"
  ]

  const tips = [
    "Regularly check for broken links to maintain SEO",
    "Use descriptive anchor text for better accessibility",
    "Avoid linking to development or staging URLs",
    "Test links after content updates",
    "Use relative URLs for internal links when possible",
    "Monitor external link health periodically"
  ]

  const relatedTools = [
    {
      name: "URL Encoder",
      href: "/tools/url-encoder",
      icon: LinkIcon,
      description: "Encode URLs safely"
    },
    {
      name: "Heading Extractor",
      href: "/tools/heading-extractor",
      icon: FileText,
      description: "Extract HTML headings"
    },
    {
      name: "Text Extractor",
      href: "/tools/text-extractor",
      icon: Search,
      description: "Extract text patterns"
    }
  ]

  const faqs = [
    {
      question: "What types of links can this tool check?",
      answer: "This tool can analyze regular HTTP/HTTPS links, anchor links (#), mailto links, telephone links, and relative URLs. It performs format validation but cannot check if external URLs are actually accessible."
    },
    {
      question: "Why does it show 'unknown' for some links?",
      answer: "'Unknown' status appears for relative URLs that can't be fully validated without knowing the base URL of the website. These links may still be valid depending on your site's structure."
    },
    {
      question: "Can this tool check if links are actually broken?",
      answer: "This tool performs format validation and basic checks, but cannot verify if external URLs are accessible (would require server-side requests). For comprehensive broken link checking, use dedicated online tools or services."
    },
    {
      question: "What should I do with invalid links?",
      answer: "Invalid links should be fixed or removed. Check for typos in URLs, ensure proper formatting, and verify that the linked content exists."
    }
  ]

  return (
    <>
      <ToolStructuredData
        toolName="Broken Link Checker (Local HTML Paste)"
        toolDescription="Check for broken links in your HTML content. Extract and validate all links from pasted HTML to identify potential broken or malformed URLs."
        category="Developer Tools"
        toolPath="/tools/broken-link-checker"
      />

      <ToolPageLayout
        toolName="Broken Link Checker (Local HTML Paste)"
        toolDescription="Check for broken links in your HTML content. Extract and validate all links from pasted HTML to identify potential broken or malformed URLs."
        toolIcon={LinkIcon}
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
                placeholder="Paste your HTML content here to check for broken links..."
                className="min-h-[200px] font-mono text-sm"
              />

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Total links found: <span className="font-bold">{stats.total}</span>
                </div>
                <Button variant="outline" size="sm" onClick={clearHtml}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Link Statistics */}
          {stats.total > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Link Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                    <div className="text-sm text-blue-800">Total Links</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.valid}</div>
                    <div className="text-sm text-green-800">Valid</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{stats.invalid}</div>
                    <div className="text-sm text-red-800">Invalid</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{stats.external}</div>
                    <div className="text-sm text-yellow-800">External</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-gray-700">{stats.internal}</div>
                    <div className="text-xs text-gray-600">Internal</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-gray-700">{stats.anchor}</div>
                    <div className="text-xs text-gray-600">Anchors</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-gray-700">{stats.mailto}</div>
                    <div className="text-xs text-gray-600">Email</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-gray-700">{stats.tel}</div>
                    <div className="text-xs text-gray-600">Phone</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Link Results */}
          {links.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-primary" />
                  Link Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {links.map((link, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {link.status === 'valid' && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {link.status === 'invalid' && <XCircle className="h-5 w-5 text-red-600" />}
                          {link.status === 'unknown' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              link.type === 'internal' ? 'bg-blue-100 text-blue-800' :
                              link.type === 'external' ? 'bg-yellow-100 text-yellow-800' :
                              link.type === 'anchor' ? 'bg-purple-100 text-purple-800' :
                              link.type === 'mailto' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {link.type}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              link.status === 'valid' ? 'bg-green-100 text-green-800' :
                              link.status === 'invalid' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {link.status}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900 break-all">
                              URL: {link.url}
                            </p>
                            <p className="text-sm text-gray-600">
                              Text: "{link.text}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {stats.invalid > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-bold text-orange-900 mb-2">Fix Invalid Links</h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Check for typos in URLs</li>
                      <li>• Ensure proper URL formatting (http:// or https://)</li>
                      <li>• Verify that linked pages exist</li>
                      <li>• Use relative URLs for internal links when appropriate</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2">Best Practices</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Use descriptive anchor text for better SEO</li>
                      <li>• Regularly audit links for broken URLs</li>
                      <li>• Consider using link checking tools for live websites</li>
                      <li>• Test links after content updates or migrations</li>
                    </ul>
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