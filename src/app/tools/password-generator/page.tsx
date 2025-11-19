import { generateToolMetadata } from "@/components/seo/tool-seo"
import PasswordGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Password Generator",
  toolDescription: "Free secure password generator. Create strong, random passwords with custom length, uppercase, lowercase, numbers, and symbols. Generate unhackable passwords instantly for maximum security.",
  category: "Generators",
  keywords: [
    "password generator",
    "random password generator",
    "secure password generator",
    "strong password generator",
    "password creator",
    "generate password online",
    "free password generator",
    "random password creator",
    "secure password maker",
    "strong password creator",
    "password generator online free",
    "create secure password",
    "generate strong password",
    "random password maker",
    "safe password generator",
    "complex password generator",
    "unique password generator",
    "password generator tool",
    "make strong password",
    "password builder"
  ],
  toolPath: "/tools/password-generator"
})

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />
}
