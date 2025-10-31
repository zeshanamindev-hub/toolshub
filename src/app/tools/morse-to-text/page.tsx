import { generateToolMetadata } from "@/components/seo/tool-seo"
import MorseToTextClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Morse to Text",
  toolDescription: "Convert Morse code to text instantly. Decode Morse code with dots, dashes, and spaces. Free online Morse code decoder with audio support.",
  category: "Converters & Encoding",
  keywords: [
    "morse to text",
    "morse code decoder",
    "decode morse code",
    "morse translator",
    "morse code converter",
    "morse to english",
    "morse decoder online",
    "morse code reader"
  ],
  toolPath: "/tools/morse-to-text"
})

export default function MorseToTextPage() {
  return <MorseToTextClient />
}
