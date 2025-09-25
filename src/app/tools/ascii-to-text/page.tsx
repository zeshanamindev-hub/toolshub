"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Type, 
  Copy, 
  RotateCcw, 
  Check,
  ArrowRight,
  Download,
  AlertCircle,
  Settings
} from "lucide-react"



type InputFormat = 'auto' | 'decimal' | 'hexadecimal' | 'binary' | 'octal'
type SeparatorType = 'auto' | 'space' | 'comma' | 'tab' | 'newline'

export default function AsciiToTextPage() {
  const [inputCodes, setInputCodes] = useState("")
  const [inputFormat, setInputFormat] = useState<InputFormat>('auto')
  const [separator, setSeparator] = useState<SeparatorType>('auto')
  const [copied, setCopied] = useState(false)

  const conversionResult = useMemo(() => {
    if (!inputCodes.trim()) return { text: "", errors: [], warnings: [] }

    const errors: string[] = []
    const warnings: string[] = []
    const processedInput = inputCodes.trim()

    // Determine separator
    let actualSeparator = ' '
    if (separator === 'auto') {
      if (processedInput.includes(',')) actualSeparator = ','
      else if (processedInput.includes('\n')) actualSeparator = '\n'
      else actualSeparator = ' '
    } else if (separator === 'comma') actualSeparator = ','
    else if (separator === 'newline') actualSeparator = '\n'
    else actualSeparator = ' '

    // Split input into individual codes
    let codes = processedInput.split(actualSeparator).filter(code => code.trim() !== '')

    // If no separator found and format is not auto, try to parse as continuous string
    if (codes.length === 1 && inputFormat !== 'auto') {
      const singleCode = codes[0]
      if (inputFormat === 'binary' && singleCode.length % 8 === 0) {
        // Split binary into 8-bit chunks
        codes = []
        for (let i = 0; i < singleCode.length; i += 8) {
          codes.push(singleCode.substr(i, 8))
        }
      } else if (inputFormat === 'hexadecimal' && singleCode.length % 2 === 0) {
        // Split hex into 2-character chunks
        codes = []
        for (let i = 0; i < singleCode.length; i += 2) {
          codes.push(singleCode.substr(i, 2))
        }
      }
    }

    const convertedChars: string[] = []

    codes.forEach((code, index) => {
      const trimmedCode = code.trim()
      if (!trimmedCode) return

      let numericValue: number | null = null
      let detectedFormat = inputFormat

      // Auto-detect format if needed
      if (inputFormat === 'auto') {
        if (/^0x[0-9A-Fa-f]+$/.test(trimmedCode)) {
          detectedFormat = 'hexadecimal'
        } else if (/^0b[01]+$/.test(trimmedCode)) {
          detectedFormat = 'binary'
        } else if (/^0o[0-7]+$/.test(trimmedCode)) {
          detectedFormat = 'octal'
        } else if (/^[01]+$/.test(trimmedCode) && trimmedCode.length === 8) {
          detectedFormat = 'binary'
        } else if (/^[0-9A-Fa-f]+$/.test(trimmedCode) && trimmedCode.length <= 2) {
          detectedFormat = 'hexadecimal'
        } else if (/^\d+$/.test(trimmedCode)) {
          detectedFormat = 'decimal'
        } else {
          errors.push(`Invalid format for code "${trimmedCode}" at position ${index + 1}`)
          return
        }
      }

      // Convert based on detected/specified format
      try {
        switch (detectedFormat) {
          case 'decimal':
            if (!/^\d+$/.test(trimmedCode)) {
              errors.push(`Invalid decimal format: "${trimmedCode}" at position ${index + 1}`)
              return
            }
            numericValue = parseInt(trimmedCode, 10)
            break

          case 'hexadecimal':
            let hexCode = trimmedCode
            if (hexCode.startsWith('0x') || hexCode.startsWith('0X')) {
              hexCode = hexCode.slice(2)
            }
            if (!/^[0-9A-Fa-f]+$/.test(hexCode)) {
              errors.push(`Invalid hexadecimal format: "${trimmedCode}" at position ${index + 1}`)
              return
            }
            numericValue = parseInt(hexCode, 16)
            break

          case 'binary':
            let binCode = trimmedCode
            if (binCode.startsWith('0b') || binCode.startsWith('0B')) {
              binCode = binCode.slice(2)
            }
            if (!/^[01]+$/.test(binCode)) {
              errors.push(`Invalid binary format: "${trimmedCode}" at position ${index + 1}`)
              return
            }
            numericValue = parseInt(binCode, 2)
            break

          case 'octal':
            let octCode = trimmedCode
            if (octCode.startsWith('0o') || octCode.startsWith('0O')) {
              octCode = octCode.slice(2)
            }
            if (!/^[0-7]+$/.test(octCode)) {
              errors.push(`Invalid octal format: "${trimmedCode}" at position ${index + 1}`)
              return
            }
            numericValue = parseInt(octCode, 8)
            break

          default:
            errors.push(`Unknown format for code "${trimmedCode}" at position ${index + 1}`)
            return
        }

        // Validate ASCII range
        if (numericValue < 0 || numericValue > 127) {
          if (numericValue > 127 && numericValue <= 255) {
            warnings.push(`Extended ASCII character (${numericValue}) at position ${index + 1}`)
          } else {
            errors.push(`Value ${numericValue} is outside ASCII range (0-127) at position ${index + 1}`)
            return
          }
        }

        // Convert to character
        const char = String.fromCharCode(numericValue)
        
        // Check for control characters
        if (numericValue < 32 && numericValue !== 9 && numericValue !== 10 && numericValue !== 13) {
          warnings.push(`Control character (${numericValue}) at position ${index + 1} - displayed as [${numericValue}]`)
          convertedChars.push(`[${numericValue}]`)
        } else {
          convertedChars.push(char)
        }

      } catch (error) {
        errors.push(`Error processing code "${trimmedCode}" at position ${index + 1}`)
      }
    })

    return {
      text: convertedChars.join(''),
      errors,
      warnings
    }
  }, [inputCodes, inputFormat, separator])

  const copyToClipboard = async () => {
    if (conversionResult.text) {
      await navigator.clipboard.writeText(conversionResult.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadResult = () => {
    const content = `ASCII to Text Conversion\n${'='.repeat(30)}\n\nInput Format: ${inputFormat}\nSeparator: ${separator}\n\nOriginal ASCII Codes:\n${inputCodes}\n\nConverted Text:\n${conversionResult.text}\n\nErrors:\n${conversionResult.errors.length > 0 ? conversionResult.errors.join('\n') : 'None'}\n\nWarnings:\n${conversionResult.warnings.length > 0 ? conversionResult.warnings.join('\n') : 'None'}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ascii-to-text-conversion.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearText = () => {
    setInputCodes("")
  }

  const exampleInputs = [
    { name: "Hello World (Decimal)", codes: "72 101 108 108 111 32 87 111 114 108 100", format: 'decimal' as InputFormat },
    { name: "Hello (Hexadecimal)", codes: "0x48 0x65 0x6C 0x6C 0x6F", format: 'hexadecimal' as InputFormat },
    { name: "Hi (Binary)", codes: "0b01001000 0b01101001", format: 'binary' as InputFormat },
    { name: "ABC (Octal)", codes: "0o101 0o102 0o103", format: 'octal' as InputFormat },
    { name: "Mixed Format", codes: "72, 101, 108, 108, 111", format: 'auto' as InputFormat },
    { name: "Continuous Hex", codes: "48656C6C6F", format: 'hexadecimal' as InputFormat }
  ]

  const loadExample = (example: typeof exampleInputs[0]) => {
    setInputCodes(example.codes)
    setInputFormat(example.format)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Type className="h-12 w-12 text-teal-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ASCII to Text Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert ASCII codes back to readable text. Support for decimal, hexadecimal, 
            binary, and octal formats with intelligent auto-detection and error handling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Converter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Conversion Settings
                </CardTitle>
                <CardDescription>
                  Configure input format and separator options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input Format
                    </label>
                    <select
                      value={inputFormat}
                      onChange={(e) => setInputFormat(e.target.value as InputFormat)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="auto">Auto-detect</option>
                      <option value="decimal">Decimal (72, 101, 108)</option>
                      <option value="hexadecimal">Hexadecimal (0x48, 0x65, 0x6C)</option>
                      <option value="binary">Binary (0b01001000, 0b01100101)</option>
                      <option value="octal">Octal (0o110, 0o145)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Separator
                    </label>
                    <select
                      value={separator}
                      onChange={(e) => setSeparator(e.target.value as SeparatorType)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="auto">Auto-detect</option>
                      <option value="space">Space</option>
                      <option value="comma">Comma</option>
                      <option value="newline">New Line</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle>ASCII Codes Input</CardTitle>
                <CardDescription>
                  Enter ASCII codes in your chosen format, separated by spaces, commas, or new lines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={inputCodes}
                  onChange={(e) => setInputCodes(e.target.value)}
                  placeholder="Enter ASCII codes here... (e.g., 72 101 108 108 111 or 0x48 0x65 0x6C 0x6C 0x6F)"
                  className="min-h-[120px] resize-none font-mono text-sm"
                />
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Input length: {inputCodes.length} characters
                  </div>
                  <Button
                    variant="outline"
                    onClick={clearText}
                    disabled={!inputCodes}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Arrow */}
            {inputCodes && (
              <div className="flex justify-center">
                <div className="flex items-center space-x-2 text-gray-500">
                  <ArrowRight className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-0.5" />
                  <span className="text-sm font-medium">Converting from ASCII codes</span>
                </div>
              </div>
            )}

            {/* Output */}
            {inputCodes && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Converted Text</CardTitle>
                      <CardDescription>
                        Readable text from ASCII codes
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        disabled={!conversionResult.text}
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
                <CardContent className="space-y-4">
                  <Textarea
                    value={conversionResult.text}
                    readOnly
                    className="min-h-[120px] resize-none font-mono text-lg bg-gray-50"
                    placeholder="Converted text will appear here..."
                  />

                  {/* Errors and Warnings */}
                  {(conversionResult.errors.length > 0 || conversionResult.warnings.length > 0) && (
                    <div className="space-y-3">
                      {conversionResult.errors.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="flex items-center mb-2">
                            <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                            <span className="font-medium text-red-800">Errors</span>
                          </div>
                          <ul className="text-sm text-red-700 space-y-1">
                            {conversionResult.errors.map((error, index) => (
                              <li key={index}>• {error}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {conversionResult.warnings.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-center mb-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                            <span className="font-medium text-yellow-800">Warnings</span>
                          </div>
                          <ul className="text-sm text-yellow-700 space-y-1">
                            {conversionResult.warnings.map((warning, index) => (
                              <li key={index}>• {warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Examples</CardTitle>
                <CardDescription>
                  Click to load example ASCII codes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {exampleInputs.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => loadExample(example)}
                  >
                    <div className="w-full">
                      <div className="font-medium text-sm">{example.name}</div>
                      <div className="text-xs text-gray-500 font-mono mt-1 truncate">
                        {example.codes.length > 25 ? example.codes.substring(0, 25) + '...' : example.codes}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Format Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Format Guide</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-3">
                <div>
                  <strong>Decimal:</strong> 65, 66, 67 → ABC
                </div>
                <div>
                  <strong>Hexadecimal:</strong> 0x41, 0x42, 0x43 → ABC
                </div>
                <div>
                  <strong>Binary:</strong> 0b01000001, 0b01000010 → AB
                </div>
                <div>
                  <strong>Octal:</strong> 0o101, 0o102, 0o103 → ABC
                </div>
                <div className="text-xs text-gray-500 mt-3">
                  * Auto-detect works with mixed formats
                </div>
              </CardContent>
            </Card>

            {/* ASCII Reference */}
            <Card>
              <CardHeader>
                <CardTitle>ASCII Reference</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <div><strong>0-31:</strong> Control characters (non-printable)</div>
                <div><strong>32:</strong> Space character</div>
                <div><strong>33-47:</strong> Punctuation (!@#$%^&*)</div>
                <div><strong>48-57:</strong> Digits (0-9)</div>
                <div><strong>65-90:</strong> Uppercase letters (A-Z)</div>
                <div><strong>97-122:</strong> Lowercase letters (a-z)</div>
                <div><strong>123-127:</strong> Additional symbols</div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About This Tool</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  Convert ASCII numeric codes back to their corresponding text characters. 
                  Supports multiple input formats with intelligent error detection.
                </p>
                <p>
                  <strong>Error Handling:</strong> Invalid codes are reported with specific 
                  error messages and position information.
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