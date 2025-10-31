import { generateToolMetadata } from "@/components/seo/tool-seo"
import HtmlEntitiesClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "HTML Entities Encoder/Decoder",
  toolDescription: "Encode and decode HTML entities instantly. Convert special characters to HTML entities and decode HTML entity codes. Free online HTML encoder for web developers.",
  category: "Converters & Encoding",
  keywords: [
    "html entities",
    "html encoder",
    "html decoder",
    "encode html",
    "decode html",
    "html special characters",
    "html escape",
    "html unescape"
  ],
  toolPath: "/tools/html-entities"
})

export default function HtmlEntitiesPage() {
  return <HtmlEntitiesClient />
}
