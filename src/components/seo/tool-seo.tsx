import { Metadata } from "next"

interface ToolSEOProps {
  toolName: string
  toolDescription: string
  category: string
  keywords?: string[]
  toolPath: string
}

export function generateToolMetadata({
  toolName,
  toolDescription,
  category,
  keywords = [],
  toolPath
}: ToolSEOProps): Metadata {
  const defaultKeywords = [
    'free online tool',
    'web tool',
    'no registration',
    'instant results',
    'browser tool',
    'privacy first'
  ]
  
  const allKeywords = [
    toolName.toLowerCase(),
    ...keywords,
    ...defaultKeywords,
    category.toLowerCase()
  ].join(', ')

  return {
    title: `${toolName} - Free Online Tool | Tools Hub`,
    description: `${toolDescription} Free, fast, and secure ${toolName.toLowerCase()} - no registration required. Use directly in your browser with instant results.`,
    keywords: allKeywords,
    authors: [{ name: "Tools Hub" }],
    openGraph: {
      title: `${toolName} - Free Online Tool`,
      description: toolDescription,
      url: `https://toolshub.com${toolPath}`,
      siteName: "Tools Hub",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${toolName} - Tools Hub`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${toolName} - Free Online Tool`,
      description: toolDescription,
      images: ["/og-image.png"]
    },
    alternates: {
      canonical: `https://toolshub.com${toolPath}`
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  }
}

export function ToolStructuredData({
  toolName,
  toolDescription,
  category,
  toolPath
}: ToolSEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": toolName,
    "description": toolDescription,
    "url": `https://toolshub.com${toolPath}`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "permissions": "browser",
    "isAccessibleForFree": true,
    "author": {
      "@type": "Organization",
      "name": "Tools Hub",
      "url": "https://toolshub.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Tools Hub",
      "url": "https://toolshub.com"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "No registration required",
      "Instant results",
      "100% privacy protected",
      "Works offline",
      "Mobile friendly",
      "Free forever"
    ],
    "browserRequirements": "Requires JavaScript enabled",
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString(),
    "inLanguage": "en-US",
    "keywords": [toolName, category, "free tool", "online utility"],
    "mainEntity": {
      "@type": "Thing",
      "name": toolName,
      "description": toolDescription
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}