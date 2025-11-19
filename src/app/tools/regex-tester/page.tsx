import { generateToolMetadata } from "@/components/seo/tool-seo"
import RegexTesterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Regex Tester",
  toolDescription: "Test regular expressions with real-time matching. Debug regex patterns with highlighted matches and detailed explanations. Free online regex tester for developers.",
  category: "Developer Tools",
  keywords: [
    "regex tester",
    "regex tester online",
    "regular expression tester",
    "regex validator online",
    "test regex online",
    "regex debugger online",
    "regex checker",
    "regex tool",
    "free regex tester",
    "regex pattern tester",
    "javascript regex tester",
    "online regex validator",
    "regex testing tool",
    "test regular expression",
    "regex match tester",
    "regex playground",
    "regex generator and tester",
    "regular expression validator",
    "regex pattern validator",
    "regex evaluation tool"
  ],
  toolPath: "/tools/regex-tester"
})

export default function RegexTesterPage() {
  return <RegexTesterClient />
}
