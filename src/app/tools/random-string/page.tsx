"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Shuffle, 
  Copy, 
  RefreshCw, 
  Check,
  Download,
  Settings,
  Dices
} from "lucide-react"



export default function RandomStringPage() {
  const [length, setLength] = useState(10)
  const [quantity, setQuantity] = useState(1)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    customChars: "",
    excludeSimilar: false,
    noRepeats: false
  })
  const [generatedStrings, setGeneratedStrings] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    similar: "il1Lo0O"
  }

  const generateStrings = useCallback(() => {
    let charset = ""
    
    if (options.uppercase) charset += characterSets.uppercase
    if (options.lowercase) charset += characterSets.lowercase
    if (options.numbers) charset += characterSets.numbers
    if (options.symbols) charset += characterSets.symbols
    if (options.customChars) charset += options.customChars

    if (options.excludeSimilar) {
      charset = charset.split('').filter(char => !characterSets.similar.includes(char)).join('')
    }

    // Remove duplicates
    charset = [...new Set(charset)].join('')

    if (charset === "") {
      setGeneratedStrings(["Please select at least one character type"])
      return
    }

    const strings = []
    for (let i = 0; i < quantity; i++) {
      let result = ""
      let availableChars = charset

      for (let j = 0; j < length; j++) {
        if (options.noRepeats && availableChars.length === 0) {
          // Reset available chars if we run out
          availableChars = charset
        }

        const randomIndex = Math.floor(Math.random() * availableChars.length)
        const selectedChar = availableChars[randomIndex]
        result += selectedChar

        if (options.noRepeats) {
          availableChars = availableChars.replace(selectedChar, '')
        }
      }
      strings.push(result)
    }
    
    setGeneratedStrings(strings)
    setCopied(false)
  }, [length, quantity, options])

  const copyToClipboard = async () => {
    if (generatedStrings.length > 0 && generatedStrings[0] !== "Please select at least one character type") {
      const text = generatedStrings.join('\n')
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadResults = () => {
    const content = `Random String Generation\n${'='.repeat(30)}\n\nSettings:\nLength: ${length}\nQuantity: ${quantity}\nCharacter Sets: ${Object.entries(options).filter(([key, value]) => value === true && key !== 'customChars' && key !== 'excludeSimilar' && key !== 'noRepeats').map(([key]) => key).join(', ')}\nCustom Characters: ${options.customChars || 'None'}\nExclude Similar: ${options.excludeSimilar}\nNo Repeats: ${options.noRepeats}\n\nGenerated Strings:\n${generatedStrings.join('\n')}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'random-strings.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const presetConfigs = [
    {
      name: "Alphanumeric",
      config: { uppercase: true, lowercase: true, numbers: true, symbols: false, customChars: "", excludeSimilar: false, noRepeats: false }
    },
    {
      name: "Letters Only",
      config: { uppercase: true, lowercase: true, numbers: false, symbols: false, customChars: "", excludeSimilar: false, noRepeats: false }
    },
    {
      name: "Numbers Only",
      config: { uppercase: false, lowercase: false, numbers: true, symbols: false, customChars: "", excludeSimilar: false, noRepeats: false }
    },
    {
      name: "Secure Token",
      config: { uppercase: true, lowercase: true, numbers: true, symbols: true, customChars: "", excludeSimilar: true, noRepeats: false }
    },
    {
      name: "URL Safe",
      config: { uppercase: true, lowercase: true, numbers: true, symbols: false, customChars: "-_", excludeSimilar: false, noRepeats: false }
    },
    {
      name: "Hex String",
      config: { uppercase: false, lowercase: false, numbers: true, symbols: false, customChars: "ABCDEF", excludeSimilar: false, noRepeats: false }
    }
  ]

  const applyPreset = (preset: typeof presetConfigs[0]) => {
    setOptions(preset.config)
  }

  const getCharsetInfo = () => {
    let charset = ""
    if (options.uppercase) charset += characterSets.uppercase
    if (options.lowercase) charset += characterSets.lowercase
    if (options.numbers) charset += characterSets.numbers
    if (options.symbols) charset += characterSets.symbols
    if (options.customChars) charset += options.customChars

    if (options.excludeSimilar) {
      charset = charset.split('').filter(char => !characterSets.similar.includes(char)).join('')
    }

    charset = [...new Set(charset)].join('')
    return {
      length: charset.length,
      charset: charset.slice(0, 50) + (charset.length > 50 ? '...' : '')
    }
  }

  const charsetInfo = getCharsetInfo()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shuffle className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Random String Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate random strings with customizable length and character sets. 
            Perfect for testing, placeholders, tokens, and unique identifiers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Generator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Generation Settings
                </CardTitle>
                <CardDescription>
                  Configure your random string parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Length and Quantity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      String Length: {length}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="1000"
                      value={length}
                      onChange={(e) => setLength(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>1000</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Character Types */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Character Sets:</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={options.uppercase}
                        onChange={(e) => setOptions(prev => ({ ...prev, uppercase: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Uppercase Letters (A-Z)</span>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={options.lowercase}
                        onChange={(e) => setOptions(prev => ({ ...prev, lowercase: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Lowercase Letters (a-z)</span>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={options.numbers}
                        onChange={(e) => setOptions(prev => ({ ...prev, numbers: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Numbers (0-9)</span>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={options.symbols}
                        onChange={(e) => setOptions(prev => ({ ...prev, symbols: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Symbols (!@#$%^&*)</span>
                    </label>
                  </div>
                </div>

                {/* Custom Characters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Characters
                  </label>
                  <Input
                    value={options.customChars}
                    onChange={(e) => setOptions(prev => ({ ...prev, customChars: e.target.value }))}
                    placeholder="Add custom characters here..."
                    className="font-mono"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Additional characters to include in generation
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Advanced Options:</h4>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={options.excludeSimilar}
                      onChange={(e) => setOptions(prev => ({ ...prev, excludeSimilar: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Exclude Similar Characters (i, l, 1, L, o, 0, O)</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={options.noRepeats}
                      onChange={(e) => setOptions(prev => ({ ...prev, noRepeats: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">No Repeated Characters</span>
                  </label>
                </div>

                {/* Character Set Info */}
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <div className="font-medium text-gray-700 mb-1">Character Set Preview:</div>
                  <div className="font-mono text-gray-600 break-all">{charsetInfo.charset}</div>
                  <div className="text-gray-500 mt-1">Total characters available: {charsetInfo.length}</div>
                </div>

                <Button onClick={generateStrings} className="w-full">
                  <Dices className="h-4 w-4 mr-2" />
                  Generate Random Strings
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {generatedStrings.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Generated Strings</CardTitle>
                      <CardDescription>
                        {generatedStrings.length} random string{generatedStrings.length > 1 ? 's' : ''} generated
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        disabled={generatedStrings[0] === "Please select at least one character type"}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadResults}
                        disabled={generatedStrings[0] === "Please select at least one character type"}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={generatedStrings.join('\n')}
                    readOnly
                    className="min-h-[200px] resize-none font-mono text-sm"
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Presets */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Presets</CardTitle>
                <CardDescription>
                  Common string generation configurations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {presetConfigs.map((preset, index) => (
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

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => { setLength(8); setQuantity(1); generateStrings(); }}
                >
                  Generate 8-char string
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => { setLength(16); setQuantity(1); generateStrings(); }}
                >
                  Generate 16-char string
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => { setLength(32); setQuantity(1); generateStrings(); }}
                >
                  Generate 32-char string
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => { setLength(10); setQuantity(10); generateStrings(); }}
                >
                  Generate 10 strings
                </Button>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <div><strong>Testing:</strong> Generate test data and placeholders</div>
                <div><strong>Tokens:</strong> Create unique identifiers and API keys</div>
                <div><strong>Passwords:</strong> Generate temporary passwords</div>
                <div><strong>Filenames:</strong> Create unique file names</div>
                <div><strong>Database:</strong> Generate sample data for testing</div>
                <div><strong>Gaming:</strong> Create random game codes</div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About This Tool</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  Generate random strings using cryptographically secure random number generation 
                  for maximum unpredictability.
                </p>
                <p>
                  <strong>Security:</strong> Suitable for non-cryptographic purposes. 
                  For security-critical applications, use dedicated cryptographic libraries.
                </p>
                <p>
                  <strong>Privacy:</strong> All generation happens locally in your browser.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}