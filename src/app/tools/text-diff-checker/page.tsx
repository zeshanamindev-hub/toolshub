import { generateToolMetadata } from "@/components/seo/tool-seo"
import TextDiffCheckerClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Text Diff Checker",
  toolDescription: "Compare two texts and find differences instantly. Highlight additions, deletions, and changes side-by-side. Free online text diff tool for comparing documents.",
  category: "Developer Tools",
  keywords: [
    "text diff",
    "compare text",
    "text difference",
    "diff checker",
    "text comparison",
    "compare documents",
    "file diff",
    "text compare tool"
  ],
  toolPath: "/tools/text-diff-checker"
})

export default function TextDiffCheckerPage() {
  return <TextDiffCheckerClient />
}
