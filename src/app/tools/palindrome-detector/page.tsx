import { generateToolMetadata } from "@/components/seo/tool-seo"
import PalindromeDetectorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Palindrome Detector",
  toolDescription: "Detect and highlight palindromic words within text instantly. Find all palindromes automatically with minimum length filter. Free online palindrome finder and analyzer.",
  category: "Text & Writing",
  keywords: [
    "palindrome detector",
    "find palindromes",
    "palindrome finder",
    "detect palindromes",
    "palindrome words",
    "palindrome analyzer",
    "find palindromic words",
    "palindrome scanner"
  ],
  toolPath: "/tools/palindrome-detector"
})

export default function PalindromeDetectorPage() {
  return <PalindromeDetectorClient />
}
