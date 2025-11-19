import { generateToolMetadata } from "@/components/seo/tool-seo"
import HashGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Hash Generator",
  toolDescription: "Free online hash generator. Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly. Calculate cryptographic checksums for text and files securely.",
  category: "Generators",
  keywords: [
    "hash generator",
    "hash generator online",
    "md5 generator",
    "sha256 generator",
    "sha1 generator",
    "sha512 generator",
    "checksum calculator",
    "hash calculator",
    "crypto hash generator",
    "generate hash online",
    "md5 hash generator",
    "sha256 hash",
    "cryptographic hash",
    "hash function calculator",
    "text to hash",
    "string hash generator",
    "hash maker",
    "secure hash algorithm",
    "hash checksum",
    "hash tool"
  ],
  toolPath: "/tools/hash-generator"
})

export default function HashGeneratorPage() {
  return <HashGeneratorClient />
}
