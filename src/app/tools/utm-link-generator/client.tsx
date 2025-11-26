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
  BarChart3,
  Target,
  MousePointer
} from "lucide-react"

interface UtmParameters {
  source: string
  medium: string
  campaign: string
  term?: string
  content?: string
}

export default function UtmLinkGeneratorClient() {
  const [baseUrl, setBaseUrl] = useState("https://example.com/page")
  const [utmParams, setUtmParams] = useState<UtmParameters>({
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: ""
  })
  const [generatedUrl, setGeneratedUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const generateUtmUrl = useCallback(() => {
    if (!baseUrl.trim()) {
      setGeneratedUrl("")
      return
    }

    const url = new URL(baseUrl.trim())

    if (utmParams.source) url.searchParams.set('utm_source', utmParams.source)
    if (utmParams.medium) url.searchParams.set('utm_medium', utmParams.medium)
    if (utmParams.campaign) url.searchParams.set('utm_campaign', utmParams.campaign)
    if (utmParams.term) url.searchParams.set('utm_term', utmParams.term)
    if (utmParams.content) url.searchParams.set('utm_content', utmParams.content)

    setGeneratedUrl(url.toString())
  }, [baseUrl, utmParams])

  useEffect(() => {
    generateUtmUrl()
  }, [generateUtmUrl])

  const updateUtmParam = (field: keyof UtmParameters, value: string) => {
    setUtmParams(prev => ({ ...prev, [field]: value }))
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  const clearAll = () => {
    setBaseUrl("")
    setUtmParams({
      source: "",
      medium: "",
      campaign: "",
      term: "",
      content: ""
    })
  }

  const commonSources = [
    "google",
    "facebook",
    "twitter",
    "linkedin",
    "instagram",
    "youtube",
    "newsletter",
    "direct"
  ]

  const commonMediums = [
    "email",
    "social",
    "cpc",
    "display",
    "organic",
    "referral",
    "affiliate",
    "sms"
  ]

  const features = [
    "Generate UTM tracking parameters automatically",
    "Real-time URL preview with parameters",
    "Copy generated URLs to clipboard",
    "Support for all standard UTM parameters",
    "Common source and medium suggestions",
    "URL validation and encoding",
    "Campaign tracking setup"
  ]

  const useCases = [
    "Email marketing campaigns",
    "Social media advertising",
    "Google Ads tracking",
    "Content marketing attribution",
    "Influencer marketing",
    "Affiliate link tracking",
    "Cross-channel campaign analysis"
  ]

  const tips = [
    "Use lowercase for UTM parameters",
    "Keep parameter values descriptive but concise",
    "Use consistent naming conventions across campaigns",
    "Include campaign names for easy identification",
    "Track both source and medium for complete attribution",
    "Use term parameter for paid search keywords"
  ]

  const relatedTools = [
    {
      name: "URL Shortener",
      href: "/tools/url-shortener",
      icon: LinkIcon,
      description: "Shorten URLs"
    },
    {
      name: "QR Code Generator",
      href: "/tools/qr-generator",
      icon: BarChart3,
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
      question: "What are UTM parameters?",
      answer: "UTM parameters are tags added to URLs that help track the performance of marketing campaigns in Google Analytics and other analytics tools."
    },
    {
      question: "Which UTM parameters are most important?",
      answer: "utm_source (where traffic comes from), utm_medium (marketing medium), and utm_campaign (campaign name) are the most essential parameters."
    },
    {
      question: "Do UTM parameters affect SEO?",
      answer: "UTM parameters themselves don't directly affect SEO, but they help you understand which marketing efforts drive the most traffic and conversions."
    },
    {
      question: "Can I use UTM parameters on any URL?",
      answer: "Yes, UTM parameters can be added to any URL. They work with websites, landing pages, blog posts, and any web destination."
    }
  ]

  return (
    <>
      <ToolStructuredData
        toolName="UTM Link Generator"
        toolDescription="Generate UTM tracking parameters for your links to monitor campaign performance in Google Analytics. Create trackable URLs for email marketing, social media, and advertising campaigns."
        category="Generators"
        toolPath="/tools/utm-link-generator"
      />

      <ToolPageLayout
        toolName="UTM Link Generator"
        toolDescription="Generate UTM tracking parameters for your links to monitor campaign performance in Google Analytics. Create trackable URLs for email marketing, social media, and advertising campaigns."
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
          {/* Base URL Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                Base URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://example.com/page"
                className="text-base"
              />
              <p className="text-xs text-gray-500 mt-2">
                Enter the URL you want to add UTM tracking parameters to
              </p>
            </CardContent>
          </Card>

          {/* UTM Parameters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                UTM Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Source */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source (utm_source) *
                  </label>
                  <div className="space-y-2">
                    <Input
                      value={utmParams.source}
                      onChange={(e) => updateUtmParam('source', e.target.value)}
                      placeholder="google, facebook, newsletter..."
                    />
                    <div className="flex flex-wrap gap-1">
                      {commonSources.map(source => (
                        <Button
                          key={source}
                          variant="outline"
                          size="sm"
                          onClick={() => updateUtmParam('source', source)}
                          className="text-xs h-6"
                        >
                          {source}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medium (utm_medium) *
                  </label>
                  <div className="space-y-2">
                    <Input
                      value={utmParams.medium}
                      onChange={(e) => updateUtmParam('medium', e.target.value)}
                      placeholder="email, social, cpc..."
                    />
                    <div className="flex flex-wrap gap-1">
                      {commonMediums.map(medium => (
                        <Button
                          key={medium}
                          variant="outline"
                          size="sm"
                          onClick={() => updateUtmParam('medium', medium)}
                          className="text-xs h-6"
                        >
                          {medium}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Campaign */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign (utm_campaign) *
                  </label>
                  <Input
                    value={utmParams.campaign}
                    onChange={(e) => updateUtmParam('campaign', e.target.value)}
                    placeholder="summer_sale, product_launch..."
                  />
                </div>

                {/* Term */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term (utm_term)
                  </label>
                  <Input
                    value={utmParams.term}
                    onChange={(e) => updateUtmParam('term', e.target.value)}
                    placeholder="paid keywords..."
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content (utm_content)
                  </label>
                  <Input
                    value={utmParams.content}
                    onChange={(e) => updateUtmParam('content', e.target.value)}
                    placeholder="button_color, header_image..."
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={clearAll} variant="outline">
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Generated URL */}
          {generatedUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  Generated UTM URL
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg break-all">
                  <p className="text-sm font-mono text-gray-900">{generatedUrl}</p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCopy} className="flex-1">
                    {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy URL'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(generatedUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* UTM Parameter Guide */}
          <Card>
            <CardHeader>
              <CardTitle>UTM Parameter Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <MousePointer className="h-4 w-4" />
                    Required Parameters
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>utm_source:</strong> Identifies where traffic comes from (google, facebook, newsletter)
                    </div>
                    <div>
                      <strong>utm_medium:</strong> Identifies the marketing medium (email, social, cpc)
                    </div>
                    <div>
                      <strong>utm_campaign:</strong> Identifies the specific campaign (summer_sale, product_launch)
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Optional Parameters
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>utm_term:</strong> Identifies paid search keywords
                    </div>
                    <div>
                      <strong>utm_content:</strong> Differentiates similar content (button_color, header_image)
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