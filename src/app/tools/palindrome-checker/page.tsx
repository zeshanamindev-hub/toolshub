import { generateToolMetadata } from "@/components/seo/tool-seo"
import PalindromeCheckerClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Palindrome Checker",
  toolDescription: "Check if text is a palindrome ignoring case, spaces & punctuation. Instant palindrome detection for words, phrases, and numbers. Free online palindrome tester.",
  category: "Text & Writing",
  keywords: [
    "palindrome checker",
    "palindrome tester",
    "palindrome detector",
    "check palindrome",
    "is palindrome",
    "palindrome validator",
    "word palindrome",
    "phrase palindrome"
  ],
  toolPath: "/tools/palindrome-checker"
})

export default function PalindromeCheckerPage() {
  return <PalindromeCheckerClient />
}
