import { generateToolMetadata } from "@/components/seo/tool-seo"
import LoremIpsumGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Lorem Ipsum Generator",
  toolDescription: "Free Lorem Ipsum generator. Generate placeholder text in paragraphs, sentences, or words. Perfect dummy text for designers, developers, and mockups. Classic Latin filler text.",
  category: "Generators",
  keywords: [
    "lorem ipsum generator",
    "lorem ipsum",
    "lorem ipsum generator online",
    "placeholder text generator",
    "dummy text generator",
    "lorem generator",
    "lipsum generator",
    "filler text generator",
    "lorem ipsum text",
    "generate lorem ipsum",
    "placeholder content",
    "dummy content generator",
    "lorem ipsum paragraphs",
    "sample text generator",
    "mockup text",
    "design placeholder text",
    "lorem ipsum words",
    "latin text generator",
    "lorem ipsum maker",
    "free lorem ipsum"
  ],
  toolPath: "/tools/lorem-ipsum-generator"
})

export default function LoremIpsumGeneratorPage() {
  return <LoremIpsumGeneratorClient />
}
