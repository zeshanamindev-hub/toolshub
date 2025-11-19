import { generateToolMetadata } from "@/components/seo/tool-seo"
import DummyJsonGeneratorClient from "./client"

export const metadata = generateToolMetadata({
  toolName: "Dummy JSON Generator",
  toolDescription: "Generate realistic dummy JSON data instantly. Create mock APIs and test data with customizable schemas. Free online JSON data generator.",
  category: "Generators",
  keywords: [
    "dummy json",
    "dummy json generator",
    "json generator",
    "json generator online",
    "fake json data",
    "fake json data generator",
    "mock json generator",
    "json test data generator",
    "json data generator",
    "dummy data generator",
    "mock api generator",
    "free json generator",
    "json sample data",
    "json placeholder data",
    "json mock data",
    "generate json data",
    "json test generator",
    "api mock data generator",
    "dummy json online",
    "fake api data generator"
  ],
  toolPath: "/tools/dummy-json-generator"
})

export default function DummyJsonGeneratorPage() {
  return <DummyJsonGeneratorClient />
}
