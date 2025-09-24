"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, RotateCcw, FileText } from "lucide-react"
import StructuredData from "@/components/structured-data"

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
  "accusamus", "accusantium", "doloremque", "laudantium", "totam", "rem",
  "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore", "veritatis",
  "et", "quasi", "architecto", "beatae", "vitae", "dicta", "sunt", "explicabo",
  "nemo", "ipsam", "voluptatem", "quia", "voluptas", "aspernatur", "aut",
  "odit", "fugit", "sed", "quia", "consequuntur", "magni", "dolores", "ratione",
  "sequi", "nesciunt", "neque", "porro", "quisquam", "dolorem", "adipisci",
  "numquam", "eius", "modi", "tempora", "incidunt", "magnam", "quaerat"
]

type GenerationType = "paragraphs" | "words" | "characters"

export default function LoremGenerator() {
  const [generationType, setGenerationType] = useState<GenerationType>("paragraphs")
  const [amount, setAmount] = useState("3")
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [generatedText, setGeneratedText] = useState("")

  const generateWords = (count: number): string[] => {
    const words: string[] = []
    for (let i = 0; i < count; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
    }
    return words
  }

  const generateSentence = (minWords = 4, maxWords = 18): string => {
    const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords
    const words = generateWords(wordCount)
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    return words.join(" ") + "."
  }

  const generateParagraph = (minSentences = 3, maxSentences = 7): string => {
    const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences
    const sentences: string[] = []
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence())
    }
    return sentences.join(" ")
  }

  const generateText = () => {
    const count = parseInt(amount) || 1
    let result = ""

    switch (generationType) {
      case "paragraphs":
        const paragraphs: string[] = []
        for (let i = 0; i < count; i++) {
          let paragraph = generateParagraph()
          if (i === 0 && startWithLorem) {
            paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + paragraph.substring(paragraph.indexOf(" ") + 1)
          }
          paragraphs.push(paragraph)
        }
        result = paragraphs.join("\n\n")
        break

      case "words":
        const words = generateWords(count)
        if (startWithLorem && count >= 2) {
          words[0] = "Lorem"
          words[1] = "ipsum"
        }
        result = words.join(" ")
        break

      case "characters":
        let text = ""
        while (text.length < count) {
          const word = loremWords[Math.floor(Math.random() * loremWords.length)]
          text += (text.length === 0 ? "" : " ") + word
        }
        result = text.substring(0, count)
        if (startWithLorem && count >= 11) {
          result = "Lorem ipsum" + result.substring(11)
        }
        break
    }

    setGeneratedText(result)
  }

  const handleCopy = async () => {
    if (generatedText) {
      await navigator.clipboard.writeText(generatedText)
    }
  }

  const handleClear = () => {
    setGeneratedText("")
  }

  const getStats = () => {
    if (!generatedText) return null
    
    const words = generatedText.split(/\s+/).filter(word => word.length > 0).length
    const characters = generatedText.length
    const charactersNoSpaces = generatedText.replace(/\s/g, "").length
    const paragraphs = generatedText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
    
    return { words, characters, charactersNoSpaces, paragraphs }
  }

  const stats = getStats()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Lorem Ipsum Generator",
    "description": "Generate Lorem Ipsum placeholder text with customizable paragraphs, words, or character count.",
    "url": "https://toolshub.com/tools/lorem-generator",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Generate by paragraphs, words, or characters",
      "Customizable amount",
      "Option to start with classic Lorem Ipsum",
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
            Lorem Ipsum Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate Lorem Ipsum placeholder text with customizable length. 
            Perfect for designers, developers, and content creators.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generate Lorem Ipsum Text
            </CardTitle>
            <CardDescription>
              Customize your Lorem Ipsum text generation settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Generation Type</Label>
                <Select value={generationType} onValueChange={(value: GenerationType) => setGenerationType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraphs">Paragraphs</SelectItem>
                    <SelectItem value="words">Words</SelectItem>
                    <SelectItem value="characters">Characters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount">
                  Amount ({generationType === "paragraphs" ? "paragraphs" : generationType})
                </Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  max={generationType === "characters" ? "10000" : "100"}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="startWithLorem"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="startWithLorem" className="text-sm">
                Start with "Lorem ipsum..."
              </Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateText} className="flex-1">
                Generate Text
              </Button>
              <Button onClick={handleClear} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            <div>
              <Label htmlFor="output">Generated Text</Label>
              <Textarea
                id="output"
                value={generatedText}
                readOnly
                placeholder="Generated Lorem Ipsum text will appear here..."
                className="min-h-[200px] mt-2 bg-gray-50"
              />
            </div>

            {generatedText && (
              <>
                <Button onClick={handleCopy} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy to Clipboard
                </Button>

                {stats && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{stats.paragraphs}</div>
                      <div className="text-sm text-gray-600">Paragraphs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{stats.words}</div>
                      <div className="text-sm text-gray-600">Words</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{stats.characters}</div>
                      <div className="text-sm text-gray-600">Characters</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{stats.charactersNoSpaces}</div>
                      <div className="text-sm text-gray-600">No Spaces</div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Lorem Ipsum</CardTitle>
            <CardDescription>
              Learn about the history and usage of Lorem Ipsum text
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Common Use Cases:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Web design and development mockups</li>
                  <li>• Print design layouts and templates</li>
                  <li>• Content management system testing</li>
                  <li>• Typography and font testing</li>
                  <li>• Placeholder content for presentations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}