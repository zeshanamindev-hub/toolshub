import { generateToolMetadata } from "@/components/seo/tool-seo"
import OpenGraphPreviewClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Open Graph Preview Tool",
  toolDescription: "Preview how your Open Graph meta tags will appear when shared on Facebook, LinkedIn, and other social platforms. Test titles, descriptions, and images for perfect social sharing.",
  category: "Developer Tools",
  keywords: [
    "Open Graph preview",
    "Facebook share preview",
    "social media preview",
    "OG tags preview",
    "social sharing preview",
    "meta tags preview",
    "Facebook debugger",
    "LinkedIn preview",
    "social media optimization"
  ],
  toolPath: "/tools/open-graph-preview"
})

export default function OpenGraphPreviewPage() {
  return <OpenGraphPreviewClient />
}