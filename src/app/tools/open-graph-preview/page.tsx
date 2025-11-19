import { generateToolMetadata } from "@/components/seo/tool-seo"
import OpenGraphPreviewClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Open Graph Preview Tool",
  toolDescription: "Preview how your Open Graph meta tags will appear when shared on Facebook, LinkedIn, and other social platforms. Test titles, descriptions, and images for perfect social sharing.",
  category: "Developer Tools",
  keywords: [
    "Open Graph preview",
    "Open Graph preview tool",
    "Facebook share preview",
    "Facebook share preview tool",
    "social media preview",
    "social media preview tool",
    "OG tags preview",
    "social sharing preview",
    "meta tags preview",
    "Facebook debugger",
    "LinkedIn preview tool",
    "social media optimization",
    "free Open Graph preview",
    "og meta tags preview",
    "test open graph tags",
    "facebook card preview",
    "social meta preview",
    "og tag tester",
    "social sharing tester",
    "preview social cards"
  ],
  toolPath: "/tools/open-graph-preview"
})

export default function OpenGraphPreviewPage() {
  return <OpenGraphPreviewClient />
}