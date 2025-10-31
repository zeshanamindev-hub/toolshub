import { generateToolMetadata } from "@/components/seo/tool-seo"
import TextExtractorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Text Extractor",
  toolDescription: "Extract text from files, PDFs, and images instantly. Copy plain text from formatted documents. Free online text extraction tool.",
  category: "Text & Writing",
  keywords: [
    "text extractor",
    "extract text",
    "text from pdf",
    "text from image",
    "copy text",
    "extract content",
    "text extraction tool",
    "get text from file"
  ],
  toolPath: "/tools/text-extractor"
})

export default function TextExtractorPage() {
  return <TextExtractorClient />
}
