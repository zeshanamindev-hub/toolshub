"use client"

import { useState, useMemo, useCallback, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RotateCcw, Copy, Check, Settings, Play, Pause, Volume2, Trash2, Info } from "lucide-react"

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

export default function TextToMorsePage() {
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
  }, [inputText, playbackSpeed, convertToMorse])

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

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Text to Morse Code Translator</CardTitle>
          <CardDescription>
            Convert text to Morse code with multiple display styles and audio playback support.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {morseStyles.map((style) => (
              <Button
                key={style.name}
                variant={selectedStyle === style.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStyle(style.name)}
                className={`flex items-center gap-2 ${selectedStyle === style.name ? style.color : ""}`}
              >
                <Settings className="h-4 w-4" />
                {style.name}
              </Button>
            ))}
          </div>

          <div className="grid gap-4">
            <div>
              <Textarea
                placeholder="Enter text to convert to Morse code..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <Card>
                <CardContent className="p-4">
                  <div className="font-mono break-all">
                    {inputText ? convertToMorse(inputText) : 'Morse code output will appear here...'}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    <span className="font-semibold">Statistics</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p>Characters: {stats.chars}</p>
                    <p>Words: {stats.words}</p>
                    <p>Dots: {stats.dots}</p>
                    <p>Dashes: {stats.dashes}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <span className="font-semibold">Playback</span>
                  </div>
                  <div className="flex items-center gap-2">
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
                          Play
                        </>
                      )}
                    </Button>
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
              </Card>
            </div>

            <div className="flex flex-wrap gap-2">
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
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Examples:</h3>
            <div className="space-y-2 text-sm">
              <p><strong>SOS</strong> → {convertToMorse("SOS")}</p>
              <p><strong>HELLO</strong> → {convertToMorse("HELLO")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}