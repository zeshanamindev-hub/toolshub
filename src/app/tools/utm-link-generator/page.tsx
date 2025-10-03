import { generateToolMetadata } from "@/components/seo/tool-seo"
import UtmLinkGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "UTM Link Generator",
  toolDescription: "Generate UTM tracking parameters for your links to monitor campaign performance in Google Analytics. Create trackable URLs for email marketing, social media, and advertising campaigns.",
  category: "Generators",
  keywords: [
    "UTM link generator",
    "Google Analytics tracking",
    "campaign tracking",
    "UTM parameters",
    "link tracking",
    "marketing links",
    "URL builder",
    "campaign URLs"
  ],
  toolPath: "/tools/utm-link-generator"
})

export default function UtmLinkGeneratorPage() {
  return <UtmLinkGeneratorClient />
}