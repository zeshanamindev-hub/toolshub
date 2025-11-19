import { generateToolMetadata } from "@/components/seo/tool-seo"
import ReverseTextClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Reverse Text",
  toolDescription: "Free online text reverser. Reverse text, flip words backwards, or create mirror text instantly. Multiple reversal modes including character, word, and line reversal.",
  category: "Text & Writing",
  keywords: [
    "reverse text",
    "reverse text online",
    "text reverser",
    "reverse string",
    "backwards text generator",
    "flip text backwards",
    "mirror text generator",
    "reverse words",
    "text flipper",
    "backwards text",
    "reverse letters",
    "flip text online",
    "text reversal tool",
    "reverse sentence",
    "backwards generator",
    "mirror writing",
    "reverse text generator",
    "flip words",
    "backwards converter",
    "reverse line"
  ],
  toolPath: "/tools/reverse-text"
})

export default function ReverseTextPage() {
  return <ReverseTextClient />
}
