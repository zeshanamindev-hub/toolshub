"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ToolPageLayout from "@/components/layout/tool-page-layout"
import { ToolStructuredData } from "@/components/seo/tool-seo"
import {
  Eye,
  Copy,
  Search,
  Facebook,
  Twitter,
  Link as LinkIcon,
  Globe,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

interface MetaTags {
  title: string
  description: string
  url: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogType: string
  twitterCard: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
}

export default function MetaTagPreviewClient() {
  const [metaTags, setMetaTags] = useState<MetaTags>({
    title: "Example Page Title - Your Website Name",
    description: "This is an example meta description that should be between 150-160 characters for optimal SEO performance in search results.",
    url: "https://example.com/page-title",
    ogTitle: "",
    ogDescription: "",
    ogImage: "https://example.com/og-image.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: ""
  })

  const [activeTab, setActiveTab] = useState<'google' | 'facebook' | 'twitter'>('google')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Auto-fill Open Graph and Twitter tags
    setMetaTags(prev => ({
      ...prev,
      ogTitle: prev.title,
      ogDescription: prev.description,
      twitterTitle: prev.title,
      twitterDescription: prev.description,
      twitterImage: prev.ogImage
    }))
  }, [metaTags.title, metaTags.description, metaTags.ogImage])

  const updateMetaTag = (field: keyof MetaTags, value: string) => {
    setMetaTags(prev => ({ ...prev, [field]: value }))
  }

  const generateMetaTags = () => {
    const tags = []

    // Basic meta tags
    if (metaTags.title) {
      tags.push(`<title>${metaTags.title}</title>`)
    }
    if (metaTags.description) {
      tags.push(`<meta name="description" content="${metaTags.description}">`)
    }

    // Open Graph tags
    if (metaTags.ogTitle) {
      tags.push(`<meta property="og:title" content="${metaTags.ogTitle}">`)
    }
    if (metaTags.ogDescription) {
      tags.push(`<meta property="og:description" content="${metaTags.ogDescription}">`)
    }
    if (metaTags.url) {
      tags.push(`<meta property="og:url" content="${metaTags.url}">`)
    }
    if (metaTags.ogImage) {
      tags.push(`<meta property="og:image" content="${metaTags.ogImage}">`)
    }
    if (metaTags.ogType) {
      tags.push(`<meta property="og:type" content="${metaTags.ogType}">`)
    }

    // Twitter Card tags
    if (metaTags.twitterCard) {
      tags.push(`<meta name="twitter:card" content="${metaTags.twitterCard}">`)
    }
    if (metaTags.twitterTitle) {
      tags.push(`<meta name="twitter:title" content="${metaTags.twitterTitle}">`)
    }
    if (metaTags.twitterDescription) {
      tags.push(`<meta name="twitter:description" content="${metaTags.twitterDescription}">`)
    }
    if (metaTags.twitterImage) {
      tags.push(`<meta name="twitter:image" content="${metaTags.twitterImage}">`)
    }

    return tags.join('\n')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateMetaTags())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const getTitleLength = () => metaTags.title.length
  const getDescriptionLength = () => metaTags.description.length

  const getTitleStatus = () => {
    const length = getTitleLength()
    if (length === 0) return { status: 'empty', message: 'Title is required' }
    if (length < 30) return { status: 'short', message: 'Too short for SEO' }
    if (length > 60) return { status: 'long', message: 'May be truncated' }
    return { status: 'good', message: 'Good length' }
  }

  const getDescriptionStatus = () => {
    const length = getDescriptionLength()
    if (length === 0) return { status: 'empty', message: 'Description is required' }
    if (length < 120) return { status: 'short', message: 'Too short for SEO' }
    if (length > 160) return { status: 'long', message: 'May be truncated' }
    return { status: 'good', message: 'Good length' }
  }

  const features = [
    "Real-time preview of Google search results",
    "Facebook Open Graph preview",
    "Twitter Card preview",
    "Meta tag length validation",
    "SEO recommendations",
    "Auto-fill related fields",
    "Generate HTML meta tags",
    "Copy meta tags to clipboard"
  ]

  const useCases = [
    "Optimizing page titles for search engines",
    "Creating compelling meta descriptions",
    "Setting up social media sharing previews",
    "Testing Open Graph and Twitter Card tags",
    "SEO content optimization",
    "Social media marketing",
    "Content management systems"
  ]

  const tips = [
    "Keep titles between 50-60 characters for optimal display",
    "Write compelling descriptions under 160 characters",
    "Use relevant keywords in titles and descriptions",
    "Include your brand name in titles when possible",
    "Test your meta tags on actual social platforms",
    "Use high-quality images for Open Graph and Twitter Cards"
  ]

  const relatedTools = [
    {
      name: "Open Graph Preview Tool",
      href: "/tools/open-graph-preview",
      icon: Facebook,
      description: "Preview Open Graph tags"
    },
    {
      name: "Sitemap Generator",
      href: "/tools/sitemap-generator",
      icon: Globe,
      description: "Generate XML sitemaps"
    },
    {
      name: "Keyword Density Checker",
      href: "/tools/keyword-density-checker",
      icon: Search,
      description: "Check keyword density"
    }
  ]

  const faqs = [
    {
      question: "Why are meta tags important for SEO?",
      answer: "Meta tags help search engines understand your content and influence how your pages appear in search results. Well-optimized meta tags can improve click-through rates."
    },
    {
      question: "What's the ideal length for meta descriptions?",
      answer: "Google typically displays 150-160 characters of meta descriptions. Keep your descriptions concise but descriptive to maximize their effectiveness."
    },
    {
      question: "Do Open Graph tags work on all social platforms?",
      answer: "Open Graph tags are primarily used by Facebook, but other platforms like LinkedIn and Pinterest also support them. Twitter has its own Twitter Card tags."
    },
    {
      question: "How do I test my meta tags?",
      answer: "You can use tools like Facebook's Sharing Debugger, Twitter's Card Validator, or Google's Rich Results Test to see how your meta tags appear."
    }
  ]

  return (
    <>
      <ToolStructuredData
        toolName="Meta Tag Preview Tool"
        toolDescription="Preview how your meta tags will appear in Google search results and social media platforms. Test title tags, descriptions, and Open Graph meta tags for optimal SEO and social sharing."
        category="Developer Tools"
        toolPath="/tools/meta-tag-preview"
      />

      <ToolPageLayout
        toolName="Meta Tag Preview Tool"
        toolDescription="Preview how your meta tags will appear in Google search results and social media platforms. Test title tags, descriptions, and Open Graph meta tags for optimal SEO and social sharing."
        toolIcon={Eye}
        category="SEO Tools"
        categoryHref="/categories/seo"
        features={features}
        useCases={useCases}
        relatedTools={relatedTools}
        tips={tips}
        faqs={faqs}
      >
        <div className="space-y-6">
          {/* Meta Tag Inputs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Meta Tag Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Meta Tags */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Basic Meta Tags</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title ({getTitleLength()} characters)
                  </label>
                  <Input
                    value={metaTags.title}
                    onChange={(e) => updateMetaTag('title', e.target.value)}
                    placeholder="Enter your page title..."
                    className={getTitleStatus().status === 'long' ? 'border-orange-300' : getTitleStatus().status === 'good' ? 'border-green-300' : ''}
                  />
                  <div className="flex items-center gap-2 mt-1">
                    {getTitleStatus().status === 'good' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {getTitleStatus().status === 'long' && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                    <span className={`text-xs ${getTitleStatus().status === 'good' ? 'text-green-600' : getTitleStatus().status === 'long' ? 'text-orange-600' : 'text-gray-500'}`}>
                      {getTitleStatus().message}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description ({getDescriptionLength()} characters)
                  </label>
                  <Textarea
                    value={metaTags.description}
                    onChange={(e) => updateMetaTag('description', e.target.value)}
                    placeholder="Enter your meta description..."
                    className={`min-h-[80px] ${getDescriptionStatus().status === 'long' ? 'border-orange-300' : getDescriptionStatus().status === 'good' ? 'border-green-300' : ''}`}
                  />
                  <div className="flex items-center gap-2 mt-1">
                    {getDescriptionStatus().status === 'good' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {getDescriptionStatus().status === 'long' && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                    <span className={`text-xs ${getDescriptionStatus().status === 'good' ? 'text-green-600' : getDescriptionStatus().status === 'long' ? 'text-orange-600' : 'text-gray-500'}`}>
                      {getDescriptionStatus().message}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                  <Input
                    value={metaTags.url}
                    onChange={(e) => updateMetaTag('url', e.target.value)}
                    placeholder="https://example.com/page"
                  />
                </div>
              </div>

              {/* Open Graph Tags */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Open Graph Tags (Facebook)</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OG Title</label>
                    <Input
                      value={metaTags.ogTitle}
                      onChange={(e) => updateMetaTag('ogTitle', e.target.value)}
                      placeholder="Open Graph title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OG Type</label>
                    <Input
                      value={metaTags.ogType}
                      onChange={(e) => updateMetaTag('ogType', e.target.value)}
                      placeholder="website, article, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">OG Description</label>
                  <Textarea
                    value={metaTags.ogDescription}
                    onChange={(e) => updateMetaTag('ogDescription', e.target.value)}
                    placeholder="Open Graph description..."
                    className="min-h-[60px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
                  <Input
                    value={metaTags.ogImage}
                    onChange={(e) => updateMetaTag('ogImage', e.target.value)}
                    placeholder="https://example.com/og-image.jpg"
                  />
                </div>
              </div>

              {/* Twitter Card Tags */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Twitter Card Tags</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Card Type</label>
                    <Input
                      value={metaTags.twitterCard}
                      onChange={(e) => updateMetaTag('twitterCard', e.target.value)}
                      placeholder="summary_large_image"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Title</label>
                    <Input
                      value={metaTags.twitterTitle}
                      onChange={(e) => updateMetaTag('twitterTitle', e.target.value)}
                      placeholder="Twitter card title..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Description</label>
                  <Textarea
                    value={metaTags.twitterDescription}
                    onChange={(e) => updateMetaTag('twitterDescription', e.target.value)}
                    placeholder="Twitter card description..."
                    className="min-h-[60px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Image URL</label>
                  <Input
                    value={metaTags.twitterImage}
                    onChange={(e) => updateMetaTag('twitterImage', e.target.value)}
                    placeholder="https://example.com/twitter-image.jpg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Preview
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={activeTab === 'google' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('google')}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Google
                </Button>
                <Button
                  variant={activeTab === 'facebook' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('facebook')}
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant={activeTab === 'twitter' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('twitter')}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === 'google' && (
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-blue-600 text-lg hover:underline cursor-pointer truncate">
                        {metaTags.title || 'Page Title'}
                      </div>
                      <div className="text-green-700 text-sm truncate">
                        {metaTags.url || 'https://example.com'}
                      </div>
                      <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {metaTags.description || 'Meta description will appear here...'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'facebook' && (
                <div className="border border-gray-200 rounded-lg overflow-hidden max-w-md">
                  {metaTags.ogImage && (
                    <div className="aspect-[1.91/1] bg-gray-100 flex items-center justify-center">
                      <img
                        src={metaTags.ogImage}
                        alt="OG Image"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling!.classList.remove('hidden')
                        }}
                      />
                      <div className="hidden text-gray-400 text-sm">Image preview</div>
                    </div>
                  )}
                  <div className="p-4">
                    <div className="font-bold text-gray-900">
                      {metaTags.ogTitle || metaTags.title || 'Open Graph Title'}
                    </div>
                    <div className="text-gray-600 text-sm mt-1">
                      {metaTags.ogDescription || metaTags.description || 'Open Graph description will appear here...'}
                    </div>
                    <div className="text-gray-400 text-xs mt-2 uppercase">
                      {metaTags.url || 'example.com'}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'twitter' && (
                <div className="border border-gray-200 rounded-lg overflow-hidden max-w-md">
                  <div className="flex">
                    <div className="w-20 h-20 bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {metaTags.twitterImage ? (
                        <img
                          src={metaTags.twitterImage}
                          alt="Twitter Image"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.nextElementSibling!.classList.remove('hidden')
                          }}
                        />
                      ) : null}
                      <div className={`${metaTags.twitterImage ? 'hidden' : ''} text-gray-400 text-xs text-center`}>
                        Image
                      </div>
                    </div>
                    <div className="p-3 flex-1">
                      <div className="font-bold text-gray-900 text-sm">
                        {metaTags.twitterTitle || metaTags.title || 'Twitter Card Title'}
                      </div>
                      <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {metaTags.twitterDescription || metaTags.description || 'Twitter card description will appear here...'}
                      </div>
                      <div className="text-blue-500 text-xs mt-1">
                        {metaTags.url || 'example.com'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generated Meta Tags */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-primary" />
                  Generated Meta Tags
                </CardTitle>
                <Button onClick={handleCopy}>
                  {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy HTML'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generateMetaTags()}
                readOnly
                className="min-h-[200px] font-mono text-sm"
                placeholder="Generated meta tags will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </ToolPageLayout>
    </>
  )
}