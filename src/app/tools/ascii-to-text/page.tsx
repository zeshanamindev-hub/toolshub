import { generateToolMetadata } from "@/components/seo/tool-seo"
import AsciiToTextClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "ASCII to Text Converter",
  toolDescription: "Convert ASCII codes to readable text with support for decimal, hexadecimal, binary, and octal formats. Features intelligent auto-detection, Unicode support, and comprehensive error handling for accurate conversions.",
  category: "Converters & Encoding",
  keywords: [
    "ascii to text",
    "ascii to text converter",
    "ascii converter online",
    "ascii decoder online",
    "decimal to text converter",
    "hex to text converter",
    "binary to text converter",
    "octal to text converter",
    "ascii code converter",
    "character converter online",
    "unicode converter",
    "convert ascii to text",
    "free ascii to text",
    "ascii to string",
    "ascii code to text",
    "ascii value to text",
    "decode ascii",
    "ascii text decoder",
    "ascii to readable text",
    "ascii number to text"
  ],
  toolPath: "/tools/ascii-to-text"
})

export default function AsciiToTextPage() {
  return <AsciiToTextClient />
}
