import { generateToolMetadata } from "@/components/seo/tool-seo"
import Base64ConverterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Base64 Encoder/Decoder",
  toolDescription: "Free online Base64 encoder and decoder. Convert text to Base64 or decode Base64 to text with full Unicode support. Fast, secure Base64 conversion tool for developers.",
  category: "Converters & Encoding",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 converter",
    "encode base64 online",
    "decode base64 online",
    "base64 encode",
    "base64 decode",
    "base64 converter online",
    "text to base64",
    "base64 to text",
    "base64 encoding tool",
    "base64 decoding tool",
    "online base64 encoder",
    "online base64 decoder",
    "base64 tool",
    "base64 string encoder",
    "convert to base64",
    "base64 encoder decoder",
    "free base64 converter",
    "base64 encode decode"
  ],
  toolPath: "/tools/base64-converter"
})

export default function Base64ConverterPage() {
  return <Base64ConverterClient />
}
