import { generateToolMetadata } from "@/components/seo/tool-seo";
import HtmlEscapeUnescapeClient from "./client";

// Export metadata for SEO
export const metadata = generateToolMetadata({
  toolName: "HTML Escape/Unescape",
  toolDescription:
    "Easily escape and unescape HTML entities to safely embed them in other HTML documents or strings.",
  category: "Developer Tools",
  keywords: [
    "html escape",
    "html unescape",
    "escape html",
    "unescape html",
    "html entities",
  ],
  toolPath: "/tools/html-escape-unescape",
});

export default function HtmlEscapeUnescapePage() {
  return <HtmlEscapeUnescapeClient />;
}