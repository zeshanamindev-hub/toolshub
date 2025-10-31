import { generateToolMetadata } from "@/components/seo/tool-seo"
import LoremIpsumGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Lorem Ipsum Generator",
  toolDescription: "Generate Lorem Ipsum placeholder text instantly. Customize paragraphs, words, and sentences. Free online Lorem Ipsum generator for designers and developers.",
  category: "Generators",
  keywords: [
    "lorem ipsum",
    "lorem ipsum generator",
    "placeholder text",
    "dummy text",
    "fake text generator",
    "lorem ipsum dolor",
    "text generator",
    "lorem generator"
  ],
  toolPath: "/tools/lorem-ipsum-generator"
})

export default function LoremIpsumGeneratorPage() {
  return <LoremIpsumGeneratorClient />
}
