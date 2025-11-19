import { generateToolMetadata } from "@/components/seo/tool-seo"
import JsonFormatterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "JSON Formatter",
  toolDescription: "Free online JSON formatter, validator, and beautifier. Format, validate, and prettify JSON instantly with syntax highlighting and error detection. Minify or beautify JSON data with custom indentation.",
  category: "Developer Tools",
  keywords: [
    "json formatter",
    "json formatter online",
    "json validator",
    "json beautifier",
    "format json online",
    "json pretty print",
    "json minifier",
    "json viewer",
    "validate json",
    "beautify json",
    "json formatter and validator",
    "json syntax checker",
    "json lint",
    "format json data",
    "json editor online",
    "json parser online",
    "json formatter tool",
    "online json formatter",
    "free json formatter",
    "json prettifier"
  ],
  toolPath: "/tools/json-formatter"
})

export default function JsonFormatterPage() {
  return <JsonFormatterClient />
}
