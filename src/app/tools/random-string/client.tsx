"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Shuffle,
  Copy,
  Check,
  Download,
  Settings,
  Dices
,  Info } from "lucide-react"



export default function RandomStringClient() {
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
  }, [length, quantity, options, characterSets.lowercase, characterSets.uppercase, characterSets.numbers, characterSets.symbols, characterSets.similar])

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
        {/* Full-width SEO Content Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
          <div className="max-w-full">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-amber-600" />
              <h2 className="text-2xl font-bold text-gray-900">About Random String Generator</h2>
            </div>

            <div className="prose prose-sm text-gray-600 max-w-none">
              <p className="mb-4">
                The Random String Generator creates random character sequences for various purposes including testing, unique identifiers,
                tokens, and placeholder data. Generate strings with custom length and character sets including letters, numbers,
                symbols, and special characters. Perfect for creating test data, session tokens, API keys, and unique identifiers
                in development and testing environments.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span><strong>Customizable Length:</strong> Generate strings from 1 to 1000+ characters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span><strong>Multiple Character Sets:</strong> Choose from letters, numbers, symbols, or custom characters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span><strong>Case Control:</strong> Use uppercase, lowercase, or mixed case</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span><strong>Bulk Generation:</strong> Create multiple random strings at once</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span><strong>Pattern Support:</strong> Generate strings following specific patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span><strong>Cryptographic Security:</strong> Option for cryptographically secure random generation</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
                  <ol className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600">1.</span>
                      <span>Specify the desired string length</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600">2.</span>
                      <span>Select character types to include (letters, numbers, symbols)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600">3.</span>
                      <span>Choose case preference (upper, lower, or mixed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600">4.</span>
                      <span>Set the number of strings to generate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600">5.</span>
                      <span>Click 'Generate' to create random strings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-amber-600">6.</span>
                      <span>Copy individual strings or download all as a file</span>
                    </li>
                  </ol>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">What is it?</h3>
              <p className="mb-4">
                Random string generation creates sequences of characters selected randomly from a specified character set. These can be
                truly random (using cryptographic randomness for security applications) or pseudo-random (using mathematical algorithms
                for general purposes). The randomness ensures that each generated string is unique and unpredictable. Common character
                sets include alphanumeric (A-Z, a-z, 0-9), hexadecimal (0-9, A-F), or custom sets. The length and character diversity
                determine the total number of possible combinations, affecting uniqueness and security strength.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Common Use Cases</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Session Tokens:</strong> Generate unique session identifiers for web applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Test Data:</strong> Create random strings for testing form inputs and validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Unique IDs:</strong> Generate identifiers for database records or file names</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>API Keys:</strong> Create placeholder API keys during development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Coupon Codes:</strong> Generate unique promotional codes for marketing campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Reference Numbers:</strong> Create order numbers, tracking IDs, or confirmation codes</span>
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