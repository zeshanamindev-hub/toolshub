import { generateToolMetadata } from "@/components/seo/tool-seo"
import BrokenLinkCheckerClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Broken Link Checker (Local HTML Paste)",
  toolDescription: "Check for broken links in your HTML content. Extract and validate all links from pasted HTML to identify potential broken or malformed URLs.",
  category: "Developer Tools",
  keywords: [
    "broken link checker",
    "link validator",
    "HTML link checker",
    "dead link detector",
    "URL validation",
    "link checker",
    "broken links",
    "link analysis"
  ],
  toolPath: "/tools/broken-link-checker"
})

export default function BrokenLinkCheckerPage() {
  return <BrokenLinkCheckerClient />
}