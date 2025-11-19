import { generateToolMetadata } from "@/components/seo/tool-seo"
import RemoveSpacesClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Remove Extra Spaces",
  toolDescription: "Remove extra spaces, tabs, and normalize whitespace instantly. Clean up messy text formatting with 8 space removal options. Free online whitespace cleaner and text formatter.",
  category: "Text & Writing",
  keywords: [
    "remove extra spaces",
    "remove extra spaces online",
    "remove whitespace",
    "remove whitespace online",
    "clean text",
    "normalize spaces",
    "text formatter",
    "remove tabs online",
    "trim spaces online",
    "whitespace remover",
    "free space remover",
    "delete extra spaces",
    "remove double spaces",
    "clean up text formatting",
    "space cleaner",
    "text whitespace cleaner",
    "remove multiple spaces",
    "space normalizer",
    "trim whitespace",
    "cleanup text spaces"
  ],
  toolPath: "/tools/remove-spaces"
})

export default function RemoveSpacesPage() {
  return <RemoveSpacesClient />
}
