"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolPageLayout from "@/components/layout/tool-page-layout";
import { ToolStructuredData } from "@/components/seo/tool-seo";
import { Copy, Trash2, CheckCircle, ArrowRight, Code } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MarkdownTableGeneratorClient() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [outputText, setOutputText] = useState("");
  const [outputCopied, setOutputCopied] = useState(false);

  const handleGenerate = () => {
    let table = "| ";
    for (let i = 0; i < cols; i++) {
      table += `Header ${i + 1} |`;
    }
    table += "\n| ";
    for (let i = 0; i < cols; i++) {
      table += "--- |";
    }
    table += "\n";
    for (let i = 0; i < rows; i++) {
      table += "| ";
      for (let j = 0; j < cols; j++) {
        table += `Row ${i + 1} Col ${j + 1} |`;
      }
      table += "\n";
    }
    setOutputText(table);
  };

  const handleClear = () => {
    setOutputText("");
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
    "Generates Markdown tables with a specified number of rows and columns.",
    "Simple user interface with one-click generate button.",
    "Copy and clear functionality for easy workflow.",
  ];

  const useCases = [
    "Creating tables for documentation.",
    "Quickly generating table structures for Markdown files.",
  ];

  const faqs = [
    {
      question: "What is a Markdown table generator?",
      answer: "It is a tool that generates a Markdown table with a specified number of rows and columns. This is useful for quickly creating table structures for your Markdown files.",
    },
    {
      question: "How do I use it?",
      answer: "Simply specify the number of rows and columns and click the generate button. The Markdown table will be generated in the output box.",
    },
    {
      question: "Is my data safe?",
      answer: "Yes, all processing is done in your browser. No data is sent to our servers.",
    },
  ];

  return (
    <>
      <ToolStructuredData
        toolName="Markdown Table Generator"
        toolDescription="Easily generate Markdown tables with a user-friendly interface. Define the number of rows and columns, and the tool will create the table for you."
        category="Developer Tools"
        toolPath="/tools/markdown-table-generator"
      />
      <ToolPageLayout
        toolName="Markdown Table Generator"
        toolDescription="Easily generate Markdown tables with a user-friendly interface. Define the number of rows and columns, and the tool will create the table for you."
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
              <CardHeader>
                <CardTitle>Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="rows">Rows</label>
                  <Input id="rows" type="number" value={rows} onChange={(e) => setRows(parseInt(e.target.value, 10))} />
                </div>
                <div>
                  <label htmlFor="cols">Columns</label>
                  <Input id="cols" type="number" value={cols} onChange={(e) => setCols(parseInt(e.target.value, 10))} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Output</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleOutputCopy} disabled={!outputText}>
                    {outputCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleClear}>
                    <Trash2 className="h-4 w-4" />
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
            <Button onClick={handleGenerate} size="lg">
              Generate <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </ToolPageLayout>
    </>
  );
}
