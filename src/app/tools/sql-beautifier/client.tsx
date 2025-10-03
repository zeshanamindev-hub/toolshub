"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolPageLayout from "@/components/layout/tool-page-layout";
import { ToolStructuredData } from "@/components/seo/tool-seo";
import { Copy, Trash2, CheckCircle, ArrowRight, Code } from "lucide-react";
import { format } from "sql-formatter";

export default function SqlBeautifierClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputCopied, setInputCopied] = useState(false);
  const [outputCopied, setOutputCopied] = useState(false);
  const [dialect, setDialect] = useState<"sql" | "mysql" | "postgresql" | "tsql">("sql");

  const handleBeautify = () => {
    try {
      const formatted = format(inputText, { language: dialect });
      setOutputText(formatted);
    } catch (error) {
      setOutputText("Invalid SQL input.");
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
    "Formats SQL code to be more readable.",
    "Supports various SQL dialects.",
    "Simple user interface with one-click beautify button.",
    "Copy and clear functionality for easy workflow.",
  ];

  const useCases = [
    "Cleaning up messy SQL queries.",
    "Standardizing SQL code style across a team.",
    "Making complex queries easier to understand.",
  ];

  const faqs = [
    {
      question: "What is a SQL beautifier?",
      answer: "A SQL beautifier is a tool that automatically formats SQL code to make it more readable and easier to understand. It adds indentation, line breaks, and other formatting to make the code more consistent.",
    },
    {
      question: "Which SQL dialects are supported?",
      answer: "This tool supports a wide range of SQL dialects, including standard SQL, MySQL, PostgreSQL, and more. You can select your dialect from the dropdown menu.",
    },
    {
      question: "Is my data safe?",
      answer: "Yes, all processing is done in your browser. No data is sent to our servers.",
    },
  ];

  return (
    <>
      <ToolStructuredData
        toolName="SQL Beautifier"
        toolDescription="Format and beautify your SQL code to make it more readable and easier to understand."
        category="Developer Tools"
        toolPath="/tools/sql-beautifier"
      />
      <ToolPageLayout
        toolName="SQL Beautifier"
        toolDescription="Format and beautify your SQL code to make it more readable and easier to understand."
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
                  placeholder='Enter your SQL here...'
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
          <div className="flex justify-center gap-4 items-center">
            <select
              value={dialect}
              onChange={(e) => setDialect(e.target.value as "sql" | "mysql" | "postgresql" | "tsql")}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sql">Standard SQL</option>
              <option value="mysql">MySQL</option>
              <option value="postgresql">PostgreSQL</option>
              <option value="tsql">Transact-SQL</option>
            </select>
            <Button onClick={handleBeautify} size="lg">
              Beautify <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </ToolPageLayout>
    </>
  );
}
