import { generateToolMetadata } from "@/components/seo/tool-seo"
import HeadingExtractorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Heading Extractor for HTML",
  toolDescription: "Extract and analyze headings (H1, H2, H3, etc.) from HTML content. Perfect for SEO analysis, content structure review, and accessibility checking.",
  category: "Developer Tools",
  keywords: [
    "heading extractor",
    "heading extractor online",
    "HTML headings extractor",
    "H1 H2 H3 analysis",
    "H1 H2 H3 extractor",
    "SEO heading structure",
    "content hierarchy analyzer",
    "HTML parser",
    "heading tags extractor",
    "accessibility headings checker",
    "extract headings from html",
    "html heading analyzer",
    "seo heading checker",
    "heading structure tool",
    "h tag extractor",
    "html heading structure",
    "extract h1 h2 h3",
    "heading hierarchy",
    "html heading tool",
    "seo heading extractor"
  ],
  toolPath: "/tools/heading-extractor"
})

export default function HeadingExtractorPage() {
  return <HeadingExtractorClient />
}