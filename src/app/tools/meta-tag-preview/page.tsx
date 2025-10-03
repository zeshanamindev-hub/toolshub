import { generateToolMetadata } from "@/components/seo/tool-seo"
import MetaTagPreviewClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Meta Tag Preview Tool",
  toolDescription: "Preview how your meta tags will appear in Google search results and social media platforms. Test title tags, descriptions, and Open Graph meta tags for optimal SEO and social sharing.",
  category: "Developer Tools",
  keywords: [
    "meta tag preview",
    "SEO preview",
    "Google search preview",
    "social media preview",
    "meta description preview",
    "title tag preview",
    "Open Graph preview",
    "Twitter Card preview",
    "search result preview"
  ],
  toolPath: "/tools/meta-tag-preview"
})

export default function MetaTagPreviewPage() {
  return <MetaTagPreviewClient />
}