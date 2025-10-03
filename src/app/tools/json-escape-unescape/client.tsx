"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolPageLayout from "@/components/layout/tool-page-layout";
import { ToolStructuredData } from "@/components/seo/tool-seo";
import { Copy, Trash2, CheckCircle, ArrowRight, Code } from "lucide-react";

export default function JsonEscapeUnescapeClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputCopied, setInputCopied] = useState(false);
  const [outputCopied, setOutputCopied] = useState(false);

  const handleEscape = () => {
    try {
      const escaped = JSON.stringify(inputText).slice(1, -1);
      setOutputText(escaped);
    } catch (error) {
      setOutputText("Invalid JSON input for escaping.");
    }
  };

  const handleUnescape = () => {
    try {
      const unescaped = JSON.parse(`"${inputText}"`);
      setOutputText(unescaped);
    } catch (error) {
      setOutputText("Invalid string for unescaping.");
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
    "Escapes JSON strings to be safely used within other JSON structures.",
    "Unescapes previously escaped JSON strings back to their original form.",
    "Handles special characters, quotes, and backslashes automatically.",
    "Simple user interface with one-click escape and unescape buttons.",
    "Copy and clear functionality for easy workflow.",
  ];

  const useCases = [
    "Embedding a JSON object as a string value in another JSON object.",
    "Storing JSON data in systems that require string-based storage.",
    "Preparing JSON data to be sent over the network in a safe format.",
    "Extracting and parsing JSON strings from logs or other text-based data.",
  ];

  const faqs = [
    {
      question: "What is JSON escaping?",
      answer: "JSON escaping is the process of converting a JSON string into a format that can be safely embedded as a string within another JSON object. This involves adding backslashes to special characters like quotes and backslashes.",
    },
    {
      question: "How does JSON unescaping work?",
      answer: "JSON unescaping reverses the escaping process. It removes the added backslashes to restore the original JSON string, making it ready to be parsed as a JSON object.",
    },
    {
      question: "Is my data safe?",
      answer: "Yes, all processing is done in your browser. No data is sent to our servers.",
    },
  ];

  return (
    <>
      <ToolStructuredData
        toolName="JSON Escape/Unescape"
        toolDescription="Easily escape and unescape JSON strings to safely embed them in other JSON documents or strings."
        category="Developer Tools"
        toolPath="/tools/json-escape-unescape"
      />
      <ToolPageLayout
        toolName="JSON Escape/Unescape"
        toolDescription="Easily escape and unescape JSON strings to safely embed them in other JSON documents or strings."
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
                  placeholder='Enter your JSON or string here...'
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
