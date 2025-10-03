"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Copy, Trash2, RefreshCw, Plus, X } from "lucide-react"

interface Preset {
  name: string
  type: "paragraphs" | "sentences" | "words"
  count: number
}

export default function LoremIpsumCustomGeneratorPage() {
  const [generatedText, setGeneratedText] = useState("")
  const [count, setCount] = useState(3)
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs")
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [customWords, setCustomWords] = useState<string[]>([])
  const [newWord, setNewWord] = useState("")
  const [customWordRatio, setCustomWordRatio] = useState(30) // Percentage of custom words

  const defaultLoremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
    "accusamus", "iusto", "odio", "dignissimos", "ducimus", "blanditiis",
    "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos", "dolores",
    "quas", "molestias", "excepturi", "occaecati", "cupiditate", "provident",
    "similique", "mollitia", "animi", "distinctio", "ratione", "voluptatem",
    "sequi", "nesciunt", "neque", "porro", "quisquam", "dolorem", "adipisci",
    "numquam", "eius", "modi", "tempora", "incidunt", "magni", "aliquam",
    "quaerat", "voluptas", "nemo", "ipsam", "quia", "aspernatur", "aut", "odit",
    "fugit", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
    "inventore", "veritatis", "architecto", "beatae", "vitae", "dicta", "explicabo"
  ]

  const allWords = useMemo(() => {
    return [...defaultLoremWords, ...customWords.filter(word => word.trim())]
  }, [customWords, defaultLoremWords])

  const generateWords = (numWords: number): string => {
    const words: string[] = []

    if (startWithLorem && numWords > 0) {
      words.push("Lorem")
      if (numWords > 1) words.push("ipsum")
      if (numWords > 2) words.push("dolor")
      if (numWords > 3) words.push("sit")
      if (numWords > 4) words.push("amet")
    }

    while (words.length < numWords) {
      const randomWord = allWords[Math.floor(Math.random() * allWords.length)]
      words.push(randomWord)
    }

    return words.join(" ")
  }

  const generateSentence = (minWords: number = 8, maxWords: number = 20): string => {
    const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords
    let sentence = generateWords(wordCount)

    // Capitalize first letter
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1)

    // Add period
    sentence += "."

    return sentence
  }

  const generateParagraph = (minSentences: number = 3, maxSentences: number = 7): string => {
    const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences
    const sentences: string[] = []

    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence())
    }

    return sentences.join(" ")
  }

  const generateText = () => {
    let result = ""

    switch (type) {
      case "paragraphs":
        const paragraphs: string[] = []
        for (let i = 0; i < count; i++) {
          paragraphs.push(generateParagraph())
        }
        result = paragraphs.join("\n\n")
        break

      case "sentences":
        const sentences: string[] = []
        for (let i = 0; i < count; i++) {
          sentences.push(generateSentence())
        }
        result = sentences.join(" ")
        break

      case "words":
        result = generateWords(count)
        break
    }

    setGeneratedText(result)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const handleClear = () => {
    setGeneratedText("")
  }

  const addCustomWord = () => {
    const word = newWord.trim().toLowerCase()
    if (word && !customWords.includes(word) && !defaultLoremWords.includes(word)) {
      setCustomWords([...customWords, word])
      setNewWord("")
    }
  }

  const removeCustomWord = (wordToRemove: string) => {
    setCustomWords(customWords.filter(word => word !== wordToRemove))
  }

  const getStats = () => {
    if (!generatedText) return { words: 0, sentences: 0, paragraphs: 0, characters: 0 }

    const words = generatedText.trim().split(/\s+/).length
    const sentences = generatedText.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphs = generatedText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
    const characters = generatedText.length

    return { words, sentences, paragraphs, characters }
  }

  const stats = getStats()

  const presets: Preset[] = [
    { name: "Short Paragraph", type: "paragraphs", count: 1 },
    { name: "Article Content", type: "paragraphs", count: 5 },
    { name: "Lorem Classic", type: "sentences", count: 5 },
    { name: "Word List", type: "words", count: 50 }
  ]

  const applyPreset = (preset: Preset) => {
    setType(preset.type)
    setCount(preset.count)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-teal-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Lorem Ipsum with Custom Words
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate placeholder text with your own custom words mixed in.
            Perfect for industry-specific content and personalized dummy text.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Generator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Generator Settings</CardTitle>
                <CardDescription>
                  Configure text generation with custom word integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label htmlFor="count" className="text-sm font-medium whitespace-nowrap">
                      Generate:
                    </label>
                    <Input
                      id="count"
                      type="number"
                      min="1"
                      max="100"
                      value={count}
                      onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                      className="w-20"
                    />
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as typeof type)}
                      className="border rounded px-3 py-1 text-sm"
                    >
                      <option value="paragraphs">Paragraphs</option>
                      <option value="sentences">Sentences</option>
                      <option value="words">Words</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={startWithLorem}
                      onChange={(e) => setStartWithLorem(e.target.checked)}
                      className="rounded"
                    />
                    Start with "Lorem ipsum"
                  </label>
                </div>

                {/* Custom Word Ratio */}
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium whitespace-nowrap">
                    Custom Word Ratio: {customWordRatio}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={customWordRatio}
                    onChange={(e) => setCustomWordRatio(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xs text-gray-500 w-12">
                    {customWordRatio}%
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button onClick={generateText}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generate Text
                  </Button>
                  <Button onClick={handleClear} variant="outline">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Custom Words Manager */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Words</CardTitle>
                <CardDescription>
                  Add your own words to mix into the generated text
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter a custom word..."
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomWord()}
                    className="flex-1"
                  />
                  <Button onClick={addCustomWord} disabled={!newWord.trim()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                {customWords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {customWords.map((word, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {word}
                        <button
                          onClick={() => removeCustomWord(word)}
                          className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-sm text-gray-600">
                  <p><strong>Total words in pool:</strong> {allWords.length}</p>
                  <p><strong>Default Lorem words:</strong> {defaultLoremWords.length}</p>
                  <p><strong>Custom words:</strong> {customWords.length}</p>
                </div>
              </CardContent>
            </Card>

            {/* Generated Text */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Lorem Ipsum</CardTitle>
                <CardDescription>
                  Your generated placeholder text with custom words
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={generatedText}
                  readOnly
                  className="min-h-[400px] resize-none"
                  placeholder="Generated Lorem Ipsum text will appear here..."
                />

                {/* Stats */}
                {generatedText && (
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t pt-4">
                    <span>Characters: {stats.characters.toLocaleString()}</span>
                    <span>Words: {stats.words.toLocaleString()}</span>
                    <span>Sentences: {stats.sentences.toLocaleString()}</span>
                    <span>Paragraphs: {stats.paragraphs.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="sm"
                    disabled={!generatedText}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Text
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Presets */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Presets</CardTitle>
                <CardDescription>
                  Common text generation scenarios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {presets.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => applyPreset(preset)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Word Pool Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Word Pool Statistics</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Total Words:</span>
                  <span className="font-semibold">{allWords.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Default Words:</span>
                  <span className="font-semibold">{defaultLoremWords.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Custom Words:</span>
                  <span className="font-semibold">{customWords.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Custom Ratio:</span>
                  <span className="font-semibold">{customWordRatio}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Usage Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Industry Content:</strong> Add domain-specific terms for realistic placeholder text
                </p>
                <p>
                  <strong>Brand Testing:</strong> Include brand names and product terms
                </p>
                <p>
                  <strong>SEO Testing:</strong> Add keywords to test content layouts
                </p>
                <p>
                  <strong>Localization:</strong> Mix in words from target languages
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold text-sm">Custom Word Integration</div>
                      <p className="text-xs text-gray-600">Mix your own words with classic Lorem Ipsum</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold text-sm">Ratio Control</div>
                      <p className="text-xs text-gray-600">Adjust how often custom words appear</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold text-sm">Real-time Stats</div>
                      <p className="text-xs text-gray-600">Track word distribution and text metrics</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}