import { generateToolMetadata } from "@/components/seo/tool-seo"
import EmojiTranslatorClient from "./client"

// Export metadata for SEO
export const metadata = generateToolMetadata({
  toolName: "Emoji Translator",
  toolDescription: "Translate emojis to text and text to emojis instantly. Supports common emojis and phrases for fun and expressive communication.",
  category: "Text & Writing",
  keywords: [
    "emoji translator",
    "emoji translator online",
    "emojis to text",
    "emojis to text converter",
    "text to emojis",
    "text to emojis converter",
    "emoji converter",
    "emoji decoder online",
    "emoji encoder online",
    "emoji translator tool",
    "emoji text converter",
    "free emoji translator",
    "emoji to words",
    "translate emoji",
    "emoji meaning translator",
    "emoji language translator",
    "convert emoji to text",
    "convert text to emoji",
    "emoji interpretation",
    "emoji translation tool"
  ],
  toolPath: "/tools/emoji-translator"
})

export default function EmojiTranslatorPage() {
  return <EmojiTranslatorClient />
}
