import { generateToolMetadata } from "@/components/seo/tool-seo"
import FaviconGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Favicon Generator",
  toolDescription: "Convert PNG images to ICO favicon files instantly in your browser. Generate high-quality favicons for websites with multiple sizes and formats supported.",
  category: "Generators",
  keywords: [
    "favicon generator",
    "PNG to ICO converter",
    "website favicon",
    "favicon creator",
    "ico file generator",
    "browser favicon maker",
    "favicon converter",
    "website icon generator"
  ],
  toolPath: "/tools/favicon-generator"
})

export default function FaviconGeneratorPage() {
  return <FaviconGeneratorClient />
}