import { generateToolMetadata } from "@/components/seo/tool-seo"
import RobotsTxtGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Robots.txt Generator",
  toolDescription: "Generate robots.txt files for your website with customizable rules for search engine crawlers. Control which pages bots can access and set crawl delays.",
  category: "Developer Tools",
  keywords: [
    "robots.txt generator",
    "robots.txt generator online",
    "search engine crawler",
    "SEO robots.txt",
    "web crawler control",
    "robots.txt file generator",
    "crawl delay settings",
    "sitemap robots.txt",
    "bot blocking tool",
    "create robots.txt",
    "generate robots.txt file",
    "free robots.txt generator",
    "robots txt maker",
    "seo crawler control",
    "website robots.txt",
    "robots.txt creator",
    "search engine robots",
    "robots.txt builder",
    "googlebot control",
    "web crawler rules"
  ],
  toolPath: "/tools/robots-txt-generator"
})

export default function RobotsTxtGeneratorPage() {
  return <RobotsTxtGeneratorClient />
}