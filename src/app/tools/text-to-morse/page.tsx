import { generateToolMetadata } from "@/components/seo/tool-seo"
import TextToMorseClient from "./client"

// Export metadata for SEO
export const metadata = generateToolMetadata({
  toolName: "Text to Morse Code Translator",
  toolDescription: "Convert text to Morse code with multiple styles and audio playback. Supports letters, numbers, and common punctuation with real-time translation.",
  category: "Converters & Encoding",
  keywords: [
    "morse code",
    "text to morse",
    "morse code translator",
    "morse code converter",
    "text encoder",
    "morse alphabet",
    "telegraph code",
    "signal code"
  ],
  toolPath: "/tools/text-to-morse"
})

export default function TextToMorsePage() {
  return <TextToMorseClient />
}
