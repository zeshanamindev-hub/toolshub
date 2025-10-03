import { generateToolMetadata } from "@/components/seo/tool-seo"
import KeywordDensityCheckerClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Keyword Density Checker",
  toolDescription: "Analyze keyword density in your content for SEO optimization. Check keyword frequency, density percentage, and get recommendations for optimal keyword usage.",
  category: "Text & Writing",
  keywords: [
    "keyword density checker",
    "SEO keyword analysis",
    "keyword frequency",
    "content optimization",
    "keyword density",
    "SEO analysis",
    "keyword research",
    "content analysis"
  ],
  toolPath: "/tools/keyword-density-checker"
})

export default function KeywordDensityCheckerPage() {
  return <KeywordDensityCheckerClient />
}