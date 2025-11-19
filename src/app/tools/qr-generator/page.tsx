import { generateToolMetadata } from "@/components/seo/tool-seo"
import QrGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "QR Code Generator",
  toolDescription: "Free QR code generator online. Create custom QR codes for URLs, text, WiFi, vCards, and more. Download high-quality PNG or SVG. No registration required.",
  category: "Generators",
  keywords: [
    "qr code generator",
    "qr code generator free",
    "create qr code",
    "qr code maker",
    "free qr code generator",
    "qr code creator online",
    "generate qr code free",
    "qr generator online",
    "make qr code",
    "qr code builder",
    "custom qr code generator",
    "qr code generator online free",
    "barcode generator",
    "qr code creator",
    "url to qr code",
    "wifi qr code generator",
    "vcard qr code",
    "qr code download",
    "qr code png",
    "qr code svg"
  ],
  toolPath: "/tools/qr-generator"
})

export default function QrGeneratorPage() {
  return <QrGeneratorClient />
}
