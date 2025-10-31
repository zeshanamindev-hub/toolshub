import { generateToolMetadata } from "@/components/seo/tool-seo"
import UrlEncoderClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "URL Encoder/Decoder",
  toolDescription: "Encode and decode URLs instantly. Convert special characters to percent-encoding and decode URL-encoded strings. Free online URL encoding tool for developers.",
  category: "Converters & Encoding",
  keywords: [
    "url encoder",
    "url decoder",
    "percent encoding",
    "url encode",
    "url decode",
    "uri encoder",
    "encode url",
    "decode url"
  ],
  toolPath: "/tools/url-encoder"
})

export default function UrlEncoderPage() {
  return <UrlEncoderClient />
}
