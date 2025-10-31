import { generateToolMetadata } from "@/components/seo/tool-seo"
import CaseConverterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Case Converter",
  toolDescription: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more. 11 different case formats with instant conversion. Free online text case changer for all your formatting needs.",
  category: "Text & Writing",
  keywords: [
    "case converter",
    "text case converter",
    "uppercase converter",
    "lowercase converter",
    "title case",
    "camel case converter",
    "snake case converter",
    "text formatter"
  ],
  toolPath: "/tools/case-converter"
})

export default function CaseConverterPage() {
  return <CaseConverterClient />
}
