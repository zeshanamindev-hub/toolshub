import { generateToolMetadata } from "@/components/seo/tool-seo"
import TimestampConverterClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Timestamp Converter",
  toolDescription: "Convert Unix timestamps to human-readable dates and vice versa. Support for milliseconds, timezones, and multiple formats. Free online timestamp converter.",
  category: "Converters & Encoding",
  keywords: [
    "timestamp converter",
    "unix timestamp converter",
    "epoch converter online",
    "timestamp to date converter",
    "date to timestamp converter",
    "unix time converter",
    "epoch time converter",
    "timestamp converter online",
    "convert timestamp to date",
    "convert unix timestamp",
    "unix epoch converter",
    "millisecond timestamp converter",
    "utc timestamp converter",
    "timestamp to human readable",
    "epoch to date converter",
    "free timestamp converter",
    "current timestamp converter",
    "javascript timestamp converter",
    "timestamp conversion tool",
    "unix time to date"
  ],
  toolPath: "/tools/timestamp-converter"
})

export default function TimestampConverterPage() {
  return <TimestampConverterClient />
}
