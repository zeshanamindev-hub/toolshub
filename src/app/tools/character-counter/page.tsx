import { generateToolMetadata } from "@/components/seo/tool-seo"
import CharacterCounterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Character Counter",
  toolDescription: "Free online character counter for Twitter, Facebook, Instagram, and essays. Count characters, letters, words, spaces, and punctuation instantly. Check social media limits in real-time.",
  category: "Text & Writing",
  keywords: [
    "character counter",
    "character count tool",
    "count characters online",
    "free character counter",
    "twitter character counter",
    "facebook character counter",
    "instagram character counter",
    "social media character count",
    "text character counter",
    "letter counter",
    "character limit checker",
    "character count online free",
    "text length counter",
    "character counter with spaces",
    "character counter without spaces",
    "tweet character counter",
    "post character limit",
    "character counting tool",
    "online character count",
    "how many characters"
  ],
  toolPath: "/tools/character-counter"
})

export default function CharacterCounterPage() {
  return <CharacterCounterClient />
}
