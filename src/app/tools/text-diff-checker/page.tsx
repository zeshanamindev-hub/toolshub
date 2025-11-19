import { generateToolMetadata } from "@/components/seo/tool-seo"
import TextDiffCheckerClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Text Diff Checker",
  toolDescription: "Compare two texts and find differences instantly. Highlight additions, deletions, and changes side-by-side. Free online text diff tool for comparing documents.",
  category: "Developer Tools",
  keywords: [
    "text diff",
    "text diff checker",
    "compare text online",
    "text difference checker",
    "diff checker online",
    "text comparison tool",
    "compare documents online",
    "file diff checker",
    "text compare tool",
    "side by side text comparison",
    "find differences in text",
    "document comparison tool",
    "code diff checker",
    "free text diff",
    "online diff tool",
    "text diff tool",
    "compare two texts",
    "text change tracker",
    "text difference finder",
    "compare text files"
  ],
  toolPath: "/tools/text-diff-checker"
})

export default function TextDiffCheckerPage() {
  return <TextDiffCheckerClient />
}
