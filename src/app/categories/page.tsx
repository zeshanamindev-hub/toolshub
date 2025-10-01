import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Hash,
  Type,
  Scissors,
  RotateCcw,
  ArrowRight,
  Shield,
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
  Grid3X3,
  Smile
} from "lucide-react"

const categories = [
  {
    name: "Text & Writing",
    description: "Analyze, transform, and process text content with powerful utilities",
    count: 16,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    tools: [
      { name: "Word Counter", href: "/tools/word-counter", icon: FileText },
      { name: "Character Counter", href: "/tools/character-counter", icon: Hash },
      { name: "Case Converter", href: "/tools/case-converter", icon: Type },
      { name: "Remove Extra Spaces", href: "/tools/remove-spaces", icon: Scissors },
      { name: "Reverse Text", href: "/tools/reverse-text", icon: RotateCcw },
      { name: "Palindrome Checker", href: "/tools/palindrome-checker", icon: RotateCcw },
      { name: "Palindrome Detector", href: "/tools/palindrome-detector", icon: Search },
      { name: "Reverse Word Order Tool", href: "/tools/reverse-word-order", icon: RotateCcw },
      { name: "Emoji Translator", href: "/tools/emoji-translator", icon: Smile },
      { name: "Letter Counter", href: "/tools/letter-counter", icon: BarChart3 },
      { name: "Text Diff Checker", href: "/tools/text-diff-checker", icon: GitCompare },
      { name: "Text Extractor", href: "/tools/text-extractor", icon: Filter },
      { name: "Line Sorter", href: "/tools/line-sorter", icon: ArrowUpDown },
    ]
  },
  {
    name: "Converters & Encoding",
    description: "Convert between different formats, encodings, and data representations",
    count: 15,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    tools: [
      { name: "URL Encoder/Decoder", href: "/tools/url-encoder", icon: LinkIcon },
      { name: "Base64 Converter", href: "/tools/base64-converter", icon: Binary },
      { name: "JSON Formatter", href: "/tools/json-formatter", icon: Braces },
      { name: "Text to ASCII", href: "/tools/text-to-ascii", icon: Binary },
      { name: "ASCII to Text", href: "/tools/ascii-to-text", icon: FileText },
      { name: "HTML Entities", href: "/tools/html-entities", icon: Code },
      { name: "Text to Morse", href: "/tools/text-to-morse", icon: Code },
      { name: "Morse to Text", href: "/tools/morse-to-text", icon: Code },
      { name: "Timestamp Converter", href: "/tools/timestamp-converter", icon: Clock },
    ]
  },
  {
    name: "Generators",
    description: "Generate passwords, QR codes, placeholder content, and more",
    count: 8,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    tools: [
      { name: "Password Generator", href: "/tools/password-generator", icon: Lock },
      { name: "Hash Generator", href: "/tools/hash-generator", icon: Shield },
      { name: "QR Code Generator", href: "/tools/qr-generator", icon: QrCode },
      { name: "Lorem Ipsum Generator", href: "/tools/lorem-ipsum-generator", icon: FileText },
      { name: "Color Palette Generator", href: "/tools/color-palette-generator", icon: Palette },
      { name: "Random String", href: "/tools/random-string", icon: Shuffle },
    ]
  },
  {
    name: "Developer Tools",
    description: "Essential utilities for developers and programmers",
    count: 9,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    tools: [
      { name: "Regex Tester", href: "/tools/regex-tester", icon: Search },
      { name: "JSON Formatter", href: "/tools/json-formatter", icon: Braces },
      { name: "Base64 Converter", href: "/tools/base64-converter", icon: Binary },
      { name: "URL Encoder", href: "/tools/url-encoder", icon: LinkIcon },
      { name: "Hash Generator", href: "/tools/hash-generator", icon: Shield },
      { name: "Timestamp Converter", href: "/tools/timestamp-converter", icon: Clock },
      { name: "CSS Minifier", href: "/tools/css-minifier", icon: Code },
      { name: "JS Minifier", href: "/tools/js-minifier", icon: Code },
      { name: "Percentage Calculator", href: "/tools/percentage-calculator", icon: BarChart3 },
    ]
  }
]

export default function CategoriesPage() {
  const totalTools = categories.reduce((sum, category) => sum + category.count, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Grid3X3 className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Tool Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our collection of {totalTools}+ tools organized by category.
            Find exactly what you need for your text processing, conversion, and generation tasks.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {categories.map((category) => (
            <Card key={category.name} className={`${category.borderColor} border-2 hover:shadow-lg transition-all duration-300`}>
              <CardHeader className={category.bgColor}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={`text-2xl ${category.color}`}>
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {category.description}
                    </CardDescription>
                  </div>
                  <div className={`text-3xl font-bold ${category.color}`}>
                    {category.count}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {category.tools.slice(0, 6).map((tool) => {
                    const Icon = tool.icon
                    return (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <Icon className={`h-5 w-5 ${category.color} group-hover:scale-110 transition-transform`} />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {tool.name}
                        </span>
                      </Link>
                    )
                  })}
                </div>

                {category.tools.length > 6 && (
                  <div className="text-sm text-gray-500 mb-4">
                    +{category.tools.length - 6} more tools in this category
                  </div>
                )}

                <Button asChild className="w-full">
                  <Link href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}>
                    View All {category.name} Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalTools}+</div>
              <div className="text-gray-600">Total Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{categories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Free to Use</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">0ms</div>
              <div className="text-gray-600">Server Delay</div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">More Categories Coming Soon!</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're constantly expanding our collection. Upcoming categories include:
              Image Processing, File Converters, Math Calculators, and much more.
            </p>
            <Button asChild variant="outline">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
