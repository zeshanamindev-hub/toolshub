"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Copy, RotateCcw, ArrowLeftRight, Info } from "lucide-react"
import StructuredData from "@/components/structured-data"

export default function ReverseWordOrder() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [preserveLineBreaks, setPreserveLineBreaks] = useState(true)
  const [preservePunctuation, setPreservePunctuation] = useState(false)

  const reverseWordOrder = (text: string): string => {
    if (!text.trim()) return ""

    if (preserveLineBreaks) {
      // Process each line separately
      return text
        .split('\n')
        .map(line => {
          if (!line.trim()) return line
          return processLine(line)
        })
        .join('\n')
    } else {
      // Process entire text as one block
      return processLine(text)
    }
  }

  const processLine = (line: string): string => {
    if (preservePunctuation) {
      // More complex logic to handle punctuation
      const words = line.trim().split(/\s+/)
      
      // Extract punctuation from the last word if it exists
      const lastWord = words[words.length - 1]
      const punctuationMatch = lastWord.match(/[.!?;:,]+$/)
      const punctuation = punctuationMatch ? punctuationMatch[0] : ""
      
      // Remove punctuation from the last word
      if (punctuation) {
        words[words.length - 1] = lastWord.slice(0, -punctuation.length)
      }
      
      // Reverse the words and add punctuation back to the end
      const reversed = words.reverse().join(' ')
      return reversed + punctuation
    } else {
      // Simple word reversal
      return line.trim().split(/\s+/).reverse().join(' ')
    }
  }

  const handleReverse = () => {
    setOutputText(reverseWordOrder(inputText))
  }

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText)
    }
  }

  const handleClear = () => {
    setInputText("")
    setOutputText("")
  }

  const getStats = () => {
    if (!inputText.trim()) return null
    
    const words = inputText.split(/\s+/).filter(word => word.length > 0).length
    const characters = inputText.length
    const lines = inputText.split('\n').length
    
    return { words, characters, lines }
  }

  const stats = getStats()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Reverse Word Order Tool",
    "description": "Reverse the order of words in your text while keeping individual words intact. Different from character reversal.",
    "url": "https://toolshub.com/tools/reverse-word-order",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Reverse word order while preserving individual words",
      "Option to preserve line breaks",
      "Option to handle punctuation intelligently",
      "Real-time text statistics",
      "Copy to clipboard functionality"
    ]
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Reverse Word Order
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reverse the order of words in your text while keeping individual words intact. 
            Perfect for creating mirror text or testing text layouts.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5" />
              Word Order Reversal
            </CardTitle>
            <CardDescription>
              Enter your text to reverse the order of words
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="input">Input Text</Label>
              <Textarea
                id="input"
                placeholder="Enter your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[120px] mt-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="preserveLineBreaks"
                  checked={preserveLineBreaks}
                  onChange={(e) => setPreserveLineBreaks(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="preserveLineBreaks" className="text-sm">
                  Preserve line breaks (reverse words within each line separately)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="preservePunctuation"
                  checked={preservePunctuation}
                  onChange={(e) => setPreservePunctuation(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="preservePunctuation" className="text-sm">
                  Smart punctuation handling (keep punctuation at the end)
                </Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleReverse} className="flex-1">
                Reverse Word Order
              </Button>
              <Button onClick={handleClear} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            <div>
              <Label htmlFor="output">Reversed Text</Label>
              <Textarea
                id="output"
                value={outputText}
                readOnly
                placeholder="Reversed text will appear here..."
                className="min-h-[120px] mt-2 bg-gray-50"
              />
            </div>

            {outputText && (
              <>
                <Button onClick={handleCopy} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy to Clipboard
                </Button>

                {stats && (
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{stats.words}</div>
                      <div className="text-sm text-gray-600">Words</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{stats.characters}</div>
                      <div className="text-sm text-gray-600">Characters</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{stats.lines}</div>
                      <div className="text-sm text-gray-600">Lines</div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              How It Works
            </CardTitle>
            <CardDescription>
              Understanding the difference between word order reversal and character reversal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Example:</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Original:</span> "Hello world from tools"
                  </div>
                  <div>
                    <span className="font-medium">Word Order Reversed:</span> "tools from world Hello"
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Character Reversed:</span> "sloot morf dlrow olleH" (different tool)
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Use Cases:</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Creating mirror or reverse text effects</li>
                  <li>• Testing text layout and alignment</li>
                  <li>• Language learning exercises</li>
                  <li>• Creative writing and word games</li>
                  <li>• Data processing and text manipulation</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Options Explained:</h4>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• <strong>Preserve line breaks:</strong> Reverses words within each line separately</li>
                  <li>• <strong>Smart punctuation:</strong> Keeps punctuation marks at the end of sentences</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}