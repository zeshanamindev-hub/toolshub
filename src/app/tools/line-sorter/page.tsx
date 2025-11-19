import { generateToolMetadata } from "@/components/seo/tool-seo"
import LineSorterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Line Sorter",
  toolDescription: "Sort lines alphabetically, numerically, or by length instantly. Reverse sort and remove duplicates. Free online text line sorting tool.",
  category: "Text & Writing",
  keywords: [
    "line sorter",
    "line sorter online",
    "sort lines online",
    "alphabetical sort",
    "sort text lines",
    "line organizer",
    "text sorter",
    "sort alphabetically online",
    "sort lines tool",
    "free line sorter",
    "alphabetize lines",
    "sort text alphabetically",
    "numerical line sort",
    "reverse line sort",
    "remove duplicate lines",
    "organize text lines",
    "sort by length",
    "line sorting tool",
    "text line organizer",
    "alphabetize text"
  ],
  toolPath: "/tools/line-sorter"
})

export default function LineSorterPage() {
  return <LineSorterClient />
}
