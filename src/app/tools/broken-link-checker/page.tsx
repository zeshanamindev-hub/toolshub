import { generateToolMetadata } from "@/components/seo/tool-seo"
import BrokenLinkCheckerClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Broken Link Checker (Local HTML Paste)",
  toolDescription: "Check for broken links in your HTML content. Extract and validate all links from pasted HTML to identify potential broken or malformed URLs.",
  category: "Developer Tools",
  keywords: [
    "broken link checker",
    "broken link checker online",
    "link validator",
    "link validator online",
    "HTML link checker",
    "dead link detector",
    "dead link checker",
    "URL validation tool",
    "link checker online",
    "broken links finder",
    "link analysis tool",
    "free broken link checker",
    "check broken links",
    "find broken links",
    "html link validator",
    "website link checker",
    "link testing tool",
    "validate links",
    "broken url checker",
    "link health checker"
  ],
  toolPath: "/tools/broken-link-checker"
})

export default function BrokenLinkCheckerPage() {
  return <BrokenLinkCheckerClient />
}