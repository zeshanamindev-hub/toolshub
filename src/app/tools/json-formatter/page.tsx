import { generateToolMetadata } from "@/components/seo/tool-seo"
import JsonFormatterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "JSON Formatter",
  toolDescription: "Format, validate, and beautify JSON instantly. Minify JSON and fix syntax errors. Free online JSON formatter and validator with syntax highlighting.",
  category: "Developer Tools",
  keywords: [
    "json formatter",
    "json beautifier",
    "json validator",
    "format json",
    "json pretty print",
    "json minifier",
    "json viewer",
    "validate json"
  ],
  toolPath: "/tools/json-formatter"
})

export default function JsonFormatterPage() {
  return <JsonFormatterClient />
}
