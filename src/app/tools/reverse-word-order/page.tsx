import { generateToolMetadata } from "@/components/seo/tool-seo"
import ReverseWordOrderClient from "./client"

// Export metadata for SEO
export const metadata = generateToolMetadata({
  toolName: "Reverse Word Order Tool",
  toolDescription: "Reverse the order of words in your text instantly. Perfect for creating unique text variations, puzzles, or analyzing sentence structure.",
  category: "Text & Writing",
  keywords: [
    "reverse word order",
    "word reverser",
    "text reversal",
    "sentence reversal",
    "word order tool",
    "text manipulation",
    "reverse text",
    "word shuffle"
  ],
  toolPath: "/tools/reverse-word-order"
})

export default function ReverseWordOrderPage() {
  return <ReverseWordOrderClient />
}
