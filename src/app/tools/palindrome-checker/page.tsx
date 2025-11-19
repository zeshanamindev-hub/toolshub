import { generateToolMetadata } from "@/components/seo/tool-seo"
import PalindromeCheckerClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Palindrome Checker",
  toolDescription: "Free online palindrome checker. Instantly detect if words, phrases, or sentences are palindromes. Case-insensitive checking with space and punctuation handling.",
  category: "Text & Writing",
  keywords: [
    "palindrome checker",
    "palindrome checker online",
    "palindrome detector",
    "check palindrome",
    "is it a palindrome",
    "palindrome tester",
    "palindrome validator",
    "palindrome finder",
    "check if palindrome",
    "palindrome verification",
    "palindrome tool",
    "detect palindrome",
    "palindrome analyzer",
    "word palindrome checker",
    "phrase palindrome",
    "sentence palindrome",
    "palindrome test",
    "verify palindrome",
    "palindrome scanner",
    "free palindrome checker"
  ],
  toolPath: "/tools/palindrome-checker"
})

export default function PalindromeCheckerPage() {
  return <PalindromeCheckerClient />
}
