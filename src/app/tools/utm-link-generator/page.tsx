import { generateToolMetadata } from "@/components/seo/tool-seo"
import UtmLinkGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "UTM Link Generator",
  toolDescription: "Generate UTM tracking parameters for your links to monitor campaign performance in Google Analytics. Create trackable URLs for email marketing, social media, and advertising campaigns.",
  category: "Generators",
  keywords: [
    "UTM link generator",
    "UTM link generator online",
    "Google Analytics tracking",
    "campaign tracking tool",
    "UTM parameters generator",
    "link tracking generator",
    "marketing links generator",
    "URL builder",
    "campaign URLs generator",
    "free UTM generator",
    "UTM code generator",
    "UTM builder",
    "google analytics url builder",
    "campaign url generator",
    "utm tracking generator",
    "utm tag generator",
    "marketing campaign tracker",
    "utm parameter builder",
    "trackable link generator",
    "utm url creator"
  ],
  toolPath: "/tools/utm-link-generator"
})

export default function UtmLinkGeneratorPage() {
  return <UtmLinkGeneratorClient />
}