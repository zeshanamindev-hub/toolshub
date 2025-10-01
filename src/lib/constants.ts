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