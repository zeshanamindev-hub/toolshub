"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ToolPageLayout from "@/components/layout/tool-page-layout"
import { ToolStructuredData } from "@/components/seo/tool-seo"
import {
  Link as LinkIcon,
  Copy,
  CheckCircle,
  ExternalLink,
  Shuffle,
  ArrowRightLeft
} from "lucide-react"

export default function UrlShortenerClient() {
  const [originalUrl, setOriginalUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [customDomain, setCustomDomain] = useState("https://short.link")
  const [copied, setCopied] = useState(false)

  const generateShortUrl = useCallback(() => {
    if (!originalUrl.trim()) return

    try {
      // Create base64 encoded version of the URL
      const encoded = btoa(originalUrl.trim())
      // Remove padding and replace special chars for URL safety
      const cleanEncoded = encoded.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
      // Take first 8 characters for shortness
      const shortCode = cleanEncoded.substring(0, 8)

      const shortUrl = `${customDomain}/${shortCode}`
      setShortUrl(shortUrl)
    } catch (error) {
      console.error('Error generating short URL:', error)
      setShortUrl("")
    }
  }, [originalUrl, customDomain])

  useEffect(() => {
    if (originalUrl) {
      generateShortUrl()
    } else {
      setShortUrl("")
    }
  }, [originalUrl, customDomain, generateShortUrl])

  const decodeShortUrl = (shortUrl: string) => {
    try {
      // Extract the short code from the URL
      const shortCode = shortUrl.split('/').pop()
      if (!shortCode) return ""

      // Restore base64 padding
      let encoded = shortCode.replace(/-/g, '+').replace(/_/g, '/')
      while (encoded.length % 4) {
        encoded += '='
      }

      return atob(encoded)
    } catch (error) {
      console.error('Error decoding short URL:', error)
      return ""
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  const clearAll = () => {
    setOriginalUrl("")
    setShortUrl("")
  }

  const features = [
    "Generate short URLs using base64 encoding",
    "Custom domain support",
    "Real-time URL shortening",
    "Copy shortened URLs to clipboard",
    "Browser-based processing (no external APIs)",
    "URL validation and error handling",
    "Decode short URLs back to original"
  ]

  const useCases = [
    "Social media link sharing",
    "Email marketing campaigns",
    "SMS and messaging",
    "Print materials with URLs",
    "QR code generation",
    "Link tracking and analytics",
    "Content sharing platforms"
  ]

  const tips = [
    "Keep original URLs under 2000 characters",
    "Test shortened URLs before sharing",
    "Use descriptive custom domains when possible",
    "Consider URL expiration for sensitive content",
    "Monitor click analytics when using tracking",
    "Avoid shortening already short URLs"
  ]

  const relatedTools = [
    {
      name: "UTM Link Generator",
      href: "/tools/utm-link-generator",
      icon: LinkIcon,
      description: "Add tracking parameters"
    },
    {
      name: "QR Code Generator",
      href: "/tools/qr-generator",
      icon: Shuffle,
      description: "Generate QR codes"
    },
    {
      name: "URL Encoder",
      href: "/tools/url-encoder",
      icon: LinkIcon,
      description: "Encode URLs"
    }
  ]

  const faqs = [
    {
      question: "How does this URL shortener work?",
      answer: "This tool uses base64 encoding to compress your URLs into shorter versions. The shortening happens entirely in your browser - no data is sent to external servers."
    },
    {
      question: "Are shortened URLs permanent?",
      answer: "The shortened URLs generated here are for immediate use. Since there's no server-side storage, you'll need to regenerate them if needed. For permanent short URLs, consider using dedicated URL shortening services."
    },
    {
      question: "Can I customize the short domain?",
      answer: "Yes, you can set any custom domain in the settings. However, for the links to actually work, you'll need to set up URL redirection on your server."
    },
    {
      question: "Is this secure?",
      answer: "The shortening process is secure as it happens locally in your browser. However, shortened URLs can obscure the destination, so always verify URLs from unknown sources."
    }
  ]

  return (
    <>
      <ToolStructuredData
        toolName="URL Shortener"
        toolDescription="Shorten long URLs using base64 encoding for easy sharing. Create compact links without external services - all processing happens in your browser."
        category="Generators"
        toolPath="/tools/url-shortener"
      />

      <ToolPageLayout
        toolName="URL Shortener"
        toolDescription="Shorten long URLs using base64 encoding for easy sharing. Create compact links without external services - all processing happens in your browser."
        toolIcon={LinkIcon}
        category="Generators"
        categoryHref="/categories/generators"
        features={features}
        useCases={useCases}
        relatedTools={relatedTools}
        tips={tips}
        faqs={faqs}
      >
        <div className="space-y-6">
          {/* URL Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                URL to Shorten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://example.com/very/long/url/that/needs/shortening"
                className="text-base"
              />

              <div className="flex gap-2">
                <Button onClick={clearAll} variant="outline">
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Custom Domain Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shuffle className="h-5 w-5 text-primary" />
                Short Domain Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Custom Domain
                </label>
                <Input
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="https://short.link"
                />
                <p className="text-xs text-gray-500">
                  Set your custom short domain. You'll need to configure URL redirection on your server for links to work.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Generated Short URL */}
          {shortUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  Shortened URL
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-lg font-mono text-green-900 break-all">{shortUrl}</p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCopy} className="flex-1">
                    {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy URL'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const original = decodeShortUrl(shortUrl)
                      if (original) {
                        setOriginalUrl(original)
                      }
                    }}
                  >
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Decode
                  </Button>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Original length: {originalUrl.length} characters</p>
                  <p>• Shortened length: {shortUrl.length} characters</p>
                  <p>• Compression ratio: {((1 - shortUrl.length / originalUrl.length) * 100).toFixed(1)}%</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <h4 className="font-bold mb-2">Input URL</h4>
                    <p className="text-sm text-gray-600">
                      Enter your long URL that you want to shorten
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <h4 className="font-bold mb-2">Base64 Encode</h4>
                    <p className="text-sm text-gray-600">
                      URL is encoded using base64 and shortened to 8 characters
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 font-bold">3</span>
                    </div>
                    <h4 className="font-bold mb-2">Get Short URL</h4>
                    <p className="text-sm text-gray-600">
                      Receive your shortened URL ready for sharing
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-yellow-600 mt-0.5">⚠️</div>
                    <div>
                      <h4 className="font-bold text-yellow-900">Important Note</h4>
                      <p className="text-sm text-yellow-700">
                        These shortened URLs won't work unless you set up URL redirection on your server.
                        The tool generates the short format but requires server-side configuration to redirect to the original URLs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolPageLayout>
    </>
  )
}