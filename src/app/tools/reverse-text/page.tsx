import { generateToolMetadata } from "@/components/seo/tool-seo"
import ReverseTextClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Reverse Text",
  toolDescription: "Reverse text character by character or word by word instantly. Create mirror text, flip text backwards, reverse lines. Free online text reversal tool with 8 different reversal modes.",
  category: "Text & Writing",
  keywords: [
    "reverse text",
    "flip text backwards",
    "mirror text",
    "backwards text generator",
    "reverse letters",
    "text reverser",
    "flip words",
    "backwards writing"
  ],
  toolPath: "/tools/reverse-text"
})

export default function ReverseTextPage() {
  return <ReverseTextClient />
}
