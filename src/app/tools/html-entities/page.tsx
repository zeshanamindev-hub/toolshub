import { generateToolMetadata } from "@/components/seo/tool-seo"
import HtmlEntitiesClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "HTML Entities Encoder/Decoder",
  toolDescription: "Encode and decode HTML entities instantly. Convert special characters to HTML entities and decode HTML entity codes. Free online HTML encoder for web developers.",
  category: "Converters & Encoding",
  keywords: [
    "html entities",
    "html entities encoder",
    "html entities decoder",
    "html encoder online",
    "html decoder online",
    "encode html entities",
    "decode html entities",
    "html special characters",
    "html escape characters",
    "html unescape",
    "convert html entities",
    "html character codes",
    "html entity converter",
    "encode special characters html",
    "html entity reference",
    "free html encoder",
    "html encoding tool",
    "html character encoder",
    "html entity escape",
    "html entities list"
  ],
  toolPath: "/tools/html-entities"
})

export default function HtmlEntitiesPage() {
  return <HtmlEntitiesClient />
}
