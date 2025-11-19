import { generateToolMetadata } from "@/components/seo/tool-seo"
import CssMinifierClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "CSS Minifier",
  toolDescription: "Minify CSS code instantly. Compress and optimize CSS for faster loading. Free online CSS minifier and compressor for web developers.",
  category: "Developer Tools",
  keywords: [
    "css minifier",
    "css minifier online",
    "minify css online",
    "css compressor",
    "compress css online",
    "css optimizer",
    "reduce css size",
    "css minification tool",
    "optimize css online",
    "free css minifier",
    "css file compressor",
    "minify css code",
    "css compression tool",
    "online css optimizer",
    "css size reducer",
    "compress css files",
    "css minify tool",
    "web css minifier",
    "css performance optimizer",
    "shrink css file"
  ],
  toolPath: "/tools/css-minifier"
})

export default function CssMinifierPage() {
  return <CssMinifierClient />
}
