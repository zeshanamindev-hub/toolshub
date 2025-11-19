import { generateToolMetadata } from "@/components/seo/tool-seo"
import HtmlCharacterCounterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "HTML Character Counter",
  toolDescription: "Count characters in HTML content, excluding or including tags. Analyze text length in HTML documents. Free online HTML character counter for web developers.",
  category: "Text & Writing",
  keywords: [
    "html character counter",
    "html character counter online",
    "count html characters",
    "count html characters online",
    "html text counter",
    "html length calculator",
    "count characters in html",
    "html text length",
    "html character count",
    "html word counter",
    "free html character counter",
    "html content counter",
    "count text in html",
    "html character length",
    "html text analyzer",
    "html character analysis",
    "strip html count characters",
    "html tag counter",
    "count characters without html",
    "html text length tool"
  ],
  toolPath: "/tools/html-character-counter"
})

export default function HtmlCharacterCounterPage() {
  return <HtmlCharacterCounterClient />
}
