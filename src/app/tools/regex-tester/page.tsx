import { generateToolMetadata } from "@/components/seo/tool-seo"
import RegexTesterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Regex Tester",
  toolDescription: "Test regular expressions with real-time matching. Debug regex patterns with highlighted matches and detailed explanations. Free online regex tester for developers.",
  category: "Developer Tools",
  keywords: [
    "regex tester",
    "regular expression tester",
    "regex validator",
    "test regex",
    "regex debugger",
    "regex online",
    "regex checker",
    "regex tool"
  ],
  toolPath: "/tools/regex-tester"
})

export default function RegexTesterPage() {
  return <RegexTesterClient />
}
