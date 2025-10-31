import { generateToolMetadata } from "@/components/seo/tool-seo"
import RandomStringClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Random String Generator",
  toolDescription: "Generate random strings with custom length and character sets. Create secure tokens, IDs, and test data. Free online random string generator.",
  category: "Generators",
  keywords: [
    "random string",
    "random string generator",
    "generate random string",
    "random text generator",
    "string generator",
    "random id generator",
    "random token",
    "random characters"
  ],
  toolPath: "/tools/random-string"
})

export default function RandomStringPage() {
  return <RandomStringClient />
}
