"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RotateCcw, Copy, Check, Pause, Volume2, Info } from "lucide-react"

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

// Reverse morse code map for decoding
const morseToTextMap: { [key: string]: string } = {
  '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
  '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
  '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
  '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
  '-.--': 'Y', '--..': 'Z', '.----': '1', '..---': '2', '...--': '3',
  '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8',
  '----.': '9', '-----': '0', '.-.-.-': '.', '--..--': ',', '..--..': '?',
  '-.-.--': '!', '.--.-.': '@', '.-...': '&', '---...': ':', '-.-.-.': ';',
  '-...-': '=', '.-.-.': '+', '-....-': '-', '..--.-': '_', '.-..-.': '"',
  '...-..-': '$', '.----.': "'", '-..-.': '/', '-.--.': '(', '-.--.-': ')'
}

export default function MorseToTextPage() {
  const [inputText, setInputText] = useState("")
  const [copied, setCopied] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<string>("Standard")
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const audioContext = useRef<AudioContext | null>(null)
  const oscillator = useRef<OscillatorNode | null>(null)

  const getSelectedStyle = () => morseStyles.find(style => style.name === selectedStyle) || morseStyles[0]

  const normalizeInput = (input: string): string => {
    const style = getSelectedStyle()
    return input
      .replace(new RegExp(style.dot, 'g'), '.')
      .replace(new RegExp(style.dash, 'g'), '-')
  }

  const convertToText = (morse: string): string => {
    setError(null)
    const normalizedInput = normalizeInput(morse)
    
    try {
      return normalizedInput
        .split('   ') // Split into words (3 spaces)
        .map(word => 
          word
            .trim()
            .split(' ') // Split into characters (1 space)
            .map(char => {
              if (!char) return ''
              const letter = morseToTextMap[char]
              if (!letter) {
                setError(`Invalid Morse code sequence: ${char}`)
                return '�'
              }
              return letter
            })
            .join('')
        )
        .join(' ') || ''
    } catch (e) {
      return ''
    }
  }

  const handleCopy = async () => {
    const text = convertToText(inputText)
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setInputText("")
    setCopied(false)
    setIsPlaying(false)
    setError(null)
    if (oscillator.current) {
      oscillator.current.stop()
      oscillator.current.disconnect()
    }
  }

  const playMorseCode = () => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext()
    }

    const ctx = audioContext.current
    const dotDuration = 60 / playbackSpeed
    
    oscillator.current = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.current.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.current.frequency.value = 600
    gainNode.gain.value = 0
    
    const normalizedInput = normalizeInput(inputText)
    let currentTime = ctx.currentTime
    
    oscillator.current.start()
    setIsPlaying(true)

    normalizedInput.split('').forEach(char => {
      if (char === '.') {
        gainNode.gain.setValueAtTime(0.5, currentTime)
        gainNode.gain.setValueAtTime(0, currentTime + 0.1)
        currentTime += dotDuration / 1000
      } else if (char === '-') {
        gainNode.gain.setValueAtTime(0.5, currentTime)
        gainNode.gain.setValueAtTime(0, currentTime + 0.3)
        currentTime += (dotDuration * 3) / 1000
      } else if (char === ' ') {
        currentTime += (dotDuration * 7) / 1000
      }
    })

    setTimeout(() => {
      setIsPlaying(false)
      oscillator.current?.stop()
      oscillator.current?.disconnect()
    }, (currentTime - ctx.currentTime) * 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Morse Code to Text Converter</CardTitle>
          <CardDescription>
            Convert Morse code to text with support for multiple styles and audio playback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {morseStyles.map((style) => (
              <Button
                key={style.name}
                variant={selectedStyle === style.name ? "default" : "outline"}
                className={selectedStyle === style.name ? style.color : ""}
                onClick={() => setSelectedStyle(style.name)}
              >
                {style.name}
                <span className="ml-2 opacity-70">({style.dot}{style.dash})</span>
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder={"Enter Morse code using " + getSelectedStyle().dot + " for dots and " + getSelectedStyle().dash + " for dashes..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[150px] font-mono"
            />
            {error && (
              <div className="text-red-500 text-sm flex items-center gap-2">
                <Info size={16} />
                {error}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCopy} disabled={!inputText}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied!" : "Copy Text"}
            </Button>
            
            <Button onClick={handleReset} variant="outline" disabled={!inputText}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>

            <Button
              onClick={() => isPlaying ? (
                oscillator.current?.stop(),
                oscillator.current?.disconnect(),
                setIsPlaying(false)
              ) : playMorseCode()}
              variant="outline"
              disabled={!inputText}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Stop Audio
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 mr-2" />
                  Play Audio
                </>
              )}
            </Button>

            <select
              className="px-3 py-2 border rounded-md"
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            >
              <option value={0.5}>0.5x Speed</option>
              <option value={1}>1x Speed</option>
              <option value={1.5}>1.5x Speed</option>
              <option value={2}>2x Speed</option>
            </select>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Converted Text:</h3>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md font-mono min-h-[50px]">
              {inputText ? convertToText(inputText) : <span className="text-gray-400">Converted text will appear here...</span>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}