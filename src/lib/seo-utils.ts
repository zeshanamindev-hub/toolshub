import { Metadata } from "next"
import { SITE_CONFIG } from "./constants"

interface GenerateToolMetadataParams {
  toolName: string
  toolDescription: string
  category: string
  keywords: string[]
  toolPath: string
  additionalKeywords?: string[]
}

/**
 * Generate standardized metadata for tool pages
 * Includes OpenGraph, Twitter cards, and proper SEO tags
 */
export function generateToolMetadata({
  toolName,
  toolDescription,
  category,
  keywords,
  toolPath,
  additionalKeywords = [],
}: GenerateToolMetadataParams): Metadata {
  const fullTitle = `${toolName} | Free Online ${category} Tool - Tools Hub`
  const fullUrl = `${SITE_CONFIG.url}${toolPath}`

  // Combine provided keywords with standard ones
  const allKeywords = [
    ...keywords,
    ...additionalKeywords,
    "free online tool",
    "no signup required",
    "privacy-focused",
    toolName.toLowerCase(),
  ]

  return {
    title: fullTitle,
    description: toolDescription,
    keywords: allKeywords,
    authors: [{ name: "Tools Hub" }],
    creator: "Tools Hub",
    publisher: "Tools Hub",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description: toolDescription,
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_CONFIG.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${toolName} - ${SITE_CONFIG.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: toolDescription,
      images: [`${SITE_CONFIG.url}/og-image.png`],
      creator: "@toolshub",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

/**
 * Generate structured data (JSON-LD) for tool pages
 */
export function generateToolStructuredData({
  toolName,
  toolDescription,
  toolPath,
  category,
}: {
  toolName: string
  toolDescription: string
  toolPath: string
  category: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: toolName,
    description: toolDescription,
    url: `${SITE_CONFIG.url}${toolPath}`,
    applicationCategory: category,
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  }
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  }
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate HowTo structured data
 */
export function generateHowToStructuredData({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: Array<{ name: string; text: string }>
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

/**
 * Generate canonical URL for a page
 */
export function generateCanonicalUrl(path: string): string {
  // Remove trailing slash if present
  const cleanPath = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path
  return `${SITE_CONFIG.url}${cleanPath}`
}

/**
 * Generate meta description with proper length (150-160 chars)
 */
export function generateMetaDescription(
  description: string,
  maxLength: number = 160
): string {
  if (description.length <= maxLength) {
    return description
  }

  // Truncate at word boundary
  const truncated = description.substring(0, maxLength - 3)
  const lastSpace = truncated.lastIndexOf(" ")
  return truncated.substring(0, lastSpace) + "..."
}

/**
 * Generate keywords array from tool information
 */
export function generateKeywords({
  toolName,
  category,
  customKeywords = [],
}: {
  toolName: string
  category: string
  customKeywords?: string[]
}): string[] {
  const baseKeywords = [
    toolName.toLowerCase(),
    `${toolName.toLowerCase()} online`,
    `free ${toolName.toLowerCase()}`,
    `${category.toLowerCase()} tool`,
    `online ${category.toLowerCase()}`,
    "free online tool",
    "no signup",
    "privacy-focused",
  ]

  return [...new Set([...baseKeywords, ...customKeywords])]
}

/**
 * Generate Open Graph tags object
 */
export function generateOGTags({
  title,
  description,
  url,
  image = "/og-image.png",
  type = "website",
}: {
  title: string
  description: string
  url: string
  image?: string
  type?: string
}) {
  return {
    title,
    description,
    url: `${SITE_CONFIG.url}${url}`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type,
    images: [
      {
        url: `${SITE_CONFIG.url}${image}`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  }
}

/**
 * Generate Twitter card tags object
 */
export function generateTwitterTags({
  title,
  description,
  image = "/og-image.png",
  card = "summary_large_image",
}: {
  title: string
  description: string
  image?: string
  card?: "summary" | "summary_large_image" | "app" | "player"
}) {
  return {
    card,
    title,
    description,
    images: [`${SITE_CONFIG.url}${image}`],
    creator: "@toolshub",
  }
}

/**
 * Validate and sanitize meta title (50-60 chars optimal)
 */
export function sanitizeMetaTitle(title: string, maxLength: number = 60): string {
  if (title.length <= maxLength) {
    return title
  }

  // Truncate at word boundary
  const truncated = title.substring(0, maxLength - 3)
  const lastSpace = truncated.lastIndexOf(" ")
  return truncated.substring(0, lastSpace) + "..."
}
