import { generateToolMetadata } from "@/components/seo/tool-seo"
import PercentageCalculatorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Percentage Calculator",
  toolDescription: "Calculate percentages, increases, decreases, and ratios instantly. Multiple calculation modes for all your percentage needs. Free online percentage calculator.",
  category: "Calculators",
  keywords: [
    "percentage calculator",
    "percentage calculator online",
    "calculate percentage",
    "calculate percentage online",
    "percent calculator",
    "percentage increase calculator",
    "percentage decrease calculator",
    "percent of calculator",
    "percentage change calculator",
    "free percentage calculator",
    "percentage calculator tool",
    "percent calculator online",
    "calculate percent increase",
    "calculate percent decrease",
    "percentage ratio calculator",
    "percentage difference calculator",
    "percent change calculator",
    "percentage calculation tool",
    "online percent calculator",
    "percentage math calculator"
  ],
  toolPath: "/tools/percentage-calculator"
})

export default function PercentageCalculatorPage() {
  return <PercentageCalculatorClient />
}
