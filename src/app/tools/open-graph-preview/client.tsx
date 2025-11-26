"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ToolPageLayout from "@/components/layout/tool-page-layout"
import { ToolStructuredData } from "@/components/seo/tool-seo"
import {
  Facebook,
  Copy,
  Eye,
  Link as LinkIcon,
  CheckCircle,
  AlertTriangle,
  Image as ImageIcon
} from "lucide-react"

interface OpenGraphTags {
  title: string
  description: string
  url: string
  image: string
  type: string
  siteName: string
}

export default function OpenGraphPreviewClient() {
  const [ogTags, setOgTags] = useState<OpenGraphTags>({
    title: "Your Amazing Content Title",
    description: "This is a compelling description that will make people want to click and share your content on social media platforms.",
    url: "https://example.com/your-page",
    image: "https://example.com/og-image.jpg",
    type: "website",
    siteName: "Your Website Name"
  })

  const [copied, setCopied] = useState(false)

  const updateOgTag = (field: keyof OpenGraphTags, value: string) => {
    setOgTags(prev => ({ ...prev, [field]: value }))
  }

  const generateOgTags = () => {
    const tags = []

    if (ogTags.title) {
      tags.push(`<meta property="og:title" content="${ogTags.title}">`)
    }
    if (ogTags.description) {
      tags.push(`<meta property="og:description" content="${ogTags.description}">`)
    }
    if (ogTags.url) {
      tags.push(`<meta property="og:url" content="${ogTags.url}">`)
    }
    if (ogTags.image) {
      tags.push(`<meta property="og:image" content="${ogTags.image}">`)
    }
    if (ogTags.type) {
      tags.push(`<meta property="og:type" content="${ogTags.type}">`)
    }
    if (ogTags.siteName) {
      tags.push(`<meta property="og:site_name" content="${ogTags.siteName}">`)
    }

    return tags.join('\n')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateOgTags())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const getTitleLength = () => ogTags.title.length
  const getDescriptionLength = () => ogTags.description.length

  const features = [
    "Real-time Facebook-style preview",
    "Open Graph tag validation",
    "Image preview with error handling",
    "Generate HTML meta tags",
    "Copy tags to clipboard",
    "Support for all major OG properties",
    "Mobile-friendly preview"
  ]

  const useCases = [
    "Social media content optimization",
    "Facebook sharing setup",
    "LinkedIn post previews",
    "Social media marketing",
    "Content sharing optimization",
    "Brand consistency on social platforms"
  ]

  const tips = [
    "Use high-quality images (1200x630px recommended)",
    "Keep titles under 60 characters for best display",
    "Write compelling descriptions under 160 characters",
    "Include your brand name in titles",
    "Test with Facebook's Sharing Debugger",
    "Use relevant, eye-catching images"
  ]

  const relatedTools = [
    {
      name: "Meta Tag Preview Tool",
      href: "/tools/meta-tag-preview",
      icon: Eye,
      description: "Preview all meta tags"
    },
    {
      name: "Favicon Generator",
      href: "/tools/favicon-generator",
      icon: ImageIcon,
      description: "Generate favicons"
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
      question: "What are Open Graph tags?",
      answer: "Open Graph tags are meta tags that control how your content appears when shared on social media platforms like Facebook, LinkedIn, and Pinterest."
    },
    {
      question: "Which platforms support Open Graph?",
      answer: "Facebook, LinkedIn, Pinterest, and many other social platforms support Open Graph tags. Twitter uses its own Twitter Card system."
    },
    {
      question: "What's the ideal image size for Open Graph?",
      answer: "Facebook recommends 1200 x 630 pixels for optimal display. Images should be at least 600 x 315 pixels."
    },
    {
      question: "How do I test my Open Graph tags?",
      answer: "Use Facebook's Sharing Debugger tool to see how your Open Graph tags will appear and clear any cached data."
    }
  ]

  return (
    <>
      <ToolStructuredData
        toolName="Open Graph Preview Tool"
        toolDescription="Preview how your Open Graph meta tags will appear when shared on Facebook, LinkedIn, and other social platforms. Test titles, descriptions, and images for perfect social sharing."
        category="Developer Tools"
        toolPath="/tools/open-graph-preview"
      />

      <ToolPageLayout
        toolName="Open Graph Preview Tool"
        toolDescription="Preview how your Open Graph meta tags will appear when shared on Facebook, LinkedIn, and other social platforms. Test titles, descriptions, and images for perfect social sharing."
        toolIcon={Facebook}
        category="SEO Tools"
        categoryHref="/categories/seo"
        features={features}
        useCases={useCases}
        relatedTools={relatedTools}
        tips={tips}
        faqs={faqs}
      >
        <div className="space-y-6">
          {/* Open Graph Inputs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Facebook className="h-5 w-5 text-primary" />
                Open Graph Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title ({getTitleLength()} characters)
                  </label>
                  <Input
                    value={ogTags.title}
                    onChange={(e) => updateOgTag('title', e.target.value)}
                    placeholder="Your content title..."
                  />
                  {getTitleLength() > 60 && (
                    <div className="flex items-center gap-2 mt-1">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-xs text-orange-600">May be truncated</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <Input
                    value={ogTags.type}
                    onChange={(e) => updateOgTag('type', e.target.value)}
                    placeholder="website, article, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description ({getDescriptionLength()} characters)
                </label>
                <Textarea
                  value={ogTags.description}
                  onChange={(e) => updateOgTag('description', e.target.value)}
                  placeholder="Compelling description for social sharing..."
                  className="min-h-[80px]"
                />
                {getDescriptionLength() > 160 && (
                  <div className="flex items-center gap-2 mt-1">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span className="text-xs text-orange-600">May be truncated</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                  <Input
                    value={ogTags.url}
                    onChange={(e) => updateOgTag('url', e.target.value)}
                    placeholder="https://example.com/page"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                  <Input
                    value={ogTags.siteName}
                    onChange={(e) => updateOgTag('siteName', e.target.value)}
                    placeholder="Your Website Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <Input
                  value={ogTags.image}
                  onChange={(e) => updateOgTag('image', e.target.value)}
                  placeholder="https://example.com/og-image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 1200x630px, at least 600x315px
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Facebook Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Facebook Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-200 rounded-lg overflow-hidden max-w-md mx-auto">
                {ogTags.image && (
                  <div className="aspect-[1.91/1] bg-gray-100 flex items-center justify-center relative">
                    <img
                      src={ogTags.image}
                      alt="OG Image Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement
                        target.style.display = 'none'
                        const placeholder = target.nextElementSibling as HTMLElement
                        if (placeholder) placeholder.classList.remove('hidden')
                      }}
                    />
                    <div className="hidden absolute inset-0 flex items-center justify-center text-gray-400 text-sm bg-gray-100">
                      <div className="text-center">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                        Image preview
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <div className="font-bold text-gray-900 text-lg leading-tight">
                    {ogTags.title || 'Your content title will appear here'}
                  </div>
                  <div className="text-gray-600 text-sm mt-2 leading-relaxed">
                    {ogTags.description || 'Your compelling description will make people want to click and share your content.'}
                  </div>
                  <div className="text-gray-400 text-xs mt-3 uppercase tracking-wide">
                    {ogTags.url ? new URL(ogTags.url).hostname : 'example.com'}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                This is how your content will appear when shared on Facebook, LinkedIn, and other social platforms.
              </p>
            </CardContent>
          </Card>

          {/* Generated Meta Tags */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-primary" />
                  Generated Open Graph Tags
                </CardTitle>
                <Button onClick={handleCopy}>
                  {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy HTML'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generateOgTags()}
                readOnly
                className="min-h-[150px] font-mono text-sm"
                placeholder="Generated Open Graph meta tags will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </ToolPageLayout>
    </>
  )
}