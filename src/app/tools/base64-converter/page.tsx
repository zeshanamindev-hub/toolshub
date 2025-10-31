import { generateToolMetadata } from "@/components/seo/tool-seo"
import Base64ConverterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Base64 Encoder/Decoder",
  toolDescription: "Encode and decode Base64 strings instantly. Convert text to Base64 and Base64 to text with file upload support. Free online Base64 converter tool.",
  category: "Converters & Encoding",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 converter",
    "encode base64",
    "decode base64",
    "base64 to text",
    "text to base64",
    "base64 online"
  ],
  toolPath: "/tools/base64-converter"
})

export default function Base64ConverterPage() {
  return <Base64ConverterClient />
}
