import { generateToolMetadata } from "@/components/seo/tool-seo"
import RobotsTxtGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Robots.txt Generator",
  toolDescription: "Generate robots.txt files for your website with customizable rules for search engine crawlers. Control which pages bots can access and set crawl delays.",
  category: "Developer Tools",
  keywords: [
    "robots.txt generator",
    "search engine crawler",
    "SEO robots",
    "web crawler control",
    "robots.txt file",
    "crawl delay",
    "sitemap robots",
    "bot blocking"
  ],
  toolPath: "/tools/robots-txt-generator"
})

export default function RobotsTxtGeneratorPage() {
  return <RobotsTxtGeneratorClient />
}