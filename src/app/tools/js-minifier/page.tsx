import { generateToolMetadata } from "@/components/seo/tool-seo"
import JsMinifierClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "JS Minifier",
  toolDescription: "Minify JavaScript code instantly. Compress and optimize JS for better performance. Free online JavaScript minifier and compressor.",
  category: "Developer Tools",
  keywords: [
    "js minifier",
    "minify javascript",
    "javascript minifier",
    "compress js",
    "js compressor",
    "javascript optimizer",
    "minify js online",
    "reduce js size"
  ],
  toolPath: "/tools/js-minifier"
})

export default function JsMinifierPage() {
  return <JsMinifierClient />
}
