"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolPageLayout from "@/components/layout/tool-page-layout";
import { ToolStructuredData } from "@/components/seo/tool-seo";
import { Copy, Trash2, CheckCircle, ArrowRight, Code } from "lucide-react";

export default function CsvToMarkdownTableClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputCopied, setInputCopied] = useState(false);
  const [outputCopied, setOutputCopied] = useState(false);

  const handleConvert = () => {
    try {
      const rows = inputText.trim().split('\n').map(row => row.split(','));
      if (rows.length === 0) {
        setOutputText("");
        return;
      }

      const header = rows[0];
      const body = rows.slice(1);

      let markdownTable = `| ${header.join(" | ")} |
`;
      markdownTable += `| ${header.map(() => "---").join(" | ")} |
`;

      body.forEach(row => {
        markdownTable += `| ${row.join(" | ")} |
`;
      });

      setOutputText(markdownTable);
    } catch (error) {
      setOutputText("Invalid CSV input.");
    }
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
    "Converts CSV data to a Markdown table.",
    "Handles headers and rows automatically.",
    "Simple user interface with one-click convert button.",
    "Copy and clear functionality for easy workflow.",
  ];

  const useCases = [
    "Embedding CSV data in Markdown documents.",
    "Creating documentation for data.",
    "Sharing tabular data in a readable format.",
  ];

  const faqs = [
    {
      question: "What is a CSV to Markdown table converter?",
      answer: "It is a tool that converts comma-separated values (CSV) data into a Markdown table format. This is useful for displaying tabular data in Markdown files.",
    },
    {
      question: "How do I use it?",
      answer: "Simply paste your CSV data into the input box and click the convert button. The Markdown table will be generated in the output box.",
    },
    {
      question: "Is my data safe?",
      answer: "Yes, all processing is done in your browser. No data is sent to our servers.",
    },
  ];

  return (
    <>
      <ToolStructuredData
        toolName="CSV to Markdown Table Converter"
        toolDescription="Convert your CSV data into a Markdown table, making it easy to display tabular data in your Markdown files."
        category="Developer Tools"
        toolPath="/tools/csv-to-markdown-table"
      />
      <ToolPageLayout
        toolName="CSV to Markdown Table Converter"
        toolDescription="Convert your CSV data into a Markdown table, making it easy to display tabular data in your Markdown files."
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
                  placeholder='Enter your CSV data here...'
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
            <Button onClick={handleConvert} size="lg">
              Convert <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </ToolPageLayout>
    </>
  );
}
