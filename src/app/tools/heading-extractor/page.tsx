import { generateToolMetadata } from "@/components/seo/tool-seo"
import HeadingExtractorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Heading Extractor for HTML",
  toolDescription: "Extract and analyze headings (H1, H2, H3, etc.) from HTML content. Perfect for SEO analysis, content structure review, and accessibility checking.",
  category: "Developer Tools",
  keywords: [
    "heading extractor",
    "HTML headings",
    "H1 H2 H3 analysis",
    "SEO heading structure",
    "content hierarchy",
    "HTML parser",
    "heading tags",
    "accessibility headings"
  ],
  toolPath: "/tools/heading-extractor"
})

export default function HeadingExtractorPage() {
  return <HeadingExtractorClient />
}