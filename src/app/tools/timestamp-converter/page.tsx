import { generateToolMetadata } from "@/components/seo/tool-seo"
import TimestampConverterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Timestamp Converter",
  toolDescription: "Convert Unix timestamps to human-readable dates and vice versa. Support for milliseconds, timezones, and multiple formats. Free online timestamp converter.",
  category: "Converters & Encoding",
  keywords: [
    "timestamp converter",
    "unix timestamp",
    "epoch converter",
    "timestamp to date",
    "date to timestamp",
    "unix time converter",
    "epoch time",
    "timestamp online"
  ],
  toolPath: "/tools/timestamp-converter"
})

export default function TimestampConverterPage() {
  return <TimestampConverterClient />
}
