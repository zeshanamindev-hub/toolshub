import { generateToolMetadata } from "@/components/seo/tool-seo"
import MorseToTextClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Morse to Text",
  toolDescription: "Convert Morse code to text instantly. Decode Morse code with dots, dashes, and spaces. Free online Morse code decoder with audio support.",
  category: "Converters & Encoding",
  keywords: [
    "morse to text",
    "morse to text converter",
    "morse code decoder",
    "morse code decoder online",
    "decode morse code online",
    "morse translator",
    "morse code converter",
    "morse to english converter",
    "morse decoder online",
    "morse code reader",
    "free morse decoder",
    "morse code translator",
    "morse to text online",
    "convert morse to text",
    "morse code to english",
    "decode morse",
    "morse audio decoder",
    "morse signal decoder",
    "online morse translator",
    "morse code interpreter"
  ],
  toolPath: "/tools/morse-to-text"
})

export default function MorseToTextPage() {
  return <MorseToTextClient />
}
