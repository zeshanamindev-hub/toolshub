"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useMemo } from "react"
import {
  FileText,
  Hash,
  Type,
  Scissors,
  RotateCcw,
  ArrowRight,
  Lock,
  BarChart3,
  Binary,
  Shuffle,
  Code,
  Link as LinkIcon,
  Braces,
  Palette,
  Search,
  Clock,
  QrCode,
  GitCompare,
  ArrowUpDown,
  Filter,
  ArrowLeft,
  Grid3X3,
  List,
  Activity
} from "lucide-react"

// Import the same tools array (you'll need to move this to a shared file)
const tools = [
  // Existing Tools
  {
    name: "Word Counter",
    description: "Count words, characters, paragraphs, and sentences in your text instantly.",
    icon: FileText,
    href: "/tools/word-counter",
    color: "text-blue-600",
  },
  {
    name: "Character Counter",
    description: "Count characters with or without spaces, perfect for social media posts.",
    icon: Hash,
    href: "/tools/character-counter",
    color: "text-green-600",
  },
  {
    name: "Case Converter",
    description: "Convert text to UPPERCASE, lowercase, Title Case, and more formats.",
    icon: Type,
    href: "/tools/case-converter",
    color: "text-purple-600",
  },
  {
    name: "Remove Extra Spaces",
    description: "Clean up your text by removing extra spaces and normalizing whitespace.",
    icon: Scissors,
    href: "/tools/remove-spaces",
    color: "text-orange-600",
  },
  {
    name: "Reverse Text",
    description: "Reverse your text character by character or word by word.",
    icon: RotateCcw,
    href: "/tools/reverse-text",
    color: "text-red-600",
  },
  {
    name: "Password Generator",
    description: "Generate secure passwords with customizable length and character sets.",
    icon: Lock,
    href: "/tools/password-generator",
    color: "text-green-700",
  },
  {
    name: "Letter Counter",
    description: "Analyze letter frequency and character distribution in your text.",
    icon: BarChart3,
    href: "/tools/letter-counter",
    color: "text-blue-700",
  },
  {
    name: "Text to ASCII",
    description: "Convert text to ASCII codes in decimal, hexadecimal, binary, and octal formats.",
    icon: Binary,
    href: "/tools/text-to-ascii",
    color: "text-purple-700",
  },
  {
    name: "Random String Generator",
    description: "Generate random strings with customizable length and character sets.",
    icon: Shuffle,
    href: "/tools/random-string",
    color: "text-indigo-600",
  },
  {
    name: "HTML Entities Encoder/Decoder",
    description: "Encode and decode HTML entities for safe HTML display and processing.",
    icon: Code,
    href: "/tools/html-entities",
    color: "text-orange-700",
  },
  {
    name: "ASCII to Text",
    description: "Convert ASCII codes back to readable text with error handling and validation.",
    icon: FileText,
    href: "/tools/ascii-to-text",
    color: "text-teal-600",
  },
  {
    name: "Text to Morse Code",
    description: "Convert text to Morse code with support for letters, numbers, and punctuation.",
    icon: Code,
    href: "/tools/text-to-morse",
    color: "text-cyan-600",
  },
  {
    name: "Morse to Text",
    description: "Convert Morse code back to readable text with error handling.",
    icon: Code,
    href: "/tools/morse-to-text",
    color: "text-slate-600",
  },
  // New Tools
  {
    name: "URL Encoder/Decoder",
    description: "Encode or decode URLs and text for safe web transmission and processing.",
    icon: LinkIcon,
    href: "/tools/url-encoder",
    color: "text-blue-600",
  },
  {
    name: "Base64 Converter",
    description: "Convert text to Base64 encoding and decode Base64 strings back to text.",
    icon: Binary,
    href: "/tools/base64-converter",
    color: "text-purple-600",
  },
  {
    name: "BMI Calculator",
    description: "Calculate BMI, ideal weight range, body fat estimation, and health recommendations.",
    icon: Activity,
    href: "/tools/bmi-calculator",
    color: "text-emerald-600",
  },
  {
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON data with syntax highlighting.",
    icon: Braces,
    href: "/tools/json-formatter",
    color: "text-orange-600",
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text.",
    icon: Lock,
    href: "/tools/hash-generator",
    color: "text-red-600",
  },
  {
    name: "Color Palette Generator",
    description: "Create beautiful color palettes using color theory principles.",
    icon: Palette,
    href: "/tools/color-palette-generator",
    color: "text-pink-600",
  },
  {
    name: "Regex Tester",
    description: "Test and debug regular expressions with real-time matching and highlighting.",
    icon: Search,
    href: "/tools/regex-tester",
    color: "text-indigo-600",
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text in various formats for designs and layouts.",
    icon: FileText,
    href: "/tools/lorem-ipsum-generator",
    color: "text-teal-600",
  },
  {
    name: "Timestamp Converter",
    description: "Convert between Unix timestamps, ISO dates, and human-readable formats.",
    icon: Clock,
    href: "/tools/timestamp-converter",
    color: "text-blue-600",
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes for URLs, text, WiFi, contacts, and more with customization.",
    icon: QrCode,
    href: "/tools/qr-generator",
    color: "text-gray-900",
  },
  {
    name: "Text Diff Checker",
    description: "Compare two text blocks and highlight differences line by line.",
    icon: GitCompare,
    href: "/tools/text-diff-checker",
    color: "text-green-600",
  },
  {
    name: "Line Sorter",
    description: "Sort text lines alphabetically, numerically, by length, or randomly.",
    icon: ArrowUpDown,
    href: "/tools/line-sorter",
    color: "text-purple-600",
  },
  {
    name: "Text Extractor",
    description: "Extract emails, URLs, phone numbers, dates, and patterns from text.",
    icon: Filter,
    href: "/tools/text-extractor",
    color: "text-cyan-600",
  },
  {
    name: "CSS Minifier",
    description: "Minify CSS code to reduce file size and improve loading performance.",
    icon: Code,
    href: "/tools/css-minifier",
    color: "text-blue-600",
  },
  {
    name: "JS Minifier",
    description: "Minify JavaScript code to reduce file size and improve loading performance.",
    icon: Code,
    href: "/tools/js-minifier",
    color: "text-yellow-600",
  },
  {
    name: "Percentage Calculator",
    description: "Calculate percentages, percentage change, and percentage of amounts.",
    icon: BarChart3,
    href: "/tools/percentage-calculator",
    color: "text-green-600",
  },
]

export default function AllToolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return tools
    
    const query = searchQuery.toLowerCase().trim()
    return tools.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Group tools alphabetically
  const groupedTools = useMemo(() => {
    const grouped = filteredTools.reduce((acc, tool) => {
      const firstLetter = tool.name.charAt(0).toUpperCase()
      if (!acc[firstLetter]) {
        acc[firstLetter] = []
      }
      acc[firstLetter].push(tool)
      return acc
    }, {} as Record<string, typeof tools>)
    
    // Sort each group
    Object.keys(grouped).forEach(letter => {
      grouped[letter].sort((a, b) => a.name.localeCompare(b.name))
    })
    
    return grouped
  }, [filteredTools])

  const alphabeticalLetters = Object.keys(groupedTools).sort()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-indigo-100/50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setViewMode("grid")}
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setViewMode("list")}
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Tools A-Z
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Browse all {tools.length} tools organized alphabetically. Find exactly what you need quickly and efficiently.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tools Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredTools.length > 0 ? (
          <div className="space-y-12">
            {alphabeticalLetters.map(letter => (
              <div key={letter} className="scroll-mt-24" id={letter}>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl font-bold text-xl">
                    {letter}
                  </div>
                  <div className="ml-4 flex-1 h-px bg-gray-200"></div>
                  <span className="ml-4 text-sm text-gray-500">
                    {groupedTools[letter].length} tool{groupedTools[letter].length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedTools[letter].map((tool) => {
                      const Icon = tool.icon
                      return (
                        <Card key={tool.name} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                          <CardHeader>
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-primary/10 transition-colors">
                                <Icon className={`h-6 w-6 ${tool.color}`} />
                              </div>
                              <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                            </div>
                            <CardDescription className="text-base leading-relaxed">
                              {tool.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button asChild className="w-full">
                              <Link href={tool.href}>
                                Use Tool
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {groupedTools[letter].map((tool) => {
                      const Icon = tool.icon
                      return (
                        <div key={tool.name} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-primary/30 hover:shadow-md transition-all duration-200 group">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-primary/10 transition-colors">
                              <Icon className={`h-5 w-5 ${tool.color}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600">{tool.description}</p>
                            </div>
                          </div>
                          <Button asChild size="sm">
                            <Link href={tool.href}>
                              Use Tool
                              <ArrowRight className="ml-2 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600 mb-6">Try searching for different keywords</p>
            <Button onClick={() => setSearchQuery("")} variant="outline">
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* Alphabet Navigation */}
      {!searchQuery && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-2 hidden lg:block">
          <div className="flex flex-col space-y-1">
            {alphabeticalLetters.map(letter => (
              <a
                key={letter}
                href={`#${letter}`}
                className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/10 rounded transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}