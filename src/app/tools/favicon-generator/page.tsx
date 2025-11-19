import { generateToolMetadata } from "@/components/seo/tool-seo"
import FaviconGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Favicon Generator",
  toolDescription: "Convert PNG images to ICO favicon files instantly in your browser. Generate high-quality favicons for websites with multiple sizes and formats supported.",
  category: "Generators",
  keywords: [
    "favicon generator",
    "favicon generator online",
    "PNG to ICO converter",
    "PNG to ICO converter online",
    "website favicon",
    "favicon creator online",
    "ico file generator",
    "browser favicon maker",
    "favicon converter",
    "website icon generator",
    "free favicon generator",
    "create favicon",
    "favicon maker",
    "generate favicon",
    "favicon from image",
    "favicon tool",
    "online favicon creator",
    "favicon builder",
    "favicon icon generator",
    "make favicon"
  ],
  toolPath: "/tools/favicon-generator"
})

export default function FaviconGeneratorPage() {
  return <FaviconGeneratorClient />
}