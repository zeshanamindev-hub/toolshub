import { generateToolMetadata } from "@/components/seo/tool-seo"
import BmiCalculatorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "BMI Calculator",
  toolDescription: "Calculate Body Mass Index (BMI) instantly. Get BMI classification and health recommendations. Free online BMI calculator with metric and imperial units.",
  category: "Calculators",
  keywords: [
    "bmi calculator",
    "body mass index",
    "calculate bmi",
    "bmi checker",
    "bmi calculator online",
    "weight calculator",
    "bmi index",
    "health calculator"
  ],
  toolPath: "/tools/bmi-calculator"
})

export default function BmiCalculatorPage() {
  return <BmiCalculatorClient />
}
