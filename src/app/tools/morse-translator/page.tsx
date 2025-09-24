"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Copy, RotateCcw, ArrowUpDown } from "lucide-react"
import StructuredData from "@/components/structured-data"

const morseCodeMap: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/', '.': '.-.-.-', ',': '--..--',
  '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.',
  ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-',
  '@': '.--.-.'
}

const reverseMorseMap: { [key: string]: string } = Object.fromEntries(
  Object.entries(morseCodeMap).map(([key, value]) => [value, key])
)

export default function MorseTranslator() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<"textToMorse" | "morseToText">("textToMorse")

  const translateTextToMorse = (text: string): string => {
    return text
      .toUpperCase()
      .split("")
      .map(char => morseCodeMap[char] || char)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()
  }

  const translateMorseToText = (morse: string): string => {
    return morse
      .split(" ")
      .map(code => {
        if (code === "/") return " "
        return reverseMorseMap[code] || code
      })
      .join("")
  }

  const handleTranslate = () => {
    if (!inputText.trim()) {
      setOutputText("")
      return
    }

    if (mode === "textToMorse") {
      setOutputText(translateTextToMorse(inputText))
    } else {
      setOutputText(translateMorseToText(inputText))
    }
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

  const toggleMode = () => {
    setMode(mode === "textToMorse" ? "morseToText" : "textToMorse")
    setInputText("")
    setOutputText("")
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Morse Code Translator",
    "description": "Convert text to Morse code and Morse code back to text with bidirectional translation support.",
    "url": "https://toolshub.com/tools/morse-translator",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Text to Morse code conversion",
      "Morse code to text conversion",
      "Support for letters, numbers, and punctuation",
      "Bidirectional translation",
      "Copy to clipboard functionality"
    ]
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Morse Code Translator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert text to Morse code and Morse code back to text. Supports letters, numbers, 
            and common punctuation marks with bidirectional translation.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" />
                  {mode === "textToMorse" ? "Text to Morse Code" : "Morse Code to Text"}
                </CardTitle>
                <CardDescription>
                  {mode === "textToMorse" 
                    ? "Enter text to convert to Morse code" 
                    : "Enter Morse code to convert to text (use spaces between letters, / for word breaks)"
                  }
                </CardDescription>
              </div>
              <Button onClick={toggleMode} variant="outline" size="sm">
                Switch Mode
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="input">
                {mode === "textToMorse" ? "Text Input" : "Morse Code Input"}
              </Label>
              <Textarea
                id="input"
                placeholder={
                  mode === "textToMorse" 
                    ? "Enter your text here..." 
                    : "Enter Morse code here (e.g., .... . .-.. .-.. --- / .-- --- .-. .-.. -..)"
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[120px] mt-2"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleTranslate} className="flex-1">
                Translate
              </Button>
              <Button onClick={handleClear} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            <div>
              <Label htmlFor="output">
                {mode === "textToMorse" ? "Morse Code Output" : "Text Output"}
              </Label>
              <Textarea
                id="output"
                value={outputText}
                readOnly
                placeholder="Translation will appear here..."
                className="min-h-[120px] mt-2 bg-gray-50"
              />
            </div>

            {outputText && (
              <Button onClick={handleCopy} variant="outline" className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Morse Code Reference</CardTitle>
            <CardDescription>
              Common Morse code patterns for reference
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
              {Object.entries(morseCodeMap).slice(0, 26).map(([letter, morse]) => (
                <div key={letter} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-semibold">{letter}</span>
                  <span className="font-mono text-blue-600">{morse}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Usage Tips:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use spaces to separate letters in Morse code</li>
                <li>• Use "/" to represent word breaks</li>
                <li>• Dots (.) and dashes (-) represent the Morse code signals</li>
                <li>• Numbers and punctuation are also supported</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}