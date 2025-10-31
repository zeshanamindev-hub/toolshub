import { generateToolMetadata } from "@/components/seo/tool-seo"
import AsciiToTextClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "ASCII to Text Converter",
  toolDescription: "Convert ASCII codes to readable text with support for decimal, hexadecimal, binary, and octal formats. Features intelligent auto-detection, Unicode support, and comprehensive error handling for accurate conversions.",
  category: "Converters & Encoding",
  keywords: [
    "ascii to text",
    "ascii converter",
    "ascii decoder",
    "decimal to text",
    "hex to text",
    "binary to text",
    "octal to text",
    "ascii code converter",
    "character converter",
    "unicode converter"
  ],
  toolPath: "/tools/ascii-to-text"
})

export default function AsciiToTextPage() {
  return <AsciiToTextClient />
}
