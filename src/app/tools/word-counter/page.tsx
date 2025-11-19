import { generateToolMetadata } from "@/components/seo/tool-seo"
import WordCounterClient from "./client"

// Export metadata for SEO
export const metadata = generateToolMetadata({
  toolName: "Word Counter",
  toolDescription: "Free online word counter tool. Count words, characters, sentences, and paragraphs instantly. Track reading time, keyword density, and writing goals. Perfect for essays, articles, and social media posts.",
  category: "Text & Writing",
  keywords: [
    "word counter",
    "word count tool",
    "count words online",
    "character counter",
    "free word counter",
    "word counter online",
    "text counter",
    "word frequency counter",
    "writing tracker",
    "essay word counter",
    "article word count",
    "paragraph counter",
    "sentence counter",
    "reading time calculator",
    "keyword density checker",
    "writing goal tracker",
    "word count for essay",
    "character count tool",
    "text analysis tool",
    "word counter with character count"
  ],
  toolPath: "/tools/word-counter"
})

export default function WordCounterPage() {
  return <WordCounterClient />
}