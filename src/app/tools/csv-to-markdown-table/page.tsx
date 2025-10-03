import { generateToolMetadata } from "@/components/seo/tool-seo";
import CsvToMarkdownTableClient from "./client";

// Export metadata for SEO
export const metadata = generateToolMetadata({
  toolName: "CSV to Markdown Table Converter",
  toolDescription:
    "Convert your CSV data into a Markdown table, making it easy to display tabular data in your Markdown files.",
  category: "Developer Tools",
  keywords: [
    "csv to markdown",
    "csv to table",
    "markdown table generator",
    "csv converter",
  ],
  toolPath: "/tools/csv-to-markdown-table",
});

export default function CsvToMarkdownTablePage() {
  return <CsvToMarkdownTableClient />;
}