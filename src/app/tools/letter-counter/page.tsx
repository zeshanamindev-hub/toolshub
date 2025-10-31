import { generateToolMetadata } from "@/components/seo/tool-seo"
import LetterCounterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Letter Counter",
  toolDescription: "Analyze letter frequency and character distribution in text. Visual charts, statistics, and percentage breakdown. Free online letter frequency counter for text analysis and cryptography.",
  category: "Text & Writing",
  keywords: [
    "letter counter",
    "character frequency",
    "letter frequency counter",
    "character distribution",
    "text analysis",
    "frequency analyzer",
    "letter statistics",
    "cryptography tool"
  ],
  toolPath: "/tools/letter-counter"
})

export default function LetterCounterPage() {
  return <LetterCounterClient />
}
