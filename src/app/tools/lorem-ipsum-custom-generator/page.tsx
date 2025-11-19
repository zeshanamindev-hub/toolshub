import { generateToolMetadata } from "@/components/seo/tool-seo"
import LoremIpsumCustomGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Custom Lorem Ipsum",
  toolDescription: "Generate custom Lorem Ipsum text with your own words. Create personalized placeholder text with custom word lists. Free online custom Lorem generator.",
  category: "Generators",
  keywords: [
    "custom lorem ipsum",
    "custom lorem ipsum generator",
    "lorem ipsum custom",
    "custom placeholder text",
    "custom placeholder text generator",
    "custom dummy text",
    "custom dummy text generator",
    "personalized lorem ipsum",
    "custom text generator",
    "lorem with custom words",
    "custom filler text",
    "free custom lorem ipsum",
    "generate custom placeholder",
    "custom lorem generator",
    "personalized dummy text",
    "custom word lorem ipsum",
    "custom lipsum generator",
    "lorem ipsum own words",
    "custom fake text",
    "custom lorem maker"
  ],
  toolPath: "/tools/lorem-ipsum-custom-generator"
})

export default function LoremIpsumCustomGeneratorPage() {
  return <LoremIpsumCustomGeneratorClient />
}
