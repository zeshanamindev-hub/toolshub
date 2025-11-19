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
    "csv to markdown table",
    "csv to markdown converter",
    "csv to table converter",
    "markdown table generator",
    "csv converter online",
    "convert csv to markdown",
    "csv to markdown online",
    "free csv to markdown",
    "csv markdown converter",
    "csv to md table",
    "csv table converter",
    "markdown table from csv",
    "generate markdown table from csv",
    "csv to markdown table online",
    "csv to github markdown",
    "csv markdown generator",
    "csv to md converter",
    "convert csv to table",
    "csv data to markdown"
  ],
  toolPath: "/tools/csv-to-markdown-table",
});

export default function CsvToMarkdownTablePage() {
  return <CsvToMarkdownTableClient />;
}