import { generateToolMetadata } from "@/components/seo/tool-seo"
import TextExtractorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Text Extractor",
  toolDescription: "Extract text from files, PDFs, and images instantly. Copy plain text from formatted documents. Free online text extraction tool.",
  category: "Text & Writing",
  keywords: [
    "text extractor",
    "text extractor online",
    "extract text online",
    "text from pdf",
    "extract text from pdf",
    "text from image",
    "extract text from image",
    "copy text from file",
    "extract content",
    "text extraction tool",
    "get text from file",
    "free text extractor",
    "extract text from document",
    "pdf text extractor",
    "image text extractor",
    "ocr text extractor",
    "extract plain text",
    "text from documents",
    "copy text tool",
    "document text extractor"
  ],
  toolPath: "/tools/text-extractor"
})

export default function TextExtractorPage() {
  return <TextExtractorClient />
}
