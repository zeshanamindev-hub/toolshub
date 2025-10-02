// Navigation and URL constants for consistent linking across the app

export const SITE_CONFIG = {
  name: "Tools Hub",
  description: "33+ free online tools for text manipulation, development, security, and content creation",
  url: "https://toolshub.com",
  toolCount: 33
}

export const CATEGORIES = {
  "text-writing": {
    id: "text-writing",
    name: "Text & Writing",
    href: "/categories/text-writing",
    description: "Text analysis, transformation, and processing tools"
  },
  "converters": {
    id: "converters",
    name: "Converters & Encoding", 
    href: "/categories/converters",
    description: "Convert between formats, encodings, and data representations"
  },
  "generators": {
    id: "generators",
    name: "Generators",
    href: "/categories/generators", 
    description: "Generate passwords, QR codes, placeholder content, and assets"
  },
  "developers": {
    id: "developers",
    name: "Developer Tools",
    href: "/categories/developers",
    description: "Essential utilities and debugging tools for developers"
  },
  "security": {
    id: "security",
    name: "Security & Hash",
    href: "/categories/security",
    description: "Hash generators, encryption tools, and security utilities"
  }
} as const

export const NAVIGATION_LINKS = {
  main: [
    { name: "Home", href: "/" },
    { name: "All Tools", href: "/tools" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" }
  ],
  footer: {
    textTools: [
      { name: "Word Counter", href: "/tools/word-counter" },
      { name: "Character Counter", href: "/tools/character-counter" },
      { name: "Case Converter", href: "/tools/case-converter" },
      { name: "Remove Spaces", href: "/tools/remove-spaces" },
      { name: "Reverse Text", href: "/tools/reverse-text" },
      { name: "Line Sorter", href: "/tools/line-sorter" },
      { name: "Text Diff Checker", href: "/tools/text-diff-checker" },
      { name: "Text Extractor", href: "/tools/text-extractor" }
    ],
    converters: [
      { name: "URL Encoder/Decoder", href: "/tools/url-encoder" },
      { name: "Base64 Converter", href: "/tools/base64-converter" },
      { name: "JSON Formatter", href: "/tools/json-formatter" },
      { name: "Text to ASCII", href: "/tools/text-to-ascii" },
      { name: "ASCII to Text", href: "/tools/ascii-to-text" },
      { name: "HTML Entities", href: "/tools/html-entities" },
      { name: "Text to Morse", href: "/tools/text-to-morse" },
      { name: "Morse to Text", href: "/tools/morse-to-text" },
      { name: "Timestamp Converter", href: "/tools/timestamp-converter" }
    ],
    generators: [
      { name: "Password Generator", href: "/tools/password-generator" },
      { name: "Hash Generator", href: "/tools/hash-generator" },
      { name: "QR Code Generator", href: "/tools/qr-generator" },
      { name: "Lorem Ipsum Generator", href: "/tools/lorem-ipsum-generator" },
      { name: "Color Palette Generator", href: "/tools/color-palette-generator" },
      { name: "Random String", href: "/tools/random-string" }
    ],
    developers: [
      { name: "Regex Tester", href: "/tools/regex-tester" },
      { name: "Letter Counter", href: "/tools/letter-counter" },
      { name: "CSS Minifier", href: "/tools/css-minifier" },
      { name: "JS Minifier", href: "/tools/js-minifier" },
      { name: "Percentage Calculator", href: "/tools/percentage-calculator" },
      { name: "BMI Calculator", href: "/tools/bmi-calculator" }
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" }
    ]
  }
} as const

export const POPULAR_TOOLS = [
  { name: "Word Counter", href: "/tools/word-counter", description: "Count words, characters & more" },
  { name: "JSON Formatter", href: "/tools/json-formatter", description: "Format & validate JSON" },
  { name: "QR Code Generator", href: "/tools/qr-generator", description: "Generate QR codes" },
  { name: "URL Encoder", href: "/tools/url-encoder", description: "Encode/decode URLs" },
  { name: "Hash Generator", href: "/tools/hash-generator", description: "Generate secure hashes" },
  { name: "Regex Tester", href: "/tools/regex-tester", description: "Test regular expressions" },
  { name: "Base64 Converter", href: "/tools/base64-converter", description: "Encode/decode Base64" },
  { name: "Password Generator", href: "/tools/password-generator", description: "Generate secure passwords" }
] as const

// Import icons for tools
import {
  FileText,
  Hash,
  Type,
  Scissors,
  RotateCcw,
  Shield,
  Lock,
  BarChart3,
  Binary,
  Shuffle,
  Code,
  Link as LinkIcon,
  Braces,
  Palette,
  Clock,
  QrCode,
  GitCompare,
  ArrowUpDown,
  Filter,
  Activity,
  Smile
} from "lucide-react"

export const ALL_TOOLS = [
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
    name: "Palindrome Checker",
    description: "Check if text is a palindrome, ignoring case, spaces, and punctuation.",
    icon: RotateCcw,
    href: "/tools/palindrome-checker",
    color: "text-cyan-600",
  },
  {
    name: "Palindrome Detector",
    description: "Detect and highlight palindromic words within text, ignoring case and punctuation.",
    icon: Hash,
    href: "/tools/palindrome-detector",
    color: "text-purple-600",
  },
  {
    name: "Emoji Translator",
    description: "Translate emojis to text and text to emojis instantly.",
    icon: Smile,
    href: "/tools/emoji-translator",
    color: "text-yellow-600",
  },
  {
    name: "Reverse Word Order Tool",
    description: "Reverse the order of words in your text instantly.",
    icon: RotateCcw,
    href: "/tools/reverse-word-order",
    color: "text-indigo-600",
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
    icon: Shield,
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
    icon: Hash,
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
] as const

// SEO and metadata helpers
export const generatePageTitle = (pageName: string, includeCount = false) => {
  const count = includeCount ? ` | ${SITE_CONFIG.toolCount}+ Tools` : ""
  return `${pageName}${count} | ${SITE_CONFIG.name}`
}

export const generateToolTitle = (toolName: string) => {
  return `${toolName} - Free Online Tool | ${SITE_CONFIG.name}`
}

export const generateCategoryTitle = (categoryName: string) => {
  return `${categoryName} Tools - Free Online Utilities | ${SITE_CONFIG.name}`
}