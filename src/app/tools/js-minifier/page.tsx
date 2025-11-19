import { generateToolMetadata } from "@/components/seo/tool-seo"
import JsMinifierClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "JS Minifier",
  toolDescription: "Minify JavaScript code instantly. Compress and optimize JS for better performance. Free online JavaScript minifier and compressor.",
  category: "Developer Tools",
  keywords: [
    "js minifier",
    "js minifier online",
    "minify javascript",
    "javascript minifier online",
    "compress js online",
    "js compressor",
    "javascript optimizer",
    "minify js online",
    "reduce js size",
    "free javascript minifier",
    "compress javascript code",
    "javascript compression tool",
    "online js minifier",
    "minify js code",
    "javascript file compressor",
    "reduce javascript file size",
    "js code optimizer",
    "shrink javascript file",
    "javascript minification tool",
    "web js minifier"
  ],
  toolPath: "/tools/js-minifier"
})

export default function JsMinifierPage() {
  return <JsMinifierClient />
}
