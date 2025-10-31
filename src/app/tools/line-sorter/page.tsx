import { generateToolMetadata } from "@/components/seo/tool-seo"
import LineSorterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Line Sorter",
  toolDescription: "Sort lines alphabetically, numerically, or by length instantly. Reverse sort and remove duplicates. Free online text line sorting tool.",
  category: "Text & Writing",
  keywords: [
    "line sorter",
    "sort lines",
    "alphabetical sort",
    "sort text",
    "line organizer",
    "text sorter",
    "sort alphabetically",
    "sort lines online"
  ],
  toolPath: "/tools/line-sorter"
})

export default function LineSorterPage() {
  return <LineSorterClient />
}
