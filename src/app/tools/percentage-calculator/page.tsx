import { generateToolMetadata } from "@/components/seo/tool-seo"
import PercentageCalculatorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Percentage Calculator",
  toolDescription: "Calculate percentages, increases, decreases, and ratios instantly. Multiple calculation modes for all your percentage needs. Free online percentage calculator.",
  category: "Calculators",
  keywords: [
    "percentage calculator",
    "calculate percentage",
    "percent calculator",
    "percentage increase",
    "percentage decrease",
    "percent of",
    "percentage change",
    "percentage online"
  ],
  toolPath: "/tools/percentage-calculator"
})

export default function PercentageCalculatorPage() {
  return <PercentageCalculatorClient />
}
