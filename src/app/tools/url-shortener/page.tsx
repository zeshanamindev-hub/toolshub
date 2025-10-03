import { generateToolMetadata } from "@/components/seo/tool-seo"
import UrlShortenerClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "URL Shortener",
  toolDescription: "Shorten long URLs using base64 encoding for easy sharing. Create compact links without external services - all processing happens in your browser.",
  category: "Generators",
  keywords: [
    "URL shortener",
    "link shortener",
    "base64 URL",
    "compact links",
    "URL encoder",
    "link sharing",
    "browser shortener",
    "URL compression"
  ],
  toolPath: "/tools/url-shortener"
})

export default function UrlShortenerPage() {
  return <UrlShortenerClient />
}