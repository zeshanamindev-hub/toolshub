import { generateToolMetadata } from "@/components/seo/tool-seo"
import UrlEncoderClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "URL Encoder/Decoder",
  toolDescription: "Free online URL encoder and decoder. Encode special characters to percent-encoded format or decode URLs instantly. Convert URLs for web development and API calls.",
  category: "Converters & Encoding",
  keywords: [
    "url encoder",
    "url decoder",
    "encode url online",
    "decode url online",
    "url encode",
    "url decode",
    "percent encoding",
    "url encoding tool",
    "uri encoder",
    "uri decoder",
    "url escape",
    "url parameter encoder",
    "encode url parameters",
    "url converter",
    "encode special characters",
    "url encoding decoder",
    "online url encoder",
    "url encode decode",
    "percent encode",
    "url safe encoder"
  ],
  toolPath: "/tools/url-encoder"
})

export default function UrlEncoderPage() {
  return <UrlEncoderClient />
}
