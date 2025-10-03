import { generateToolMetadata } from "@/components/seo/tool-seo";
import MarkdownTableGeneratorClient from "./client";

// Export metadata for SEO
export const metadata = generateToolMetadata({
  toolName: "Markdown Table Generator",
  toolDescription:
    "Easily generate Markdown tables with a user-friendly interface. Define the number of rows and columns, and the tool will create the table for you.",
  category: "Developer Tools",
  keywords: [
    "markdown table generator",
    "markdown table",
    "table generator",
    "markdown editor",
  ],
  toolPath: "/tools/markdown-table-generator",
});

export default function MarkdownTableGeneratorPage() {
  return <MarkdownTableGeneratorClient />;
}