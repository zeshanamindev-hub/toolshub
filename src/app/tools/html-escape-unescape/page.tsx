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
    "html escape online",
    "html unescape",
    "html unescape online",
    "escape html online",
    "unescape html online",
    "html entities escape",
    "html character escape",
    "html escape tool",
    "html unescape tool",
    "free html escape",
    "escape html characters",
    "unescape html characters",
    "html escaping tool",
    "html entity escape",
    "encode html",
    "decode html",
    "html special characters",
    "html escape converter",
    "html unescape converter"
  ],
  toolPath: "/tools/html-escape-unescape",
});

export default function HtmlEscapeUnescapePage() {
  return <HtmlEscapeUnescapeClient />;
}