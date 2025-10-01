"use client"

import { useState, useMemo, useCallback, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ToolPageLayout from "@/components/layout/tool-page-layout"
import { ToolStructuredData } from "@/components/seo/tool-seo"
import {
  RotateCcw,
  Copy,
  Check,
  Settings,
  Play,
  Pause,
  Volume2,
  Trash2,
  Info,
  Code,
  Zap,
  Radio
} from "lucide-react"

interface MorseCodeStyle {
  name: string
  description: string
  dot: string
  dash: string
  color: string
}

const morseStyles: MorseCodeStyle[] = [
  {
    name: "Standard",
    description: "Classic dots and dashes",
    dot: ".",
    dash: "-",
    color: "text-blue-600",
  },
  {
    name: "Typography",
    description: "Typographic dots and em dashes",
    dot: "•",
    dash: "—",
    color: "text-green-600",
  },
  {
    name: "Binary",
    description: "Binary style ones and zeros",
    dot: "1",
    dash: "0",
    color: "text-purple-600",
  },
  {
    name: "Symbolic",
    description: "Star and line symbols",
    dot: "★",
    dash: "▬",
    color: "text-orange-600",
  },
]

const morseCodeMap: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': ' ', '.': '.-.-.-', ',': '--..--',
  '?': '..--..', '!': '-.-.--', '@': '.--.-.', '&': '.-...',
  ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-',
  '\'': '.----.', '/': '-..-.', '(': '-.--.', ')': '-.--.-'
}

export default function TextToMorseClient() {
  const [inputText, setInputText] = useState("")
  const [copied, setCopied] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<string>("Standard")
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const audioContext = useRef<AudioContext | null>(null)
  const oscillator = useRef<OscillatorNode | null>(null)

  const getSelectedStyle = () => morseStyles.find(style => style.name === selectedStyle) || morseStyles[0]

  const convertToMorse = useCallback((text: string): string => {
    const style = getSelectedStyle()
    return text
      .toUpperCase()
      .split('')
      .map(char => {
        const morse = morseCodeMap[char]
        if (morse === undefined) return ''
        if (morse === ' ') return '   ' // 3 spaces between words
        return morse.replace(/\./g, style.dot).replace(/-/g, style.dash)
      })
      .join(' ') // 1 space between characters
  }, [selectedStyle])

  const handleCopy = async () => {
    const morseCode = convertToMorse(inputText)
    await navigator.clipboard.writeText(morseCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setInputText("")
    setCopied(false)
    setIsPlaying(false)
    if (oscillator.current) {
      oscillator.current.stop()
      oscillator.current.disconnect()
    }
  }

  const playMorseCode = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext()
    }

    if (oscillator.current) {
      oscillator.current.stop()
      oscillator.current.disconnect()
    }

    const ctx = audioContext.current
    oscillator.current = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.current.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.current.frequency.setValueAtTime(600, ctx.currentTime)

    const morseCode = convertToMorse(inputText)
    let time = ctx.currentTime
    const unit = 0.1 / playbackSpeed // Base unit of time

    morseCode.split('').forEach(char => {
      switch(char) {
        case '.':
        case '•':
        case '1':
        case '★':
          gainNode.gain.setValueAtTime(1, time)
          gainNode.gain.setValueAtTime(0, time + unit)
          time += unit * 2
          break
        case '-':
        case '—':
        case '0':
        case '▬':
          gainNode.gain.setValueAtTime(1, time)
          gainNode.gain.setValueAtTime(0, time + unit * 3)
          time += unit * 4
          break
        case ' ':
          time += unit * 3
          break
      }
    })

    oscillator.current.start()
    setTimeout(() => {
      if (oscillator.current) {
        oscillator.current.stop()
        oscillator.current.disconnect()
        setIsPlaying(false)
      }
    }, (time - ctx.currentTime) * 1000)
  }, [inputText, playbackSpeed])

  const handlePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false)
      if (oscillator.current) {
        oscillator.current.stop()
        oscillator.current.disconnect()
      }
    } else {
      setIsPlaying(true)
      playMorseCode()
    }
  }

  const getStats = () => {
    const morse = convertToMorse(inputText)
    const chars = inputText.length
    const words = inputText.trim().split(/\s+/).length
    const dots = morse.split('').filter(c => ['.', '•', '1', '★'].includes(c)).length
    const dashes = morse.split('').filter(c => ['-', '—', '0', '▬'].includes(c)).length
    return { chars, words, dots, dashes }
  }

  const stats = getStats()
  const style = getSelectedStyle()

  const features = [
    "Convert text to Morse code with multiple display styles",
    "Audio playback of Morse code with adjustable speed",
    "Support for letters, numbers, and common punctuation",
    "Real-time conversion with instant preview",
    "Copy Morse code to clipboard",
    "Statistics showing dots, dashes, and character counts",
    "Multiple visual styles (Standard, Typography, Binary, Symbolic)",
    "Error handling for unsupported characters"
  ]

  const useCases = [
    "Learning Morse code for amateur radio operators",
    "Creating Morse code messages for fun or education",
    "Converting text for telegraph-style communication",
    "Educational purposes in coding and communication classes",
    "Generating Morse code for puzzles and games",
    "Testing Morse code proficiency with audio playback",
    "Converting emergency signals like SOS",
    "Creating unique text representations for art projects"
  ]

  const tips = [
    "Use the audio playback to learn Morse code patterns",
    "Try different styles to find what works best for you",
    "SOS in Morse code is ... --- ...",
    "Numbers are represented by 5 symbols each",
    "Spaces between words are represented by 3 spaces",
    "Practice with common words to build familiarity",
    "Use the statistics to analyze Morse code efficiency"
  ]

  const relatedTools = [
    {
      name: "Morse to Text",
      href: "/tools/morse-to-text",
      icon: Code,
      description: "Convert Morse code back to text"
    },
    {
      name: "Text to ASCII",
      href: "/tools/text-to-ascii",
      icon: Code,
      description: "Convert text to ASCII codes"
    },
    {
      name: "Base64 Converter",
      href: "/tools/base64-converter",
      icon: Code,
      description: "Encode/decode Base64"
    }
  ]

  const faqs = [
    {
      question: "What characters are supported?",
      answer: "The tool supports all letters (A-Z), numbers (0-9), and common punctuation marks including period, comma, question mark, exclamation point, and more."
    },
    {
      question: "How does the audio playback work?",
      answer: "The audio uses a 600Hz tone with dots as short beeps and dashes as long beeps. You can adjust the playback speed from 0.5x to 2x normal speed."
    },
    {
      question: "What are the different display styles?",
      answer: "Standard uses dots and dashes, Typography uses bullets and em-dashes, Binary uses 1s and 0s, and Symbolic uses stars and lines."
    },
    {
      question: "Can I convert Morse code back to text?",
      answer: "Yes! Use our companion tool 'Morse to Text' to convert Morse code back to readable text."
    }
  ]

  return (
    <>
      <ToolStructuredData
        toolName="Text to Morse Code Translator"
        toolDescription="Convert text to Morse code with multiple styles and audio playback. Supports letters, numbers, and common punctuation with real-time translation."
        category="Converters & Encoding"
        toolPath="/tools/text-to-morse"
      />

      <ToolPageLayout
        toolName="Text to Morse Code Translator"
        toolDescription="Convert text to Morse code with multiple display styles and audio playback support. Perfect for learning, communication, and educational purposes."
        toolIcon={Radio}
        category="Converters & Encoding"
        categoryHref="/categories/converters-encoding"
        features={features}
        useCases={useCases}
        relatedTools={relatedTools}
        tips={tips}
        faqs={faqs}
      >
        <div className="space-y-6">
          {/* Style Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Display Style
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {morseStyles.map((style) => (
                  <Button
                    key={style.name}
                    variant={selectedStyle === style.name ? "default" : "outline"}
                    onClick={() => setSelectedStyle(style.name)}
                    className={`flex flex-col items-center gap-2 h-auto py-4 ${selectedStyle === style.name ? style.color : ""}`}
                  >
                    <div className="text-lg font-bold">
                      {style.dot}{style.dash}
                    </div>
                    <div className="text-xs">{style.name}</div>
                  </Button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-3">
                {style.description}
              </p>
            </CardContent>
          </Card>

          {/* Input and Output */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle>Text Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter text to convert to Morse code..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={handleCopy}
                    className="flex items-center gap-2"
                    disabled={!inputText}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Morse Code
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="flex items-center gap-2"
                    disabled={!inputText}
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Morse Code Output
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg min-h-[120px]">
                  <pre className="font-mono text-sm break-all whitespace-pre-wrap">
                    {inputText ? convertToMorse(inputText) : 'Morse code output will appear here...'}
                  </pre>
                </div>

                {/* Audio Playback */}
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePlayback}
                    disabled={!inputText}
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Play Audio
                      </>
                    )}
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Speed:</span>
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={1}>1x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={2}>2x</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Conversion Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.chars}</div>
                  <div className="text-sm text-gray-600">Characters</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.words}</div>
                  <div className="text-sm text-gray-600">Words</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{stats.dots}</div>
                  <div className="text-sm text-gray-600">Dots</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{stats.dashes}</div>
                  <div className="text-sm text-gray-600">Dashes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Common Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="font-semibold text-gray-900">Emergency Signals:</div>
                  {[
                    { text: "SOS", morse: "... --- ..." },
                    { text: "HELP", morse: ".... . .-.. .--." },
                    { text: "OK", morse: "--- -.-" }
                  ].map((example) => (
                    <div key={example.text} className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium text-gray-800">"{example.text}"</div>
                      <div className="font-mono text-sm text-red-600">{example.morse}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="font-semibold text-gray-900">Common Words:</div>
                  {[
                    { text: "HI", morse: ".... .." },
                    { text: "BYE", morse: "-... -.-- ." },
                    { text: "YES", morse: "-.-- . ..." }
                  ].map((example) => (
                    <div key={example.text} className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-gray-800">"{example.text}"</div>
                      <div className="font-mono text-sm text-blue-600">{example.morse}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolPageLayout>
    </>
  )
}
