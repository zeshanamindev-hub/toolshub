import { generateToolMetadata } from "@/components/seo/tool-seo"
import TextToAsciiClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Text to ASCII",
  toolDescription: "Convert text to ASCII codes instantly. Generate decimal, hexadecimal, or binary ASCII values with custom separators. Free online text to ASCII converter.",
  category: "Converters & Encoding",
  keywords: [
    "text to ascii",
    "ascii converter",
    "text to ascii code",
    "ascii generator",
    "text to decimal",
    "text to hex",
    "character to ascii",
    "ascii encoder"
  ],
  toolPath: "/tools/text-to-ascii"
})

export default function TextToAsciiPage() {
  return <TextToAsciiClient />
}
