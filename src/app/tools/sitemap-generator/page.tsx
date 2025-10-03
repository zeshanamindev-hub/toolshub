import { generateToolMetadata } from "@/components/seo/tool-seo"
import SitemapGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Sitemap Generator",
  toolDescription: "Generate XML sitemaps for your website with customizable URLs, priorities, and change frequencies. Perfect for SEO and helping search engines discover your content.",
  category: "Developer Tools",
  keywords: [
    "sitemap generator",
    "XML sitemap",
    "SEO sitemap",
    "website sitemap",
    "search engine sitemap",
    "sitemap.xml",
    "URL priority",
    "change frequency",
    "last modified"
  ],
  toolPath: "/tools/sitemap-generator"
})

export default function SitemapGeneratorPage() {
  return <SitemapGeneratorClient />
}