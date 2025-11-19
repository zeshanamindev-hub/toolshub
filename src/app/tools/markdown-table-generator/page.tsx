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
    "markdown table generator online",
    "markdown table",
    "table generator",
    "markdown editor",
    "create markdown table",
    "markdown table maker",
    "online markdown table",
    "generate markdown table",
    "free markdown table generator",
    "markdown table creator",
    "markdown table builder",
    "markdown table tool",
    "markdown formatting table",
    "github markdown table",
    "markdown table online",
    "easy markdown table",
    "markdown table converter",
    "visual markdown table",
    "markdown table editor"
  ],
  toolPath: "/tools/markdown-table-generator",
});

export default function MarkdownTableGeneratorPage() {
  return <MarkdownTableGeneratorClient />;
}