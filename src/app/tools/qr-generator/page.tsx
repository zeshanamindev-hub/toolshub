import { generateToolMetadata } from "@/components/seo/tool-seo"
import QrGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "QR Code Generator",
  toolDescription: "Generate QR codes for URLs, text, emails, and more. Customize size and download as PNG. Free online QR code generator with instant preview.",
  category: "Generators",
  keywords: [
    "qr code generator",
    "qr generator",
    "create qr code",
    "qr code maker",
    "generate qr code",
    "qr code creator",
    "free qr code",
    "qr code online"
  ],
  toolPath: "/tools/qr-generator"
})

export default function QrGeneratorPage() {
  return <QrGeneratorClient />
}
