import { generateToolMetadata } from "@/components/seo/tool-seo"
import ReverseWordOrderClient from "./client"

// Export metadata for SEO
export const metadata = generateToolMetadata({
  toolName: "Reverse Word Order Tool",
  toolDescription: "Reverse the order of words in your text instantly. Perfect for creating unique text variations, puzzles, or analyzing sentence structure.",
  category: "Text & Writing",
  keywords: [
    "reverse word order",
    "reverse word order online",
    "word reverser",
    "word reverser online",
    "text reversal tool",
    "sentence reversal",
    "word order reverser",
    "text manipulation tool",
    "reverse text words",
    "word order tool",
    "free word reverser",
    "backwards word order",
    "flip word order",
    "reverse sentence words",
    "word order changer",
    "reverse words in sentence",
    "text word reverser",
    "sentence word reverser",
    "invert word order",
    "reverse word sequence"
  ],
  toolPath: "/tools/reverse-word-order"
})

export default function ReverseWordOrderPage() {
  return <ReverseWordOrderClient />
}
