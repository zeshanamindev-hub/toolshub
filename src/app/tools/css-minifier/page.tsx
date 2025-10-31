import { generateToolMetadata } from "@/components/seo/tool-seo"
import CssMinifierClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "CSS Minifier",
  toolDescription: "Minify CSS code instantly. Compress and optimize CSS for faster loading. Free online CSS minifier and compressor for web developers.",
  category: "Developer Tools",
  keywords: [
    "css minifier",
    "minify css",
    "css compressor",
    "compress css",
    "css optimizer",
    "reduce css size",
    "css minification",
    "optimize css"
  ],
  toolPath: "/tools/css-minifier"
})

export default function CssMinifierPage() {
  return <CssMinifierClient />
}
