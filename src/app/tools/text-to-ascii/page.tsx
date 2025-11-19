import { generateToolMetadata } from "@/components/seo/tool-seo"
import TextToAsciiClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Text to ASCII",
  toolDescription: "Convert text to ASCII codes instantly. Generate decimal, hexadecimal, or binary ASCII values with custom separators. Free online text to ASCII converter.",
  category: "Converters & Encoding",
  keywords: [
    "text to ascii",
    "text to ascii converter",
    "ascii converter online",
    "text to ascii code",
    "ascii generator",
    "text to decimal ascii",
    "text to hex ascii",
    "character to ascii converter",
    "ascii encoder online",
    "convert text to ascii",
    "free ascii converter",
    "text to ascii online",
    "string to ascii",
    "ascii value converter",
    "text ascii generator",
    "character ascii code",
    "text to binary ascii",
    "ascii code generator",
    "online text to ascii",
    "convert characters to ascii"
  ],
  toolPath: "/tools/text-to-ascii"
})

export default function TextToAsciiPage() {
  return <TextToAsciiClient />
}
