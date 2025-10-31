"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Code, 
  Copy, 
  RotateCcw, 
  Check,
  ArrowRight,
  ArrowLeft,
  Download,
  BookOpen
,  Info } from "lucide-react"



export default function HtmlEntitiesClient() {
  const [inputText, setInputText] = useState("")
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [encodingType, setEncodingType] = useState<'named' | 'numeric' | 'hex'>('named')
  const [copied, setCopied] = useState(false)

  // Common HTML entities mapping
  const htmlEntities = useMemo<{ [key: string]: string }>(() => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    ' ': '&nbsp;',
    '¡': '&iexcl;',
    '¢': '&cent;',
    '£': '&pound;',
    '¤': '&curren;',
    '¥': '&yen;',
    '¦': '&brvbar;',
    '§': '&sect;',
    '¨': '&uml;',
    '©': '&copy;',
    'ª': '&ordf;',
    '«': '&laquo;',
    '¬': '&not;',
    '®': '&reg;',
    '¯': '&macr;',
    '°': '&deg;',
    '±': '&plusmn;',
    '²': '&sup2;',
    '³': '&sup3;',
    '´': '&acute;',
    'µ': '&micro;',
    '¶': '&para;',
    '·': '&middot;',
    '¸': '&cedil;',
    '¹': '&sup1;',
    'º': '&ordm;',
    '»': '&raquo;',
    '¼': '&frac14;',
    '½': '&frac12;',
    '¾': '&frac34;',
    '¿': '&iquest;',
    'À': '&Agrave;',
    'Á': '&Aacute;',
    'Â': '&Acirc;',
    'Ã': '&Atilde;',
    'Ä': '&Auml;',
    'Å': '&Aring;',
    'Æ': '&AElig;',
    'Ç': '&Ccedil;',
    'È': '&Egrave;',
    'É': '&Eacute;',
    'Ê': '&Ecirc;',
    'Ë': '&Euml;',
    'Ì': '&Igrave;',
    'Í': '&Iacute;',
    'Î': '&Icirc;',
    'Ï': '&Iuml;',
    'Ð': '&ETH;',
    'Ñ': '&Ntilde;',
    'Ò': '&Ograve;',
    'Ó': '&Oacute;',
    'Ô': '&Ocirc;',
    'Õ': '&Otilde;',
    'Ö': '&Ouml;',
    '×': '&times;',
    'Ø': '&Oslash;',
    'Ù': '&Ugrave;',
    'Ú': '&Uacute;',
    'Û': '&Ucirc;',
    'Ü': '&Uuml;',
    'Ý': '&Yacute;',
    'Þ': '&THORN;',
    'ß': '&szlig;',
    'à': '&agrave;',
    'á': '&aacute;',
    'â': '&acirc;',
    'ã': '&atilde;',
    'ä': '&auml;',
    'å': '&aring;',
    'æ': '&aelig;',
    'ç': '&ccedil;',
    'è': '&egrave;',
    'é': '&eacute;',
    'ê': '&ecirc;',
    'ë': '&euml;',
    'ì': '&igrave;',
    'í': '&iacute;',
    'î': '&icirc;',
    'ï': '&iuml;',
    'ð': '&eth;',
    'ñ': '&ntilde;',
    'ò': '&ograve;',
    'ó': '&oacute;',
    'ô': '&ocirc;',
    'õ': '&otilde;',
    'ö': '&ouml;',
    '÷': '&divide;',
    'ø': '&oslash;',
    'ù': '&ugrave;',
    'ú': '&uacute;',
    'û': '&ucirc;',
    'ü': '&uuml;',
    'ý': '&yacute;',
    'þ': '&thorn;',
    'ÿ': '&yuml;'
  }), [])

  // Reverse mapping for decoding
  const reverseEntities = useMemo(() => {
    const reverse: { [key: string]: string } = {}
    Object.entries(htmlEntities).forEach(([char, entity]) => {
      reverse[entity] = char
    })
    return reverse
  }, [htmlEntities])

  const processedText = useMemo(() => {
    if (!inputText) return ""

    if (mode === 'encode') {
      let result = inputText
      
      switch (encodingType) {
        case 'named':
          // Use named entities where available, numeric for others
          result = inputText.replace(/[&<>"']/g, (match) => htmlEntities[match] || match)
          // For other characters, use numeric entities if they have high char codes
          result = result.replace(/[\u0080-\uFFFF]/g, (match) => {
            const namedEntity = htmlEntities[match]
            if (namedEntity) return namedEntity
            return `&#${match.charCodeAt(0)};`
          })
          break
          
        case 'numeric':
          // Convert all special characters to numeric entities
          result = inputText.replace(/[&<>"'\u0080-\uFFFF]/g, (match) => {
            return `&#${match.charCodeAt(0)};`
          })
          break
          
        case 'hex':
          // Convert all special characters to hexadecimal entities
          result = inputText.replace(/[&<>"'\u0080-\uFFFF]/g, (match) => {
            return `&#x${match.charCodeAt(0).toString(16).toUpperCase()};`
          })
          break
      }
      
      return result
    } else {
      // Decode mode
      let result = inputText
      
      // Decode named entities
      Object.entries(reverseEntities).forEach(([entity, char]) => {
        result = result.replace(new RegExp(entity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), char)
      })
      
      // Decode numeric entities (decimal)
      result = result.replace(/&#(\d+);/g, (match, num) => {
        return String.fromCharCode(parseInt(num, 10))
      })
      
      // Decode hexadecimal entities
      result = result.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
        return String.fromCharCode(parseInt(hex, 16))
      })
      
      return result
    }
  }, [inputText, mode, encodingType, reverseEntities, htmlEntities])

  const copyToClipboard = async () => {
    if (processedText) {
      await navigator.clipboard.writeText(processedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadResult = () => {
    const content = `HTML Entities ${mode === 'encode' ? 'Encoding' : 'Decoding'}\n${'='.repeat(40)}\n\nMode: ${mode.charAt(0).toUpperCase() + mode.slice(1)}\nEncoding Type: ${encodingType.charAt(0).toUpperCase() + encodingType.slice(1)}\n\nOriginal Text:\n${inputText}\n\nProcessed Text:\n${processedText}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `html-entities-${mode}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearText = () => {
    setInputText("")
  }

  const swapTexts = () => {
    setInputText(processedText)
    setMode(mode === 'encode' ? 'decode' : 'encode')
  }

  const commonExamples = [
    { name: "Basic HTML", text: '<div class="example">Hello & welcome!</div>' },
    { name: "Quotes", text: 'He said "Hello" and she replied \'Hi!\'' },
    { name: "Special Characters", text: "© 2024 Company™ - All rights reserved ®" },
    { name: "Accented Text", text: "Café, naïve, résumé, piñata" },
    { name: "Math Symbols", text: "2 × 3 = 6, 10 ÷ 2 = 5, ½ + ¼ = ¾" },
    { name: "Currency", text: "Price: $100, €85, £75, ¥500" }
  ]

  const commonEntities = [
    { char: '&', entity: '&amp;', desc: 'Ampersand' },
    { char: '<', entity: '&lt;', desc: 'Less than' },
    { char: '>', entity: '&gt;', desc: 'Greater than' },
    { char: '"', entity: '&quot;', desc: 'Double quote' },
    { char: "'", entity: '&#39;', desc: 'Single quote' },
    { char: ' ', entity: '&nbsp;', desc: 'Non-breaking space' },
    { char: '©', entity: '&copy;', desc: 'Copyright' },
    { char: '®', entity: '&reg;', desc: 'Registered trademark' },
    { char: '™', entity: '&trade;', desc: 'Trademark' },
    { char: '€', entity: '&euro;', desc: 'Euro sign' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Code className="h-12 w-12 text-orange-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            HTML Entities Encoder/Decoder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encode and decode HTML entities. Convert special characters to HTML entities 
            and vice versa for safe HTML display and processing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Converter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mode Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Conversion Mode</CardTitle>
                <CardDescription>
                  Choose whether to encode or decode HTML entities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="mode"
                      value="encode"
                      checked={mode === 'encode'}
                      onChange={(e) => setMode(e.target.value as 'encode' | 'decode')}
                      className="text-orange-600"
                    />
                    <span>Encode (Text → HTML Entities)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="mode"
                      value="decode"
                      checked={mode === 'decode'}
                      onChange={(e) => setMode(e.target.value as 'encode' | 'decode')}
                      className="text-orange-600"
                    />
                    <span>Decode (HTML Entities → Text)</span>
                  </label>
                </div>

                {mode === 'encode' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Encoding Type
                    </label>
                    <select
                      value={encodingType}
                      onChange={(e) => setEncodingType(e.target.value as 'named' | 'numeric' | 'hex')}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="named">Named Entities (&amp;, &lt;, &gt;)</option>
                      <option value="numeric">Numeric Entities (&#38;, &#60;, &#62;)</option>
                      <option value="hex">Hexadecimal Entities (&#x26;, &#x3C;, &#x3E;)</option>
                    </select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {mode === 'encode' ? 'Text to Encode' : 'HTML Entities to Decode'}
                </CardTitle>
                <CardDescription>
                  {mode === 'encode' 
                    ? 'Enter text with special characters to convert to HTML entities'
                    : 'Enter HTML entities to convert back to readable text'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={mode === 'encode' 
                    ? 'Enter text with special characters like <, >, &, ", etc.'
                    : 'Enter HTML entities like &lt;, &gt;, &amp;, &quot;, etc.'
                  }
                  className="min-h-[150px] resize-none font-mono text-sm"
                />
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Characters: {inputText.length}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={swapTexts}
                      disabled={!processedText}
                    >
                      {mode === 'encode' ? <ArrowLeft className="h-4 w-4 mr-2" /> : <ArrowRight className="h-4 w-4 mr-2" />}
                      Swap & Switch Mode
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearText}
                      disabled={!inputText}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            {inputText && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        {mode === 'encode' ? 'Encoded HTML Entities' : 'Decoded Text'}
                      </CardTitle>
                      <CardDescription>
                        {mode === 'encode' ? 'Safe HTML representation' : 'Human-readable text'}
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
                    value={processedText}
                    readOnly
                    className="min-h-[150px] resize-none font-mono text-sm bg-gray-50"
                  />
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
                  Click to load common examples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {commonExamples.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => setInputText(example.text)}
                  >
                    <div>
                      <div className="font-medium text-sm">{example.name}</div>
                      <div className="text-xs text-gray-500 font-mono truncate">
                        {example.text.length > 30 ? example.text.substring(0, 30) + '...' : example.text}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Common Entities Reference */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Common HTML Entities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {commonEntities.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold w-6 text-center">
                          {item.char === ' ' ? '␣' : item.char}
                        </span>
                        <span className="text-gray-600 text-xs">{item.desc}</span>
                      </div>
                      <span className="font-mono text-xs text-blue-600">{item.entity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Usage Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <div><strong>Encoding:</strong> Use when displaying user content in HTML to prevent XSS attacks</div>
                <div><strong>Decoding:</strong> Use when processing HTML content to get readable text</div>
                <div><strong>Named Entities:</strong> More readable but limited character set</div>
                <div><strong>Numeric Entities:</strong> Support all Unicode characters</div>
                <div><strong>Hex Entities:</strong> Compact representation for Unicode</div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About This Tool</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  HTML entities are used to display reserved characters in HTML and 
                  to represent characters that are not easily typed on a keyboard.
                </p>
                <p>
                  <strong>Security:</strong> Always encode user input before displaying 
                  in HTML to prevent XSS attacks.
                </p>
                <p>
                  <strong>Privacy:</strong> All processing happens locally in your browser.
                </p>
              </CardContent>
            </Card>
          </div>
        {/* Full-width SEO Content Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
          <div className="max-w-full">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">About HTML Entities Encoder/Decoder</h2>
            </div>

            <div className="prose prose-sm text-gray-600 max-w-none">
              <p className="mb-4">
                The HTML Entities Encoder/Decoder is an essential web development tool that converts special characters and symbols into
                their corresponding HTML entity representations and vice versa. HTML entities are used to display reserved characters
                in HTML (like &lt;, &gt;, &amp;) and to represent characters that aren&apos;t easily typed on a keyboard (like ©, ®, €). This tool
                ensures your HTML content displays correctly across all browsers while preventing security vulnerabilities like XSS attacks.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Bidirectional Conversion:</strong> Seamlessly encode text to HTML entities or decode entities back to characters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Multiple Entity Formats:</strong> Support for named entities (&amp;copy;), decimal (&#169;), and hexadecimal (&#xA9;)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>XSS Prevention:</strong> Encode user input to prevent cross-site scripting vulnerabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Real-time Processing:</strong> Instant conversion as you type with no delays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Copy & Download:</strong> Easy copying and downloading of converted results</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
                  <ol className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-orange-600">1.</span>
                      <span>Select 'Encode' to convert characters to entities, or 'Decode' for the reverse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-orange-600">2.</span>
                      <span>Paste or type your HTML text into the input field</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-orange-600">3.</span>
                      <span>View the converted result instantly in the output area</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-orange-600">4.</span>
                      <span>Review the entity mappings in the reference table</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-orange-600">5.</span>
                      <span>Copy the result with one click or download for later use</span>
                    </li>
                  </ol>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">What is it?</h3>
              <p className="mb-4">
                HTML entities are sequences of characters that begin with an ampersand (&amp;) and end with a semicolon (;). They are
                used to represent special characters in HTML that would otherwise be interpreted as code. For example, the less-than
                sign (&lt;) must be written as &amp;lt; in HTML to prevent it from being treated as the start of an HTML tag. There are
                three types of HTML entities: named entities (like &amp;copy; for ©), decimal entities (like &amp;#169; for ©), and
                hexadecimal entities (like &amp;#xA9; for ©).
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Common Use Cases</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>Display Code Snippets:</strong> Show HTML, XML, or code examples on web pages without them being interpreted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>XSS Attack Prevention:</strong> Encode user-generated content to prevent malicious script injection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>Special Characters:</strong> Display copyright symbols, mathematical symbols, and foreign characters reliably</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>Email HTML Content:</strong> Encode HTML for email clients that have strict character requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>Database Storage:</strong> Store HTML content safely in databases that may not support all character sets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span><strong>SEO Meta Tags:</strong> Properly encode special characters in meta descriptions and titles</span>
                </li>
              </ul>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy & Security</h3>
                <p>
                  All conversions are performed entirely in your browser using client-side JavaScript.
                  Your data never leaves your device and is not transmitted to any server. This ensures
                  complete privacy and security for all your conversions.
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