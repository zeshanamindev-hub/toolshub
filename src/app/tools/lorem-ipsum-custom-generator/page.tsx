import { generateToolMetadata } from "@/components/seo/tool-seo"
import LoremIpsumCustomGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Custom Lorem Ipsum",
  toolDescription: "Generate custom Lorem Ipsum text with your own words. Create personalized placeholder text with custom word lists. Free online custom Lorem generator.",
  category: "Generators",
  keywords: [
    "custom lorem ipsum",
    "lorem ipsum custom",
    "custom placeholder text",
    "custom dummy text",
    "personalized lorem",
    "custom text generator",
    "lorem with custom words",
    "custom filler text"
  ],
  toolPath: "/tools/lorem-ipsum-custom-generator"
})

export default function LoremIpsumCustomGeneratorPage() {
  return <LoremIpsumCustomGeneratorClient />
}
