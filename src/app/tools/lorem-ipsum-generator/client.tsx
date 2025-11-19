"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Copy, Trash2, RefreshCw ,  Info } from "lucide-react"

export default function LoremIpsumGeneratorClient() {
  const [generatedText, setGeneratedText] = useState("")
  const [count, setCount] = useState(3)
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs")
  const [startWithLorem, setStartWithLorem] = useState(true)

  const loremWords = [
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
      const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)]
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

  const getStats = () => {
    if (!generatedText) return { words: 0, sentences: 0, paragraphs: 0, characters: 0 }
    
    const words = generatedText.trim().split(/\s+/).length
    const sentences = generatedText.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphs = generatedText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
    const characters = generatedText.length
    
    return { words, sentences, paragraphs, characters }
  }

  const stats = getStats()

  const presets = [
    { name: "Short Paragraph", type: "paragraphs" as const, count: 1 },
    { name: "Article Content", type: "paragraphs" as const, count: 5 },
    { name: "Lorem Classic", type: "sentences" as const, count: 5 },
    { name: "Word List", type: "words" as const, count: 50 }
  ]

  const applyPreset = (preset: typeof presets[0]) => {
    setType(preset.type)
    setCount(preset.count)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-teal-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Lorem Ipsum Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate placeholder text for your designs and layouts. 
            Create words, sentences, or paragraphs of Lorem Ipsum text.
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
                  Configure what type and amount of text to generate
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

            {/* Generated Text */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Lorem Ipsum</CardTitle>
                <CardDescription>
                  Your generated placeholder text
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

            {/* About Lorem Ipsum */}
            <Card>
              <CardHeader>
                <CardTitle>About Lorem Ipsum</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>What is Lorem Ipsum?</strong><br />
                  Lorem Ipsum is simply dummy text of the printing and 
                  typesetting industry since the 1500s.
                </p>
                <p>
                  <strong>Why use it?</strong><br />
                  • Focus on design, not content<br />
                  • Standard placeholder text<br />
                  • Prevents copyright issues<br />
                  • Looks like real text
                </p>
                <p>
                  <strong>Origin:</strong><br />
                  Based on sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" 
                  by Cicero, written in 45 BC.
                </p>
              </CardContent>
            </Card>

            {/* Usage Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Design & Layout:</strong> Perfect for mockups and wireframes
                </p>
                <p>
                  <strong>Testing:</strong> Use to test text overflow and responsive design
                </p>
                <p>
                  <strong>Presentations:</strong> Fill slides without distracting content
                </p>
                <p>
                  <strong>Development:</strong> Test database fields and UI components
                </p>
              </CardContent>
            </Card>

            {/* Alternative Generators */}
            <Card>
              <CardHeader>
                <CardTitle>Alternative Styles</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>Coming soon:</p>
                <p>• Hipster Ipsum</p>
                <p>• Tech Ipsum</p>
                <p>• Bacon Ipsum</p>
                <p>• Corporate Ipsum</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Professional Lorem Ipsum text generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-teal-600 font-semibold mb-2">Multiple Formats</div>
                  <p className="text-sm text-gray-600">
                    Generate paragraphs, sentences, or individual words
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-blue-600 font-semibold mb-2">Customizable Length</div>
                  <p className="text-sm text-gray-600">
                    Control exactly how much text you need
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-semibold mb-2">Classic Lorem</div>
                  <p className="text-sm text-gray-600">
                    Option to start with traditional "Lorem ipsum"
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-semibold mb-2">Text Statistics</div>
                  <p className="text-sm text-gray-600">
                    Real-time word, sentence, and character counts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        {/* Full-width SEO Content Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
          <div className="max-w-full">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-gray-600" />
              <h2 className="text-2xl font-bold text-gray-900">About Lorem Ipsum Generator</h2>
            </div>

            <div className="prose prose-sm text-gray-600 max-w-none">
              <p className="mb-4">
                The Lorem Ipsum Generator creates placeholder text for design mockups, prototypes, and development projects.
                Lorem ipsum is the standard dummy text used in the printing and typesetting industry since the 1500s. It allows
                designers and developers to focus on visual elements and layout without being distracted by meaningful content,
                while maintaining realistic text flow and word distribution.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-600 mt-1">•</span>
                      <span><strong>Multiple Units:</strong> Generate by paragraphs, sentences, or words</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-600 mt-1">•</span>
                      <span><strong>Adjustable Length:</strong> Specify exactly how much text you need</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-600 mt-1">•</span>
                      <span><strong>Classic Lorem Ipsum:</strong> Uses traditional Latin-based placeholder text</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-600 mt-1">•</span>
                      <span><strong>HTML Formatted:</strong> Option to wrap paragraphs in &lt;p&gt; tags for web development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-600 mt-1">•</span>
                      <span><strong>Instant Generation:</strong> Create placeholder text with one click</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-600 mt-1">•</span>
                      <span><strong>Copy & Download:</strong> Easy copying and downloading for immediate use</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
                  <ol className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-gray-600">1.</span>
                      <span>Select the unit type (paragraphs, sentences, or words)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-gray-600">2.</span>
                      <span>Specify how many units you need</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-gray-600">3.</span>
                      <span>Choose whether to include HTML paragraph tags</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-gray-600">4.</span>
                      <span>Click 'Generate' to create the placeholder text</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-gray-600">5.</span>
                      <span>Copy to clipboard or download as a text file</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-gray-600">6.</span>
                      <span>Paste into your design or development project</span>
                    </li>
                  </ol>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">What is it?</h3>
              <p className="mb-4">
                Lorem ipsum is scrambled Latin text derived from Cicero's 'de Finibus Bonorum et Malorum' (The Extremes of Good
                and Evil) written in 45 BC. The text has been used as placeholder text since the 1500s when an unknown printer
                scrambled a galley of type to make a type specimen book. It's become the industry standard because it has a
                normal distribution of letters (unlike 'Test test test'), looks like readable English, and doesn't distract
                reviewers with meaningful content. The most common Lorem ipsum passage begins: 'Lorem ipsum dolor sit amet,
                consectetur adipiscing elit...'
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Common Use Cases</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 mt-1">•</span>
                  <span><strong>Web Design Mockups:</strong> Fill layouts with realistic text before content is finalized</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 mt-1">•</span>
                  <span><strong>Print Design:</strong> Test typography, spacing, and layout in brochures and magazines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 mt-1">•</span>
                  <span><strong>App Development:</strong> Populate UI elements during development and testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 mt-1">•</span>
                  <span><strong>Client Presentations:</strong> Demonstrate design concepts without final copy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 mt-1">•</span>
                  <span><strong>Typography Testing:</strong> Evaluate font choices with varied text lengths</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 mt-1">•</span>
                  <span><strong>Content Planning:</strong> Visualize content areas and plan information architecture</span>
                </li>
              </ul>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy & Security</h3>
                <p>
                  All generation happens entirely in your browser using client-side JavaScript.
                  No data is transmitted to any server. Generated content remains private on your device.
                </p>
              </div>
            </div>
          </div>
        </div>
      
        </div>
      </div>
    </div>
  )
}