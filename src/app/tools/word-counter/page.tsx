import { generateToolMetadata } from "@/components/seo/tool-seo"
import WordCounterClient from "./client"

// Export metadata for SEO
export const metadata = generateToolMetadata({
  toolName: "Word Counter",
  toolDescription: "Count words, characters, paragraphs, and sentences in your text instantly. Advanced text analysis with reading time, keyword density, and writing goals.",
  category: "Text & Writing",
  keywords: [
    "word counter",
    "character counter", 
    "text analysis",
    "word count",
    "text statistics",
    "writing tool",
    "reading time calculator",
    "text metrics"
  ],
  toolPath: "/tools/word-counter"
})

export default function WordCounterPage() {
  return <WordCounterClient />
}