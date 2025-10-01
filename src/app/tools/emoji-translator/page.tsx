import { generateToolMetadata } from "@/components/seo/tool-seo"
import EmojiTranslatorClient from "./client"

// Export metadata for SEO
export const metadata = generateToolMetadata({
  toolName: "Emoji Translator",
  toolDescription: "Translate emojis to text and text to emojis instantly. Supports common emojis and phrases for fun and expressive communication.",
  category: "Text & Writing",
  keywords: [
    "emoji translator",
    "emojis to text",
    "text to emojis",
    "emoji converter",
    "emoji decoder",
    "emoji encoder",
    "emoji translator tool",
    "emoji text converter"
  ],
  toolPath: "/tools/emoji-translator"
})

export default function EmojiTranslatorPage() {
  return <EmojiTranslatorClient />
}
