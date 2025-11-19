import { generateToolMetadata } from "@/components/seo/tool-seo"
import JavascriptObfuscatorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "JS Obfuscator",
  toolDescription: "Obfuscate JavaScript code to protect source code. Make JS harder to reverse engineer with variable renaming and code transformation. Free online JS obfuscator.",
  category: "Developer Tools",
  keywords: [
    "javascript obfuscator",
    "javascript obfuscator online",
    "js obfuscator",
    "js obfuscator online",
    "obfuscate javascript",
    "obfuscate javascript online",
    "protect js code",
    "javascript protection tool",
    "code obfuscation",
    "obfuscate js online",
    "javascript security",
    "free javascript obfuscator",
    "javascript code protection",
    "obfuscate js code",
    "javascript minify obfuscate",
    "js code obfuscator",
    "online js obfuscator",
    "javascript obfuscation tool",
    "protect javascript source",
    "javascript code security"
  ],
  toolPath: "/tools/javascript-obfuscator"
})

export default function JavascriptObfuscatorPage() {
  return <JavascriptObfuscatorClient />
}
