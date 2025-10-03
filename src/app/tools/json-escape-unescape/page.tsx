import { generateToolMetadata } from "@/components/seo/tool-seo";
import JsonEscapeUnescapeClient from "./client";

// Export metadata for SEO
export const metadata = generateToolMetadata({
  toolName: "JSON Escape/Unescape",
  toolDescription:
    "Easily escape and unescape JSON strings to safely embed them in other JSON documents or strings.",
  category: "Developer Tools",
  keywords: [
    "json escape",
    "json unescape",
    "escape json",
    "unescape json",
    "json stringify",
    "json parse",
  ],
  toolPath: "/tools/json-escape-unescape",
});

export default function JsonEscapeUnescapePage() {
  return <JsonEscapeUnescapeClient />;
}