import { generateToolMetadata } from "@/components/seo/tool-seo";
import SqlBeautifierClient from "./client";

// Export metadata for SEO
export const metadata = generateToolMetadata({
  toolName: "SQL Beautifier",
  toolDescription:
    "Format and beautify your SQL code to make it more readable and easier to understand.",
  category: "Developer Tools",
  keywords: [
    "sql beautifier",
    "sql beautifier online",
    "sql formatter",
    "sql formatter online",
    "format sql online",
    "beautify sql online",
    "sql code formatter",
    "sql query formatter",
    "free sql beautifier",
    "sql pretty print",
    "sql format tool",
    "online sql formatter",
    "sql code beautifier",
    "format sql queries",
    "sql beautify tool",
    "sql statement formatter",
    "prettify sql",
    "sql formatting tool",
    "format database queries",
    "sql indentation tool"
  ],
  toolPath: "/tools/sql-beautifier",
});

export default function SqlBeautifierPage() {
  return <SqlBeautifierClient />;
}