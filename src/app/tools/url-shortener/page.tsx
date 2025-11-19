import { generateToolMetadata } from "@/components/seo/tool-seo"
import UrlShortenerClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "URL Shortener",
  toolDescription: "Shorten long URLs using base64 encoding for easy sharing. Create compact links without external services - all processing happens in your browser.",
  category: "Generators",
  keywords: [
    "URL shortener",
    "URL shortener online",
    "link shortener",
    "link shortener online",
    "base64 URL shortener",
    "compact links",
    "shorten url",
    "URL encoder",
    "link sharing tool",
    "browser shortener",
    "URL compression",
    "free url shortener",
    "shorten link",
    "url compressor",
    "short url generator",
    "url shortening tool",
    "link compressor",
    "shorten urls free",
    "offline url shortener",
    "privacy url shortener"
  ],
  toolPath: "/tools/url-shortener"
})

export default function UrlShortenerPage() {
  return <UrlShortenerClient />
}