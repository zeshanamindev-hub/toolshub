import { generateToolMetadata } from "@/components/seo/tool-seo"
import RandomStringClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Random String Generator",
  toolDescription: "Generate random strings with custom length and character sets. Create secure tokens, IDs, and test data. Free online random string generator.",
  category: "Generators",
  keywords: [
    "random string",
    "random string generator",
    "random string generator online",
    "generate random string",
    "random text generator",
    "string generator online",
    "random id generator",
    "random token generator",
    "random characters generator",
    "free random string",
    "random password generator",
    "random alphanumeric string",
    "secure random string",
    "random string maker",
    "generate random text",
    "random character generator",
    "unique string generator",
    "random key generator",
    "random code generator",
    "random string creator"
  ],
  toolPath: "/tools/random-string"
})

export default function RandomStringPage() {
  return <RandomStringClient />
}
