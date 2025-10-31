import { generateToolMetadata } from "@/components/seo/tool-seo"
import HashGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Hash Generator",
  toolDescription: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes instantly. Create cryptographic hashes from text or files. Free online hash generator for developers.",
  category: "Generators",
  keywords: [
    "hash generator",
    "md5 generator",
    "sha256 generator",
    "hash calculator",
    "checksum generator",
    "crypto hash",
    "hash function",
    "hash online"
  ],
  toolPath: "/tools/hash-generator"
})

export default function HashGeneratorPage() {
  return <HashGeneratorClient />
}
