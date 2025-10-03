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
    "sql formatter",
    "format sql",
    "beautify sql",
    "sql code formatter",
  ],
  toolPath: "/tools/sql-beautifier",
});

export default function SqlBeautifierPage() {
  return <SqlBeautifierClient />;
}