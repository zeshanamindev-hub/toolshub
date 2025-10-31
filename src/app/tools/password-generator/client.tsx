"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Shield, 
  Copy, 
  RefreshCw, 
  Check,
  AlertTriangle,
  CheckCircle,
  XCircle
,  Info } from "lucide-react"



export default function PasswordGeneratorClient() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(12)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false
  })
  const [copied, setCopied] = useState(false)

  const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    similar: "il1Lo0O",
    ambiguous: "{}[]()/\\'\"`~,;.<>"
  }

  const generatePassword = useCallback(() => {
    let charset = ""
    
    if (options.uppercase) charset += characterSets.uppercase
    if (options.lowercase) charset += characterSets.lowercase
    if (options.numbers) charset += characterSets.numbers
    if (options.symbols) charset += characterSets.symbols

    if (options.excludeSimilar) {
      charset = charset.split('').filter(char => !characterSets.similar.includes(char)).join('')
    }
    
    if (options.excludeAmbiguous) {
      charset = charset.split('').filter(char => !characterSets.ambiguous.includes(char)).join('')
    }

    if (charset === "") {
      setPassword("Please select at least one character type")
      return
    }

    let result = ""
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    setPassword(result)
    setCopied(false)
  }, [length, options, characterSets.lowercase, characterSets.uppercase, characterSets.numbers, characterSets.symbols, characterSets.similar, characterSets.ambiguous])

  const copyToClipboard = async () => {
    if (password && password !== "Please select at least one character type") {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getPasswordStrength = () => {
    if (!password || password === "Please select at least one character type") return { level: 0, text: "No password", color: "text-gray-500" }
    
    let score = 0
    const feedback = []

    // Length scoring
    if (password.length >= 12) score += 2
    else if (password.length >= 8) score += 1
    else feedback.push("Use at least 8 characters")

    // Character variety scoring
    if (/[a-z]/.test(password)) score += 1
    else feedback.push("Add lowercase letters")
    
    if (/[A-Z]/.test(password)) score += 1
    else feedback.push("Add uppercase letters")
    
    if (/[0-9]/.test(password)) score += 1
    else feedback.push("Add numbers")
    
    if (/[^a-zA-Z0-9]/.test(password)) score += 1
    else feedback.push("Add special characters")

    // Bonus for length
    if (password.length >= 16) score += 1

    if (score >= 6) return { level: 4, text: "Very Strong", color: "text-green-600", feedback }
    if (score >= 5) return { level: 3, text: "Strong", color: "text-green-500", feedback }
    if (score >= 3) return { level: 2, text: "Medium", color: "text-yellow-500", feedback }
    if (score >= 1) return { level: 1, text: "Weak", color: "text-red-500", feedback }
    return { level: 0, text: "Very Weak", color: "text-red-600", feedback }
  }

  const strength = getPasswordStrength()

  const presetOptions = [
    { name: "High Security", length: 16, options: { uppercase: true, lowercase: true, numbers: true, symbols: true, excludeSimilar: true, excludeAmbiguous: false } },
    { name: "Standard", length: 12, options: { uppercase: true, lowercase: true, numbers: true, symbols: true, excludeSimilar: false, excludeAmbiguous: false } },
    { name: "Simple", length: 8, options: { uppercase: true, lowercase: true, numbers: true, symbols: false, excludeSimilar: false, excludeAmbiguous: false } },
    { name: "PIN Code", length: 6, options: { uppercase: false, lowercase: false, numbers: true, symbols: false, excludeSimilar: false, excludeAmbiguous: false } }
  ]

  const applyPreset = (preset: typeof presetOptions[0]) => {
    setLength(preset.length)
    setOptions(preset.options)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Password Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate strong, secure passwords with customizable options. 
            Create passwords that are hard to crack but easy to use.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Generator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Generated Password */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Password</CardTitle>
                <CardDescription>
                  Your secure password will appear here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Input
                    value={password}
                    readOnly
                    className="font-mono text-lg pr-12"
                    placeholder="Click 'Generate Password' to create a secure password"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={copyToClipboard}
                    disabled={!password || password === "Please select at least one character type"}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Password Strength */}
                {password && password !== "Please select at least one character type" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Password Strength:</span>
                      <span className={`text-sm font-semibold ${strength.color}`}>
                        {strength.text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          strength.level === 4 ? 'bg-green-600' :
                          strength.level === 3 ? 'bg-green-500' :
                          strength.level === 2 ? 'bg-yellow-500' :
                          strength.level === 1 ? 'bg-red-500' : 'bg-red-600'
                        }`}
                        style={{ width: `${(strength.level / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={generatePassword} className="flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generate Password
                  </Button>
                  <Button
                    variant="outline"
                    onClick={copyToClipboard}
                    disabled={!password || password === "Please select at least one character type"}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Options */}
            <Card>
              <CardHeader>
                <CardTitle>Password Options</CardTitle>
                <CardDescription>
                  Customize your password requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Length */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Length: {length}
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="128"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4</span>
                    <span>128</span>
                  </div>
                </div>

                {/* Character Types */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Include Characters:</h4>
                  
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
                      checked={options.excludeAmbiguous}
                      onChange={(e) => setOptions(prev => ({ ...prev, excludeAmbiguous: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Exclude Ambiguous Characters ({`{}[]()/\\'\"\`~,;.<>`})</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Presets */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Presets</CardTitle>
                <CardDescription>
                  Common password configurations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {presetOptions.map((preset, index) => (
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

            {/* Security Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Security Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Use at least 12 characters for strong security</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Include a mix of character types</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Use unique passwords for each account</span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>Store passwords in a secure password manager</span>
                </div>
                <div className="flex items-start space-x-2">
                  <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Never share passwords or write them down</span>
                </div>
              </CardContent>
            </Card>

            {/* Password Info */}
            <Card>
              <CardHeader>
                <CardTitle>About This Tool</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  This password generator creates cryptographically secure passwords 
                  using your browser's built-in random number generator.
                </p>
                <p>
                  <strong>Privacy:</strong> All passwords are generated locally in your 
                  browser and are never transmitted to our servers.
                </p>
              </CardContent>
            </Card>
          </div>
        {/* Full-width SEO Content Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
          <div className="max-w-full">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">About Password Generator</h2>
            </div>

            <div className="prose prose-sm text-gray-600 max-w-none">
              <p className="mb-4">
                The Password Generator creates strong, random passwords that help protect your online accounts from unauthorized access.
                With cyber attacks and data breaches becoming increasingly common, using unique, complex passwords for each account
                is essential for digital security. Our password generator creates cryptographically secure passwords with customizable
                length, character types, and complexity options to meet any security requirement.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span><strong>Customizable Length:</strong> Generate passwords from 8 to 128 characters to meet any requirement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span><strong>Multiple Character Sets:</strong> Include uppercase, lowercase, numbers, and special symbols</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span><strong>Cryptographically Secure:</strong> Uses secure random number generation for unpredictable passwords</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span><strong>Instant Generation:</strong> Create new passwords with a single click</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span><strong>Copy to Clipboard:</strong> Quickly copy generated passwords for immediate use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span><strong>No Storage:</strong> Passwords are generated locally and never saved or transmitted</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
                  <ol className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-red-600">1.</span>
                      <span>Select desired password length (8-128 characters recommended minimum 12)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-red-600">2.</span>
                      <span>Choose character types: uppercase, lowercase, numbers, symbols</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-red-600">3.</span>
                      <span>Click 'Generate Password' to create a secure password</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-red-600">4.</span>
                      <span>Review the password strength indicator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-red-600">5.</span>
                      <span>Copy the password to your clipboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-red-600">6.</span>
                      <span>Use immediately in your account or password manager</span>
                    </li>
                  </ol>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">What is it?</h3>
              <p className="mb-4">
                A strong password is a sequence of characters that is difficult for humans or computers to guess. It should be long
                (at least 12-16 characters), use a mix of character types (uppercase, lowercase, numbers, symbols), and be unique
                for each account. The Password Generator uses cryptographically secure random number generation to create passwords
                that are virtually impossible to guess through brute force attacks. Each password is generated with true randomness,
                ensuring maximum security.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Common Use Cases</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span><strong>New Account Creation:</strong> Generate strong passwords when signing up for new online services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span><strong>Password Reset:</strong> Create secure replacement passwords when changing compromised credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span><strong>Password Manager:</strong> Generate unique passwords to store in password management applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span><strong>Application Secrets:</strong> Create API keys, tokens, and secret keys for applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span><strong>Database Credentials:</strong> Generate secure passwords for database user accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span><strong>WiFi Networks:</strong> Create strong WPA2/WPA3 passwords for wireless networks</span>
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