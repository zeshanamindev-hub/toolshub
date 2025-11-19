import { generateToolMetadata } from "@/components/seo/tool-seo"
import CaseConverterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Case Converter",
  toolDescription: "Free online case converter tool. Convert text to uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, and kebab-case instantly.",
  category: "Text & Writing",
  keywords: [
    "case converter",
    "text case converter",
    "uppercase converter",
    "lowercase converter",
    "convert to uppercase",
    "convert to lowercase",
    "title case converter",
    "sentence case converter",
    "camelcase converter",
    "snake case converter",
    "kebab case converter",
    "pascal case converter",
    "change text case online",
    "text case changer",
    "case transformer",
    "capitalize text",
    "uppercase to lowercase",
    "text formatting tool",
    "case conversion tool",
    "string case converter"
  ],
  toolPath: "/tools/case-converter"
})

export default function CaseConverterPage() {
  return <CaseConverterClient />
}
