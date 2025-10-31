import { generateToolMetadata } from "@/components/seo/tool-seo"
import HtmlCharacterCounterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "HTML Character Counter",
  toolDescription: "Count characters in HTML content, excluding or including tags. Analyze text length in HTML documents. Free online HTML character counter for web developers.",
  category: "Text & Writing",
  keywords: [
    "html character counter",
    "count html characters",
    "html text counter",
    "html length",
    "count characters in html",
    "html text length",
    "html character count",
    "html word counter"
  ],
  toolPath: "/tools/html-character-counter"
})

export default function HtmlCharacterCounterPage() {
  return <HtmlCharacterCounterClient />
}
