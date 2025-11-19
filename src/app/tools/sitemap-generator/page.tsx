import { generateToolMetadata } from "@/components/seo/tool-seo"
import SitemapGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Sitemap Generator",
  toolDescription: "Generate XML sitemaps for your website with customizable URLs, priorities, and change frequencies. Perfect for SEO and helping search engines discover your content.",
  category: "Developer Tools",
  keywords: [
    "sitemap generator",
    "sitemap generator online",
    "XML sitemap generator",
    "SEO sitemap generator",
    "website sitemap generator",
    "search engine sitemap",
    "sitemap.xml generator",
    "create sitemap",
    "generate sitemap",
    "free sitemap generator",
    "sitemap builder",
    "sitemap creator",
    "xml sitemap maker",
    "google sitemap generator",
    "website sitemap creator",
    "sitemap xml builder",
    "seo sitemap tool",
    "sitemap generation tool",
    "url sitemap generator",
    "sitemap.xml creator"
  ],
  toolPath: "/tools/sitemap-generator"
})

export default function SitemapGeneratorPage() {
  return <SitemapGeneratorClient />
}