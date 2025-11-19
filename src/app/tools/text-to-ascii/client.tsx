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
  Settings,
  Info
} from "lucide-react"



type FormatType = 'decimal' | 'hexadecimal' | 'binary' | 'octal'
type SeparatorType = 'space' | 'comma' | 'newline' | 'none'

export default function TextToAsciiClient() {
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
    <div className="min-h-screen bg-gray-50 py-12">
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
                  <ArrowRight className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-0.5" />
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

        {/* Full-width SEO Content Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
          <div className="max-w-full">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">About Text to ASCII Converter</h2>
            </div>

            <div className="prose prose-sm text-gray-600 max-w-none">
              <p className="mb-4">
                The Text to ASCII Converter is a powerful online tool that transforms plain text characters into their corresponding
                ASCII numeric codes. Whether you need decimal, hexadecimal, binary, or octal representations, our converter provides
                instant, accurate conversions with flexible formatting options for any use case.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Multiple Format Output:</strong> Choose from decimal, hexadecimal, binary, or octal representations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Flexible Separators:</strong> Use space, comma, newline, or no separator between codes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Character Map Table:</strong> View detailed breakdown of each character with all formats simultaneously</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Whitespace Control:</strong> Option to include or exclude spaces and whitespace characters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Live Statistics:</strong> Real-time character, letter, and number counts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Export Options:</strong> Copy to clipboard or download detailed conversion reports</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
                  <ol className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">1.</span>
                      <span>Type or paste your text into the input field</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">2.</span>
                      <span>Select your desired output format (decimal, hex, binary, or octal)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">3.</span>
                      <span>Choose a separator style for the output codes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">4.</span>
                      <span>View the converted ASCII codes instantly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">5.</span>
                      <span>Enable character map for detailed analysis (optional)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">6.</span>
                      <span>Copy or download your results</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 my-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Output Format Examples</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <strong className="text-gray-900">Decimal (Base 10):</strong>
                    <code className="block bg-white px-2 py-1 rounded mt-1 font-mono">72 101 108 108 111</code>
                    <span className="text-gray-600">← "Hello"</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">Hexadecimal (Base 16):</strong>
                    <code className="block bg-white px-2 py-1 rounded mt-1 font-mono">0x48 0x65 0x6C 0x6C 0x6F</code>
                    <span className="text-gray-600">← "Hello"</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">Binary (Base 2):</strong>
                    <code className="block bg-white px-2 py-1 rounded mt-1 font-mono text-xs">0b01001000 0b01100101...</code>
                    <span className="text-gray-600">← "He..."</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">Octal (Base 8):</strong>
                    <code className="block bg-white px-2 py-1 rounded mt-1 font-mono">0o110 0o145 0o154...</code>
                    <span className="text-gray-600">← "Hel..."</span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Understanding ASCII Encoding</h3>
              <p className="mb-4">
                ASCII (American Standard Code for Information Interchange) is a character encoding standard that assigns unique numeric
                codes to letters, numbers, punctuation, and control characters. The standard ASCII table contains 128 characters (0-127),
                where each character is represented by a 7-bit binary number. Extended ASCII uses 8 bits to represent 256 characters (0-255),
                including additional symbols and international characters.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Common Use Cases</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Programming & Development:</strong> Generate character codes for source code or data structures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Data Encoding:</strong> Convert text to numeric format for transmission or storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Debugging:</strong> Analyze character values when troubleshooting encoding issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Education:</strong> Learn about character encoding and number system conversions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Binary Analysis:</strong> Examine the binary representation of text data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Protocol Implementation:</strong> Work with communication protocols that require ASCII codes</span>
                </li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">ASCII Code Ranges</h3>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div><strong>0-31:</strong> Control characters (non-printable)</div>
                  <div><strong>32:</strong> Space character</div>
                  <div><strong>33-47:</strong> Punctuation and symbols (!, ", #, etc.)</div>
                  <div><strong>48-57:</strong> Digits 0-9</div>
                  <div><strong>58-64:</strong> More punctuation (:, ;, &lt;, =, etc.)</div>
                  <div><strong>65-90:</strong> Uppercase letters A-Z</div>
                  <div><strong>91-96:</strong> Brackets and symbols</div>
                  <div><strong>97-122:</strong> Lowercase letters a-z</div>
                  <div><strong>123-127:</strong> Braces and symbols</div>
                  <div><strong>128-255:</strong> Extended ASCII (varies by encoding)</div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Format Comparison</h3>
              <p className="mb-4">
                Different number systems offer various advantages depending on your use case. <strong>Decimal</strong> is the most
                human-readable and commonly used in general programming. <strong>Hexadecimal</strong> is compact and popular in
                low-level programming, memory addresses, and color codes. <strong>Binary</strong> shows the actual bit-level
                representation and is essential for understanding data at the hardware level. <strong>Octal</strong> is less
                common today but still used in Unix file permissions and some legacy systems.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy & Security</h3>
                <p>
                  All text to ASCII conversions are performed entirely in your browser using client-side JavaScript.
                  Your data never leaves your device and is not transmitted to any server. This ensures complete privacy
                  and security for all your conversions, making it safe to use with sensitive text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}