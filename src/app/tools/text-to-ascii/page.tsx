"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Binary, 
  Copy, 
  RotateCcw, 
  Check,
  ArrowRight,
  Download,
  Settings
} from "lucide-react"



type FormatType = 'decimal' | 'hexadecimal' | 'binary' | 'octal'
type SeparatorType = 'space' | 'comma' | 'newline' | 'none'

export default function TextToAsciiPage() {
  const [inputText, setInputText] = useState("")
  const [format, setFormat] = useState<FormatType>('decimal')
  const [separator, setSeparator] = useState<SeparatorType>('space')
  const [includeSpaces, setIncludeSpaces] = useState(true)
  const [showCharacterMap, setShowCharacterMap] = useState(false)
  const [copied, setCopied] = useState(false)

  const convertedText = useMemo(() => {
    if (!inputText) return ""

    const chars = includeSpaces ? inputText : inputText.replace(/\s/g, '')
    const codes = []

    for (const char of chars) {
      const code = char.charCodeAt(0)
      
      switch (format) {
        case 'decimal':
          codes.push(code.toString())
          break
        case 'hexadecimal':
          codes.push('0x' + code.toString(16).toUpperCase())
          break
        case 'binary':
          codes.push('0b' + code.toString(2).padStart(8, '0'))
          break
        case 'octal':
          codes.push('0o' + code.toString(8))
          break
      }
    }

    switch (separator) {
      case 'space':
        return codes.join(' ')
      case 'comma':
        return codes.join(', ')
      case 'newline':
        return codes.join('\n')
      case 'none':
        return codes.join('')
      default:
        return codes.join(' ')
    }
  }, [inputText, format, separator, includeSpaces])

  const characterMap = useMemo(() => {
    if (!inputText) return []
    
    const chars = includeSpaces ? inputText : inputText.replace(/\s/g, '')
    return Array.from(chars).map((char, index) => {
      const code = char.charCodeAt(0)
      return {
        char,
        decimal: code,
        hex: '0x' + code.toString(16).toUpperCase(),
        binary: '0b' + code.toString(2).padStart(8, '0'),
        octal: '0o' + code.toString(8),
        index
      }
    })
  }, [inputText, includeSpaces])

  const copyToClipboard = async () => {
    if (convertedText) {
      await navigator.clipboard.writeText(convertedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadResult = () => {
    const content = `Text to ASCII Conversion\n${'='.repeat(30)}\n\nOriginal Text:\n${inputText}\n\nFormat: ${format.charAt(0).toUpperCase() + format.slice(1)}\nSeparator: ${separator}\nInclude Spaces: ${includeSpaces}\n\nConverted Result:\n${convertedText}\n\nCharacter Map:\n${characterMap.map(item => `'${item.char}' -> Decimal: ${item.decimal}, Hex: ${item.hex}, Binary: ${item.binary}, Octal: ${item.octal}`).join('\n')}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'text-to-ascii-conversion.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearText = () => {
    setInputText("")
  }

  const formatExamples = {
    decimal: "72 101 108 108 111",
    hexadecimal: "0x48 0x65 0x6C 0x6C 0x6F",
    binary: "0b01001000 0b01100101 0b01101100 0b01101100 0b01101111",
    octal: "0o110 0o145 0o154 0o154 0o157"
  }

  const separatorExamples = {
    space: "65 66 67",
    comma: "65, 66, 67",
    newline: "65\n66\n67",
    none: "656667"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Binary className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Text to ASCII Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert text characters to ASCII codes in multiple formats. 
            Support for decimal, hexadecimal, binary, and octal representations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Converter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle>Input Text</CardTitle>
                <CardDescription>
                  Enter the text you want to convert to ASCII codes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your text here..."
                  className="min-h-[120px] resize-none font-mono"
                />
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Characters: {inputText.length} | 
                    Letters: {inputText.replace(/[^a-zA-Z]/g, '').length} | 
                    Numbers: {inputText.replace(/[^0-9]/g, '').length}
                  </div>
                  <Button
                    variant="outline"
                    onClick={clearText}
                    disabled={!inputText}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Arrow */}
            {inputText && (
              <div className="flex justify-center">
                <div className="flex items-center space-x-2 text-gray-500">
                  <ArrowRight className="h-6 w-6" />
                  <span className="text-sm font-medium">Converting to {format}</span>
                </div>
              </div>
            )}

            {/* Output */}
            {inputText && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>ASCII Codes ({format})</CardTitle>
                      <CardDescription>
                        Converted ASCII representation
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadResult}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={convertedText}
                    readOnly
                    className="min-h-[120px] resize-none font-mono text-sm"
                  />
                </CardContent>
              </Card>
            )}

            {/* Character Map */}
            {inputText && showCharacterMap && (
              <Card>
                <CardHeader>
                  <CardTitle>Character Map</CardTitle>
                  <CardDescription>
                    Detailed breakdown of each character
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Char</th>
                          <th className="text-left p-2">Decimal</th>
                          <th className="text-left p-2">Hex</th>
                          <th className="text-left p-2">Binary</th>
                          <th className="text-left p-2">Octal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {characterMap.map((item, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-2 font-mono font-bold">
                              {item.char === ' ' ? '␣' : item.char}
                            </td>
                            <td className="p-2 font-mono">{item.decimal}</td>
                            <td className="p-2 font-mono">{item.hex}</td>
                            <td className="p-2 font-mono text-xs">{item.binary}</td>
                            <td className="p-2 font-mono">{item.octal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Conversion Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Format Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Output Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as FormatType)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="decimal">Decimal (Base 10)</option>
                    <option value="hexadecimal">Hexadecimal (Base 16)</option>
                    <option value="binary">Binary (Base 2)</option>
                    <option value="octal">Octal (Base 8)</option>
                  </select>
                  <div className="text-xs text-gray-500 mt-1">
                    Example: {formatExamples[format]}
                  </div>
                </div>

                {/* Separator Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Separator
                  </label>
                  <select
                    value={separator}
                    onChange={(e) => setSeparator(e.target.value as SeparatorType)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="space">Space</option>
                    <option value="comma">Comma</option>
                    <option value="newline">New Line</option>
                    <option value="none">None</option>
                  </select>
                  <div className="text-xs text-gray-500 mt-1">
                    Example: {separatorExamples[separator]}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={includeSpaces}
                      onChange={(e) => setIncludeSpaces(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Include spaces and whitespace</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showCharacterMap}
                      onChange={(e) => setShowCharacterMap(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Show character map table</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Quick Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => setInputText("Hello World")}
                >
                  <span className="font-mono">Hello World</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => setInputText("ABC123")}
                >
                  <span className="font-mono">ABC123</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => setInputText("!@#$%")}
                >
                  <span className="font-mono">!@#$%</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => setInputText("The quick brown fox")}
                >
                  <span className="font-mono text-xs">The quick brown fox</span>
                </Button>
              </CardContent>
            </Card>

            {/* ASCII Reference */}
            <Card>
              <CardHeader>
                <CardTitle>ASCII Reference</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <div><strong>0-31:</strong> Control characters</div>
                <div><strong>32:</strong> Space character</div>
                <div><strong>33-47:</strong> Punctuation</div>
                <div><strong>48-57:</strong> Digits (0-9)</div>
                <div><strong>58-64:</strong> Punctuation</div>
                <div><strong>65-90:</strong> Uppercase (A-Z)</div>
                <div><strong>91-96:</strong> Punctuation</div>
                <div><strong>97-122:</strong> Lowercase (a-z)</div>
                <div><strong>123-127:</strong> Punctuation</div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About This Tool</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  Convert text characters to their ASCII (American Standard Code for Information Interchange) 
                  numeric representations in various formats.
                </p>
                <p>
                  <strong>Use cases:</strong> Programming, data encoding, debugging, 
                  cryptography, and educational purposes.
                </p>
                <p>
                  <strong>Privacy:</strong> All conversions are performed locally in your browser.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}