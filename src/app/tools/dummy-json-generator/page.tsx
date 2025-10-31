import { generateToolMetadata } from "@/components/seo/tool-seo"
import DummyJsonGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Dummy JSON Generator",
  toolDescription: "Generate realistic dummy JSON data instantly. Create mock APIs and test data with customizable schemas. Free online JSON data generator.",
  category: "Generators",
  keywords: [
    "dummy json",
    "json generator",
    "fake json data",
    "mock json",
    "json test data",
    "json data generator",
    "dummy data generator",
    "mock api generator"
  ],
  toolPath: "/tools/dummy-json-generator"
})

export default function DummyJsonGeneratorPage() {
  return <DummyJsonGeneratorClient />
}
