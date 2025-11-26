"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Copy,
  RotateCcw,
  Check,
  Download,
  AlertCircle,
  Binary,
  Hash,
  Search,
  ChevronRight,
  Upload,
  ArrowDownUp,
  Zap,
  Info
} from "lucide-react"
import Link from "next/link"
import { ALL_TOOLS } from "@/lib/constants"

type InputFormat = 'auto' | 'decimal' | 'hexadecimal' | 'binary' | 'octal'
type SeparatorType = 'auto' | 'space' | 'comma' | 'tab' | 'newline' | 'custom' | 'none'

interface ConversionResult {
  text: string
  errors: Array<{ message: string; position: number }>
  warnings: Array<{ message: string; position: number }>
  stats: {
    totalCodes: number
    converted: number
    failed: number
    controlChars: number
    extendedAscii: number
  }
}

export default function AsciiToTextClient() {
  const [inputCodes, setInputCodes] = useState("")
  const [inputFormat, setInputFormat] = useState<InputFormat>('auto')
  const [separator, setSeparator] = useState<SeparatorType>('auto')
  const [customSeparator, setCustomSeparator] = useState("")
  const [unicodeSupport, setUnicodeSupport] = useState(true)
  const [showControlChars, setShowControlChars] = useState(true)
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Get relevant tools (converters)
  const relevantTools = ALL_TOOLS.filter(tool =>
    tool.href.includes('ascii') ||
    tool.href.includes('text-to-ascii') ||
    tool.href.includes('base64') ||
    tool.href.includes('url-encoder') ||
    tool.href.includes('html-entities')
  ).slice(0, 5)

  // Get other tools (random selection)
  const otherTools = ALL_TOOLS.filter(tool =>
    !tool.href.includes('ascii')
  ).slice(0, 6)

  // Filter tools based on search
  const filteredRelevantTools = relevantTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const conversionResult = useMemo((): ConversionResult => {
    if (!inputCodes.trim()) {
      return {
        text: "",
        errors: [],
        warnings: [],
        stats: { totalCodes: 0, converted: 0, failed: 0, controlChars: 0, extendedAscii: 0 }
      }
    }

    const errors: Array<{ message: string; position: number }> = []
    const warnings: Array<{ message: string; position: number }> = []
    const stats = { totalCodes: 0, converted: 0, failed: 0, controlChars: 0, extendedAscii: 0 }
    const processedInput = inputCodes.trim()

    // Determine separator
    let actualSeparator = ' '
    if (separator === 'custom') {
      actualSeparator = customSeparator || ' '
    } else if (separator === 'auto') {
      // Auto-detect separator - prioritize comma, then space, then newline, then tab
      if (processedInput.includes(',')) actualSeparator = ','
      else if (processedInput.includes(' ')) actualSeparator = ' '
      else if (processedInput.includes('\n')) actualSeparator = '\n'
      else if (processedInput.includes('\t')) actualSeparator = '\t'
      else actualSeparator = ''
    } else if (separator === 'comma') actualSeparator = ','
    else if (separator === 'tab') actualSeparator = '\t'
    else if (separator === 'newline') actualSeparator = '\n'
    else if (separator === 'space') actualSeparator = ' '
    else actualSeparator = ''

    // Split input into individual codes
    let codes: string[] = []

    if (actualSeparator === '' || separator === 'none') {
      // Handle continuous strings based on format
      const singleCode = processedInput.replace(/\s+/g, '')

      if (inputFormat === 'binary' || (inputFormat === 'auto' && /^[01]+$/.test(singleCode))) {
        // Split binary into 8-bit chunks
        for (let i = 0; i < singleCode.length; i += 8) {
          const chunk = singleCode.substring(i, i + 8)
          if (chunk.length > 0) {
            // Only pad if it's the last chunk and less than 8 bits
            if (chunk.length < 8 && i + 8 >= singleCode.length) {
              codes.push(chunk.padStart(8, '0'))
            } else if (chunk.length === 8) {
              codes.push(chunk)
            }
          }
        }
      } else if (inputFormat === 'hexadecimal' || (inputFormat === 'auto' && /^[0-9A-Fa-f]+$/.test(singleCode))) {
        // Split hex into 2-character chunks
        for (let i = 0; i < singleCode.length; i += 2) {
          const chunk = singleCode.substring(i, i + 2)
          if (chunk.length > 0) {
            // Only pad if it's the last chunk and less than 2 chars
            if (chunk.length < 2 && i + 2 >= singleCode.length) {
              codes.push(chunk.padStart(2, '0'))
            } else if (chunk.length === 2) {
              codes.push(chunk)
            }
          }
        }
      } else if (inputFormat === 'octal' || (inputFormat === 'auto' && /^[0-7]+$/.test(singleCode))) {
        // Split octal into 3-character chunks
        for (let i = 0; i < singleCode.length; i += 3) {
          const chunk = singleCode.substring(i, i + 3)
          if (chunk.length > 0) {
            // Only pad if it's the last chunk and less than 3 chars
            if (chunk.length < 3 && i + 3 >= singleCode.length) {
              codes.push(chunk.padStart(3, '0'))
            } else if (chunk.length === 3) {
              codes.push(chunk)
            }
          }
        }
      } else {
        // Treat as space-separated if no clear pattern
        codes = processedInput.split(/\s+/).filter(code => code.trim() !== '')
      }
    } else {
      // Split by separator and clean up
      codes = processedInput.split(actualSeparator)
        .map(code => code.trim())
        .filter(code => code.length > 0)
    }

    stats.totalCodes = codes.length
    const convertedChars: string[] = []

    codes.forEach((code, index) => {
      const trimmedCode = code.trim()
      if (!trimmedCode) return

      let numericValue: number | null = null
      let detectedFormat = inputFormat

      // Auto-detect format if needed
      if (inputFormat === 'auto') {
        const cleanCode = trimmedCode.replace(/^(0x|0X|0b|0B|0o|0O)/, '')

        if (/^(0x|0X)[0-9A-Fa-f]+$/.test(trimmedCode)) {
          detectedFormat = 'hexadecimal'
        } else if (/^(0b|0B)[01]+$/.test(trimmedCode)) {
          detectedFormat = 'binary'
        } else if (/^(0o|0O)[0-7]+$/.test(trimmedCode)) {
          detectedFormat = 'octal'
        } else if (/^[01]{8}$/.test(cleanCode)) {
          detectedFormat = 'binary'
        } else if (/^[0-9A-Fa-f]{1,4}$/.test(cleanCode)) {
          detectedFormat = 'hexadecimal'
        } else if (/^[0-7]{1,3}$/.test(cleanCode) && parseInt(cleanCode, 8) <= 511) {
          detectedFormat = 'octal'
        } else if (/^\d+$/.test(cleanCode)) {
          detectedFormat = 'decimal'
        } else {
          errors.push({
            message: `Invalid format for code "${trimmedCode}"`,
            position: index + 1
          })
          stats.failed++
          return
        }
      }

      // Convert based on detected/specified format
      try {
        switch (detectedFormat) {
          case 'decimal': {
            if (!/^\d+$/.test(trimmedCode)) {
              errors.push({
                message: `Invalid decimal format: "${trimmedCode}"`,
                position: index + 1
              })
              stats.failed++
              return
            }
            numericValue = parseInt(trimmedCode, 10)
            break
          }

          case 'hexadecimal': {
            let hexCode = trimmedCode
            if (hexCode.startsWith('0x') || hexCode.startsWith('0X')) {
              hexCode = hexCode.slice(2)
            }
            if (!/^[0-9A-Fa-f]+$/.test(hexCode)) {
              errors.push({
                message: `Invalid hexadecimal format: "${trimmedCode}"`,
                position: index + 1
              })
              stats.failed++
              return
            }
            numericValue = parseInt(hexCode, 16)
            break
          }

          case 'binary': {
            let binCode = trimmedCode
            if (binCode.startsWith('0b') || binCode.startsWith('0B')) {
              binCode = binCode.slice(2)
            }
            if (!/^[01]+$/.test(binCode)) {
              errors.push({
                message: `Invalid binary format: "${trimmedCode}"`,
                position: index + 1
              })
              stats.failed++
              return
            }
            numericValue = parseInt(binCode, 2)
            break
          }

          case 'octal': {
            let octCode = trimmedCode
            if (octCode.startsWith('0o') || octCode.startsWith('0O')) {
              octCode = octCode.slice(2)
            }
            if (!/^[0-7]+$/.test(octCode)) {
              errors.push({
                message: `Invalid octal format: "${trimmedCode}"`,
                position: index + 1
              })
              stats.failed++
              return
            }
            numericValue = parseInt(octCode, 8)
            break
          }

          default:
            errors.push({
              message: `Unknown format for code "${trimmedCode}"`,
              position: index + 1
            })
            stats.failed++
            return
        }

        if (numericValue === null || isNaN(numericValue)) {
          errors.push({
            message: `Failed to parse code "${trimmedCode}"`,
            position: index + 1
          })
          stats.failed++
          return
        }

        // Validate range based on Unicode support
        const maxValue = unicodeSupport ? 0x10FFFF : 255
        if (numericValue < 0 || numericValue > maxValue) {
          errors.push({
            message: `Value ${numericValue} is outside valid range (0-${maxValue})`,
            position: index + 1
          })
          stats.failed++
          return
        }

        // Track extended ASCII
        if (numericValue > 127 && numericValue <= 255) {
          stats.extendedAscii++
        }

        // Convert to character
        const char = String.fromCodePoint(numericValue)

        // Check for control characters
        if (numericValue < 32 && numericValue !== 9 && numericValue !== 10 && numericValue !== 13) {
          stats.controlChars++
          if (showControlChars) {
            convertedChars.push(`[${numericValue}]`)
          } else {
            convertedChars.push(char)
          }
        } else {
          convertedChars.push(char)
        }

        stats.converted++

      } catch (error) {
        errors.push({
          message: `Error processing code "${trimmedCode}": ${error instanceof Error ? error.message : 'Unknown error'}`,
          position: index + 1
        })
        stats.failed++
      }
    })

    return {
      text: convertedChars.join(''),
      errors,
      warnings,
      stats
    }
  }, [inputCodes, inputFormat, separator, customSeparator, unicodeSupport, showControlChars])

  const copyToClipboard = async () => {
    if (conversionResult.text) {
      await navigator.clipboard.writeText(conversionResult.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadResult = () => {
    const content = `ASCII to Text Conversion Result
${'='.repeat(50)}

Input Format: ${inputFormat === 'auto' ? 'Auto-detected' : inputFormat}
Separator: ${separator === 'auto' ? 'Auto-detected' : separator}
Unicode Support: ${unicodeSupport ? 'Enabled' : 'Disabled'}

Original ASCII Codes:
${inputCodes}

Converted Text:
${conversionResult.text}

Statistics:
- Total codes: ${conversionResult.stats.totalCodes}
- Successfully converted: ${conversionResult.stats.converted}
- Failed: ${conversionResult.stats.failed}
- Control characters: ${conversionResult.stats.controlChars}
- Extended ASCII: ${conversionResult.stats.extendedAscii}

${conversionResult.errors.length > 0 ? `Errors (${conversionResult.errors.length}):
${conversionResult.errors.map((e, i) => `${i + 1}. Position ${e.position}: ${e.message}`).join('\n')}` : 'No errors'}

Generated by Tools Hub - ${new Date().toLocaleString()}
`

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ascii-to-text-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInputCodes("")
    setInputFormat('auto')
    setSeparator('auto')
  }

  const loadFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        setInputCodes(text)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
      {/* Hero Section */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-4">
              <Binary className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-bold text-gray-700">ASCII Decoder</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              ASCII to Text Converter
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Convert ASCII codes to readable text with intelligent auto-detection and Unicode support
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Search */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm font-bold text-gray-900">Search Tools</h3>
                </div>
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-gray-200 rounded-xl"
                />
              </div>

              {/* ASCII Range */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Hash className="h-4 w-4 text-green-600" />
                  <h3 className="text-sm font-bold text-gray-900">ASCII Range</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="font-bold text-gray-700">0-31</span>
                    <span className="text-gray-500">Control</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="font-bold text-gray-700">32-47</span>
                    <span className="text-gray-500">Symbols</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="font-bold text-gray-700">48-57</span>
                    <span className="text-gray-500">Digits 0-9</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="font-bold text-gray-700">65-90</span>
                    <span className="text-gray-500">A-Z</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="font-bold text-gray-700">97-122</span>
                    <span className="text-gray-500">a-z</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="font-bold text-gray-700">128-255</span>
                    <span className="text-gray-500">Extended</span>
                  </div>
                </div>
              </div>

              {/* Relevant Tools */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <h3 className="text-sm font-bold text-gray-900">Relevant Tools</h3>
                </div>
                <div className="space-y-1">
                  {(searchQuery ? filteredRelevantTools : relevantTools).map((tool, index) => (
                    <Link
                      key={index}
                      href={tool.href}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600" />
                      <span className="text-xs text-gray-700 group-hover:text-blue-600 font-medium">
                        {tool.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Tools */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-orange-600" />
                  <h3 className="text-sm font-bold text-gray-900">Other Tools</h3>
                </div>
                <div className="space-y-1">
                  {otherTools.map((tool, index) => (
                    <Link
                      key={index}
                      href={tool.href}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-orange-600" />
                      <span className="text-xs text-gray-700 group-hover:text-orange-600 font-medium">
                        {tool.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Settings Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-base font-bold text-gray-900 mb-4">Conversion Settings</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Input Format */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Input Format
                    </label>
                    <select
                      value={inputFormat}
                      onChange={(e) => setInputFormat(e.target.value as InputFormat)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    >
                      <option value="auto">Auto-detect</option>
                      <option value="decimal">Decimal (65, 66, 67)</option>
                      <option value="hexadecimal">Hexadecimal (0x41, 0x42)</option>
                      <option value="binary">Binary (01000001)</option>
                      <option value="octal">Octal (0o101, 0o102)</option>
                    </select>
                  </div>

                  {/* Separator */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Separator
                    </label>
                    <select
                      value={separator}
                      onChange={(e) => setSeparator(e.target.value as SeparatorType)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    >
                      <option value="auto">Auto-detect</option>
                      <option value="space">Space</option>
                      <option value="comma">Comma (,)</option>
                      <option value="tab">Tab</option>
                      <option value="newline">New Line</option>
                      <option value="custom">Custom</option>
                      <option value="none">None (continuous)</option>
                    </select>
                  </div>
                </div>

                {/* Custom Separator Input */}
                {separator === 'custom' && (
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Custom Separator
                    </label>
                    <Input
                      type="text"
                      value={customSeparator}
                      onChange={(e) => setCustomSeparator(e.target.value)}
                      placeholder="Enter custom separator (e.g., |, -, etc.)"
                      className="border-gray-300 rounded-lg"
                    />
                  </div>
                )}

                {/* Advanced Options */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={unicodeSupport}
                      onChange={(e) => setUnicodeSupport(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-bold text-gray-900">Unicode Support</span>
                      <p className="text-xs text-gray-500">Support values beyond ASCII (0-1114111)</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showControlChars}
                      onChange={(e) => setShowControlChars(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-bold text-gray-900">Show Control Characters</span>
                      <p className="text-xs text-gray-500">Display control chars as [code]</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Input and Output in Parallel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">ASCII Codes Input</h3>
                      <p className="text-sm text-gray-600">Enter codes in your chosen format</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="rounded-lg border-gray-300"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".txt"
                        onChange={loadFromFile}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAll}
                        disabled={!inputCodes}
                        className="rounded-lg border-gray-300"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                  </div>

                  <Textarea
                    value={inputCodes}
                    onChange={(e) => setInputCodes(e.target.value)}
                    placeholder="Enter ASCII codes here... (e.g., 72 101 108 108 111 or 0x48 0x65 0x6C 0x6C 0x6F)"
                    className="min-h-[300px] resize-none font-mono text-sm border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />

                  <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                    <span>{inputCodes.length} characters</span>
                    {conversionResult.stats.totalCodes > 0 && (
                      <span className="text-blue-600 font-bold">
                        {conversionResult.stats.totalCodes} codes detected
                      </span>
                    )}
                  </div>
                </div>

                {/* Output Card */}
                <div className="bg-white rounded-2xl p-6 border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Converted Text</h3>
                      <p className="text-sm text-gray-600">Your readable text output</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        disabled={!conversionResult.text}
                        className="rounded-lg border-gray-300"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadResult}
                        className="rounded-lg border-gray-300"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <Textarea
                    value={conversionResult.text}
                    readOnly
                    className="min-h-[300px] resize-none font-mono text-base bg-blue-50/50 border-blue-200 rounded-lg"
                    placeholder="Converted text will appear here..."
                  />

                  <div className="mt-3 text-sm text-gray-600">
                    <span>{conversionResult.text.length} characters</span>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              {conversionResult.stats.totalCodes > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Conversion Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { label: "Total", value: conversionResult.stats.totalCodes, color: "blue" },
                      { label: "Converted", value: conversionResult.stats.converted, color: "green" },
                      { label: "Failed", value: conversionResult.stats.failed, color: "red" },
                      { label: "Control", value: conversionResult.stats.controlChars, color: "yellow" },
                      { label: "Extended", value: conversionResult.stats.extendedAscii, color: "purple" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                        <div className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                        <div className="text-xs font-bold text-gray-600 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Errors */}
              {conversionResult.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="font-bold text-red-900 text-sm">Errors ({conversionResult.errors.length})</span>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {conversionResult.errors.map((error, index) => (
                      <div key={index} className="text-xs text-red-800 flex items-start gap-2">
                        <span className="font-bold text-red-600">#{error.position}</span>
                        <span>{error.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Full-width About Section */}
          <div className="mt-8 bg-white rounded-2xl p-8 border border-gray-200">
            <div className="max-w-full">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">About ASCII to Text Converter</h2>
              </div>

              <div className="prose prose-sm text-gray-600 max-w-none">
                <p className="mb-4">
                  The ASCII to Text Converter is a powerful online tool that transforms numeric ASCII codes into readable text characters.
                  Whether you're working with decimal, hexadecimal, binary, or octal formats, our converter handles them all with intelligent
                  auto-detection and comprehensive error handling.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span><strong>Multiple Format Support:</strong> Decimal, hexadecimal, binary, and octal input formats</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span><strong>Auto-Detection:</strong> Automatically identifies the input format for seamless conversion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span><strong>Unicode Support:</strong> Convert codes beyond standard ASCII (up to U+10FFFF)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span><strong>Flexible Separators:</strong> Space, comma, tab, newline, custom, or continuous input</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span><strong>Error Handling:</strong> Detailed error messages with position tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span><strong>Control Character Display:</strong> Option to show control characters as readable codes</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
                    <ol className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-600">1.</span>
                        <span>Select your input format (or use auto-detect)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-600">2.</span>
                        <span>Choose the separator type that matches your input</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-600">3.</span>
                        <span>Paste or type your ASCII codes in the input field</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-600">4.</span>
                        <span>View the converted text instantly in the output area</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-600">5.</span>
                        <span>Copy or download your results</span>
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Format Examples</h3>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong className="text-gray-900">Decimal:</strong>
                      <code className="block bg-white px-2 py-1 rounded mt-1 font-mono">72 101 108 108 111</code>
                      <span className="text-gray-600">→ "Hello"</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Hexadecimal:</strong>
                      <code className="block bg-white px-2 py-1 rounded mt-1 font-mono">0x48 0x69</code>
                      <span className="text-gray-600">→ "Hi"</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Binary:</strong>
                      <code className="block bg-white px-2 py-1 rounded mt-1 font-mono">01001000 01101001</code>
                      <span className="text-gray-600">→ "Hi"</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Octal:</strong>
                      <code className="block bg-white px-2 py-1 rounded mt-1 font-mono">0o110 0o151</code>
                      <span className="text-gray-600">→ "Hi"</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">What is ASCII?</h3>
                <p className="mb-4">
                  ASCII (American Standard Code for Information Interchange) is a character encoding standard that assigns numeric codes
                  to letters, numbers, punctuation marks, and control characters. The standard ASCII table includes 128 characters (0-127),
                  while extended ASCII includes 256 characters (0-255). Our tool also supports Unicode, allowing you to work with over
                  1 million characters from various writing systems worldwide.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">Common Use Cases</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Debugging programs that output ASCII codes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Converting network protocol data to readable text</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Educational purposes for learning character encoding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Data recovery and forensics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Working with binary file formats and hex dumps</span>
                  </li>
                </ul>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy &amp; Security</h3>
                  <p>
                    All conversions happen directly in your browser. Your data never leaves your device and is not sent to any server.
                    This ensures complete privacy and security for all your conversions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
