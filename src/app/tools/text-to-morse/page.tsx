import { generateToolMetadata } from "@/components/seo/tool-seo"
import TextToMorseClient from "./client"

// Export metadata for SEO
export const metadata = generateToolMetadata({
  toolName: "Text to Morse Code Translator",
  toolDescription: "Convert text to Morse code with multiple styles and audio playback. Supports letters, numbers, and common punctuation with real-time translation.",
  category: "Converters & Encoding",
  keywords: [
    "morse code",
    "text to morse code",
    "text to morse converter",
    "morse code translator",
    "morse code converter online",
    "text to morse online",
    "morse code encoder",
    "morse alphabet translator",
    "telegraph code converter",
    "signal code generator",
    "convert text to morse",
    "free morse code translator",
    "morse code generator",
    "english to morse code",
    "morse translator online",
    "morse code maker",
    "text morse encoder",
    "morse audio generator",
    "morse code tool",
    "morse conversion tool"
  ],
  toolPath: "/tools/text-to-morse"
})

export default function TextToMorsePage() {
  return <TextToMorseClient />
}
