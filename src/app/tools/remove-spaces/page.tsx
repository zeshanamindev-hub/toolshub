import { generateToolMetadata } from "@/components/seo/tool-seo"
import RemoveSpacesClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Remove Extra Spaces",
  toolDescription: "Remove extra spaces, tabs, and normalize whitespace instantly. Clean up messy text formatting with 8 space removal options. Free online whitespace cleaner and text formatter.",
  category: "Text & Writing",
  keywords: [
    "remove extra spaces",
    "remove whitespace",
    "clean text",
    "normalize spaces",
    "text formatter",
    "remove tabs",
    "trim spaces",
    "whitespace remover"
  ],
  toolPath: "/tools/remove-spaces"
})

export default function RemoveSpacesPage() {
  return <RemoveSpacesClient />
}
