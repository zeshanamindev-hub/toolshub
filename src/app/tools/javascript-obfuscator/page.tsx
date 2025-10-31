import { generateToolMetadata } from "@/components/seo/tool-seo"
import JavascriptObfuscatorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "JS Obfuscator",
  toolDescription: "Obfuscate JavaScript code to protect source code. Make JS harder to reverse engineer with variable renaming and code transformation. Free online JS obfuscator.",
  category: "Developer Tools",
  keywords: [
    "javascript obfuscator",
    "js obfuscator",
    "obfuscate javascript",
    "protect js code",
    "javascript protection",
    "code obfuscation",
    "obfuscate js online",
    "javascript security"
  ],
  toolPath: "/tools/javascript-obfuscator"
})

export default function JavascriptObfuscatorPage() {
  return <JavascriptObfuscatorClient />
}
