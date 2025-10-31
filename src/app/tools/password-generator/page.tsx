import { generateToolMetadata } from "@/components/seo/tool-seo"
import PasswordGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Password Generator",
  toolDescription: "Generate strong, secure passwords instantly. Customize length, character types, and security level. Free online random password generator with strength meter.",
  category: "Generators",
  keywords: [
    "password generator",
    "strong password",
    "random password",
    "secure password generator",
    "password maker",
    "generate password",
    "password creator",
    "password strength"
  ],
  toolPath: "/tools/password-generator"
})

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />
}
