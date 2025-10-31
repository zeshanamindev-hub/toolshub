import { generateToolMetadata } from "@/components/seo/tool-seo"
import CharacterCounterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Character Counter",
  toolDescription: "Count characters with or without spaces instantly. Perfect for Twitter, SMS, meta descriptions. Detailed breakdown with social media limits including Twitter/X (280), Instagram (2200), and Facebook. Real-time character counting tool.",
  category: "Text & Writing",
  keywords: [
    "character counter",
    "character count",
    "twitter character count",
    "sms character limit",
    "meta description length",
    "character counter with spaces",
    "letter counter",
    "text length checker"
  ],
  toolPath: "/tools/character-counter"
})

export default function CharacterCounterPage() {
  return <CharacterCounterClient />
}
