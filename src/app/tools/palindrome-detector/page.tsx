import { generateToolMetadata } from "@/components/seo/tool-seo"
import PalindromeDetectorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Palindrome Detector",
  toolDescription: "Detect and highlight palindromic words within text instantly. Find all palindromes automatically with minimum length filter. Free online palindrome finder and analyzer.",
  category: "Text & Writing",
  keywords: [
    "palindrome detector",
    "palindrome detector online",
    "find palindromes",
    "find palindromes online",
    "palindrome finder",
    "palindrome finder online",
    "detect palindromes",
    "palindrome words finder",
    "palindrome analyzer",
    "find palindromic words",
    "palindrome scanner",
    "free palindrome detector",
    "palindrome word finder",
    "detect palindromic words",
    "palindrome search tool",
    "find palindrome words",
    "palindrome detection tool",
    "identify palindromes",
    "palindrome highlighter",
    "palindrome checker tool"
  ],
  toolPath: "/tools/palindrome-detector"
})

export default function PalindromeDetectorPage() {
  return <PalindromeDetectorClient />
}
