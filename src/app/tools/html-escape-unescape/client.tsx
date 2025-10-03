"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolPageLayout from "@/components/layout/tool-page-layout";
import { ToolStructuredData } from "@/components/seo/tool-seo";
import { Copy, Trash2, CheckCircle, ArrowRight, Code } from "lucide-react";

export default function HtmlEscapeUnescapeClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputCopied, setInputCopied] = useState(false);
  const [outputCopied, setOutputCopied] = useState(false);

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const unescapeHtml = (text: string) => {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  };

  const handleEscape = () => {
    setOutputText(escapeHtml(inputText));
  };

  const handleUnescape = () => {
    setOutputText(unescapeHtml(inputText));
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const handleInputCopy = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      setInputCopied(true);
      setTimeout(() => setInputCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy input text:", err);
    }
  };

  const handleOutputCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setOutputCopied(true);
      setTimeout(() => setOutputCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy output text:", err);
    }
  };

  const features = [
    "Escapes HTML to prevent rendering as code.",
    "Unescapes HTML entities to restore original characters.",
    "Handles common HTML special characters.",
    "Simple user interface with one-click escape and unescape buttons.",
    "Copy and clear functionality for easy workflow.",
  ];

  const useCases = [
    "Displaying HTML code snippets on a web page.",
    "Storing HTML content in a database.",
    "Sanitizing user input to prevent XSS attacks.",
  ];

  const faqs = [
    {
      question: "What is HTML escaping?",
      answer: "HTML escaping is the process of converting special characters in HTML into their corresponding entities. This prevents the browser from interpreting them as HTML code.",
    },
    {
      question: "How does HTML unescaping work?",
      answer: "HTML unescaping reverses the escaping process. It converts HTML entities back to their original characters.",
    },
    {
      question: "Is my data safe?",
      answer: "Yes, all processing is done in your browser. No data is sent to our servers.",
    },
  ];

  return (
    <>
      <ToolStructuredData
        toolName="HTML Escape/Unescape"
        toolDescription="Easily escape and unescape HTML entities to safely embed them in other HTML documents or strings."
        category="Developer Tools"
        toolPath="/tools/html-escape-unescape"
      />
      <ToolPageLayout
        toolName="HTML Escape/Unescape"
        toolDescription="Easily escape and unescape HTML entities to safely embed them in other HTML documents or strings."
        features={features}
        useCases={useCases}
        faqs={faqs}
        category="Developer Tools"
        categoryHref="/categories/developers"
        toolIcon={Code}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Input</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleInputCopy}>
                    {inputCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleClear}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder='Enter your HTML here...'
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[300px] text-base resize-y"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Output</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleOutputCopy} disabled={!outputText}>
                    {outputCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder='Result will appear here...'
                  value={outputText}
                  readOnly
                  className="min-h-[300px] text-base resize-y bg-gray-50"
                />
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={handleEscape} size="lg">
              Escape <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={handleUnescape} size="lg">
              Unescape <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </ToolPageLayout>
    </>
  );
}
