"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Copy, RotateCcw, ArrowUpDown, Smile } from "lucide-react"
import StructuredData from "@/components/structured-data"

const emojiMap: { [key: string]: string } = {
  // Faces and emotions
  "happy": "😊", "smile": "😊", "joy": "😂", "laugh": "😂", "sad": "😢", "cry": "😢",
  "angry": "😠", "mad": "😠", "love": "😍", "heart": "❤️", "kiss": "😘", "wink": "😉",
  "cool": "😎", "sunglasses": "😎", "surprised": "😲", "shock": "😲", "thinking": "🤔",
  "confused": "😕", "worried": "😟", "scared": "😨", "fear": "😨", "sleepy": "😴",
  "sick": "🤒", "dizzy": "😵", "crazy": "🤪", "party": "🥳", "celebrate": "🥳",
  
  // Hand gestures
  "thumbs up": "👍", "thumbs down": "👎", "ok": "👌", "peace": "✌️", "victory": "✌️",
  "clap": "👏", "pray": "🙏", "high five": "🙏", "wave": "👋", "point": "👉",
  "fist": "✊", "punch": "👊", "muscle": "💪", "strong": "💪",
  
  // Animals
  "cat": "🐱", "dog": "🐶", "mouse": "🐭", "bear": "🐻", "panda": "🐼",
  "lion": "🦁", "tiger": "🐯", "fox": "🦊", "wolf": "🐺", "monkey": "🐵",
  "chicken": "🐔", "bird": "🐦", "penguin": "🐧", "fish": "🐟", "shark": "🦈",
  "whale": "🐋", "dolphin": "🐬", "turtle": "🐢", "snake": "🐍", "dragon": "🐉",
  "unicorn": "🦄", "horse": "🐴", "cow": "🐄", "pig": "🐷", "sheep": "🐑",
  
  // Food and drinks
  "pizza": "🍕", "burger": "🍔", "fries": "🍟", "hot dog": "🌭", "taco": "🌮",
  "apple": "🍎", "banana": "🍌", "orange": "🍊", "grape": "🍇", "strawberry": "🍓",
  "cake": "🎂", "cookie": "🍪", "donut": "🍩", "ice cream": "🍦", "candy": "🍬",
  "coffee": "☕", "tea": "🍵", "beer": "🍺", "wine": "🍷", "water": "💧",
  
  // Weather and nature
  "sun": "☀️", "sunny": "☀️", "moon": "🌙", "star": "⭐", "cloud": "☁️",
  "rain": "🌧️", "rainy": "🌧️", "snow": "❄️", "snowy": "❄️", "thunder": "⚡",
  "fire": "🔥", "hot": "🔥", "cold": "🧊", "ice": "🧊", "wind": "💨",
  "tree": "🌳", "flower": "🌸", "rose": "🌹", "grass": "🌱", "leaf": "🍃",
  
  // Transportation
  "car": "🚗", "bus": "🚌", "train": "🚂", "plane": "✈️", "ship": "🚢",
  "bike": "🚴", "walk": "🚶", "run": "🏃", "taxi": "🚕", "truck": "🚚",
  
  // Objects and symbols
  "phone": "📱", "computer": "💻", "tv": "📺", "camera": "📷", "book": "📚",
  "money": "💰", "gift": "🎁", "key": "🔑", "lock": "🔒", "home": "🏠",
  "work": "💼", "school": "🏫", "hospital": "🏥", "church": "⛪", "store": "🏪",
  "music": "🎵", "game": "🎮", "sport": "⚽", "ball": "⚽", "trophy": "🏆",
  
  // Time and calendar
  "time": "⏰", "clock": "🕐", "calendar": "📅", "birthday": "🎂", "new year": "🎊",
  "christmas": "🎄", "halloween": "🎃", "valentine": "💝",
  
  // Common words
  "yes": "✅", "no": "❌", "stop": "🛑", "go": "🟢", "warning": "⚠️",
  "question": "❓", "exclamation": "❗", "idea": "💡", "light": "💡",
  "check": "✅", "cross": "❌", "plus": "➕", "minus": "➖"
}

const reverseEmojiMap: { [key: string]: string } = Object.fromEntries(
  Object.entries(emojiMap).map(([key, value]) => [value, key])
)

export default function EmojiTranslator() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<"textToEmoji" | "emojiToText">("textToEmoji")

  const translateTextToEmoji = (text: string): string => {
    let result = text.toLowerCase()
    
    // Sort by length (longest first) to avoid partial matches
    const sortedKeys = Object.keys(emojiMap).sort((a, b) => b.length - a.length)
    
    for (const word of sortedKeys) {
      const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      result = result.replace(regex, emojiMap[word])
    }
    
    return result
  }

  const translateEmojiToText = (text: string): string => {
    let result = text
    
    for (const [emoji, word] of Object.entries(reverseEmojiMap)) {
      const regex = new RegExp(emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
      result = result.replace(regex, ` ${word} `)
    }
    
    // Clean up extra spaces
    return result.replace(/\s+/g, ' ').trim()
  }

  const handleTranslate = () => {
    if (!inputText.trim()) {
      setOutputText("")
      return
    }

    if (mode === "textToEmoji") {
      setOutputText(translateTextToEmoji(inputText))
    } else {
      setOutputText(translateEmojiToText(inputText))
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
    setMode(mode === "textToEmoji" ? "emojiToText" : "textToEmoji")
    setInputText("")
    setOutputText("")
  }

  const getPopularEmojis = () => {
    return [
      { emoji: "😊", word: "happy" },
      { emoji: "😂", word: "laugh" },
      { emoji: "❤️", word: "heart" },
      { emoji: "👍", word: "thumbs up" },
      { emoji: "🔥", word: "fire" },
      { emoji: "🎉", word: "party" },
      { emoji: "💯", word: "hundred" },
      { emoji: "🌟", word: "star" },
      { emoji: "🚀", word: "rocket" },
      { emoji: "💪", word: "muscle" },
      { emoji: "🎯", word: "target" },
      { emoji: "⚡", word: "thunder" }
    ]
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Emoji Translator",
    "description": "Convert text descriptions to emojis and emojis back to text descriptions with bidirectional translation.",
    "url": "https://toolshub.com/tools/emoji-translator",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Text to emoji conversion",
      "Emoji to text conversion",
      "Bidirectional translation",
      "Support for common words and phrases",
      "Popular emoji reference guide"
    ]
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Emoji Translator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert text descriptions to emojis and emojis back to text descriptions. 
            Perfect for social media, messaging, and adding fun to your text!
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Smile className="h-5 w-5" />
                  {mode === "textToEmoji" ? "Text to Emoji" : "Emoji to Text"}
                </CardTitle>
                <CardDescription>
                  {mode === "textToEmoji" 
                    ? "Enter text to convert words to emojis" 
                    : "Enter emojis to convert them to text descriptions"
                  }
                </CardDescription>
              </div>
              <Button onClick={toggleMode} variant="outline" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Switch Mode
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="input">
                {mode === "textToEmoji" ? "Text Input" : "Emoji Input"}
              </Label>
              <Textarea
                id="input"
                placeholder={
                  mode === "textToEmoji" 
                    ? "Enter text like: I am happy and love pizza!" 
                    : "Enter emojis like: 😊❤️🍕"
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
                {mode === "textToEmoji" ? "Emoji Output" : "Text Output"}
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
            <CardTitle>Popular Emojis</CardTitle>
            <CardDescription>
              Click on any emoji to add it to your input, or see common word-to-emoji mappings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {getPopularEmojis().map(({ emoji, word }) => (
                <button
                  key={word}
                  onClick={() => {
                    if (mode === "textToEmoji") {
                      setInputText(prev => prev + (prev ? " " : "") + word)
                    } else {
                      setInputText(prev => prev + emoji)
                    }
                  }}
                  className="flex flex-col items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-2xl mb-1">{emoji}</span>
                  <span className="text-xs text-gray-600">{word}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Text to Emoji:</strong> Converts words like "happy", "love", "pizza" to 😊❤️🍕</li>
                <li>• <strong>Emoji to Text:</strong> Converts emojis back to descriptive words</li>
                <li>• Supports emotions, animals, food, weather, objects, and more</li>
                <li>• Perfect for social media posts, messages, and creative writing</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Example Translations:</h4>
              <div className="text-sm text-green-800 space-y-1">
                <div><strong>Input:</strong> "I love pizza and coffee" → <strong>Output:</strong> "I ❤️ 🍕 and ☕"</div>
                <div><strong>Input:</strong> "Happy birthday party" → <strong>Output:</strong> "😊 🎂 🥳"</div>
                <div><strong>Input:</strong> "😊🌞🏠" → <strong>Output:</strong> "happy sun home"</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}