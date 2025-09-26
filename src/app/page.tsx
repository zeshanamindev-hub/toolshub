"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import StructuredData from "@/components/structured-data"
import ToolsCategorySection from "@/components/tools-category-section"
import { useState, useMemo } from "react"
import {
  FileText,
  Hash,
  Type,
  Scissors,
  RotateCcw,
  ArrowRight,
  Zap,
  Shield,
  Smartphone,
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
  Sparkles,
  Info,
  TrendingUp,
  Star,
  Users,
  ChevronRight,
  Grid3X3,
  Activity
} from "lucide-react"

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

const features = [
  {
    name: "Lightning Fast",
    description: "All tools work instantly in your browser without any delays. No waiting, no loading - just immediate results.",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    iconBg: "bg-yellow-100",
    accent: "from-yellow-400 to-orange-500",
    stats: "< 100ms",
    benefit: "Processing Time"
  },
  {
    name: "Privacy First",
    description: "Your data never leaves your browser. Everything is processed locally with zero server communication for maximum security.",
    icon: Shield,
    color: "text-green-600",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100",
    accent: "from-green-400 to-emerald-500",
    stats: "100%",
    benefit: "Local Processing"
  },
  {
    name: "Mobile Friendly",
    description: "Perfect responsive design that works seamlessly on all devices - desktop, tablet, and mobile with touch optimization.",
    icon: Smartphone,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    accent: "from-blue-400 to-indigo-500",
    stats: "All Devices",
    benefit: "Supported"
  },
  {
    name: "No Registration",
    description: "Start using any tool immediately. No sign-up, no account creation, no personal information required.",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    iconBg: "bg-purple-100",
    accent: "from-purple-400 to-pink-500",
    stats: "0 Steps",
    benefit: "To Get Started"
  },
  {
    name: "Always Updated",
    description: "Regular updates with new features, improvements, and additional tools based on user feedback and needs.",
    icon: TrendingUp,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    accent: "from-indigo-400 to-purple-500",
    stats: "Weekly",
    benefit: "Updates"
  },
  {
    name: "Developer Friendly",
    description: "Built with modern web standards, optimized performance, and clean architecture for the best user experience.",
    icon: Code,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    iconBg: "bg-orange-100",
    accent: "from-orange-400 to-red-500",
    stats: "Modern",
    benefit: "Technology"
  }
]

// Popular tools selection - most commonly used tools
const popularTools = [
  {
    name: "Word Counter",
    description: "Count words, characters, paragraphs instantly",
    icon: FileText,
    href: "/tools/word-counter",
    color: "text-blue-600",
    stats: "50k+ uses",
    badge: "Most Popular"
  },
  {
    name: "Password Generator", 
    description: "Generate secure passwords instantly",
    icon: Lock,
    href: "/tools/password-generator",
    color: "text-green-600",
    stats: "35k+ uses",
    badge: "Essential"
  },
  {
    name: "Case Converter",
    description: "Convert text to any case format",
    icon: Type,
    href: "/tools/case-converter", 
    color: "text-purple-600",
    stats: "30k+ uses",
    badge: "Trending"
  },
  {
    name: "QR Code Generator",
    description: "Create QR codes for any content",
    icon: QrCode,
    href: "/tools/qr-generator",
    color: "text-indigo-600",
    stats: "25k+ uses",
    badge: "Hot"
  },
  {
    name: "JSON Formatter", 
    description: "Format and validate JSON data",
    icon: Braces,
    href: "/tools/json-formatter",
    color: "text-orange-600",
    stats: "20k+ uses", 
    badge: "Developer"
  },
  {
    name: "Character Counter",
    description: "Count characters for social media",
    icon: Hash,
    href: "/tools/character-counter",
    color: "text-cyan-600",
    stats: "18k+ uses",
    badge: "Social"
  }
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return tools
    
    const query = searchQuery.toLowerCase().trim()
    return tools.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tools Hub - Free Online Tools",
    "description": "Tools Hub offers 25+ free online text manipulation tools including word counter, character counter, case converter, password generator, JSON formatter, QR code generator, regex tester, ASCII converters, HTML entities encoder/decoder, and more. Fast, secure, no registration required.",
    "url": "https://toolshub.com",
    "keywords": "online tools, text manipulation, word counter, character counter, case converter, password generator, JSON formatter, QR code generator, free tools, web tools",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://toolshub.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Tools Hub",
      "url": "https://toolshub.com",
      "description": "Your ultimate destination for free online text manipulation and utility tools"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": tools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebApplication",
          "name": tool.name,
          "description": tool.description,
          "url": `https://toolshub.com${tool.href}`,
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      }))
    }
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="bg-white">
      
      {/* Clean white background for entire page */}
      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden" 
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(219, 234, 254, 0.3) 0%, 
              rgba(199, 210, 254, 0.4) 50%, 
              rgba(221, 214, 254, 0.3) 100%
            ),
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
          `
        }}
      >
        {/* Hero Background Patterns - Contained to Hero Section */}
        
        {/* Visible Background Pattern Layer 1 - Prominent Dots */}
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='1'%3E%3Ccircle cx='50' cy='50' r='4'/%3E%3Ccircle cx='0' cy='0' r='3'/%3E%3Ccircle cx='100' cy='100' r='3'/%3E%3Ccircle cx='0' cy='100' r='3'/%3E%3Ccircle cx='100' cy='0' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Visible Background Pattern Layer 2 - Geometric Grid */}
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='150' height='150' viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='30' height='30' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 30 0 L 0 0 0 30' fill='none' stroke='%236366F1' stroke-width='2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='150' height='150' fill='url(%23grid)' /%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Large Visible Gradient Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Large colored shapes with reduced opacity */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-10 w-48 h-48 bg-purple-300/35 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-10 left-20 w-56 h-56 bg-indigo-300/32 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-300/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-300/25 rotate-45 blur-xl animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-emerald-300/28 rotate-12 blur-lg animate-float-delay"></div>
          <div className="absolute top-20 left-1/2 w-36 h-36 bg-yellow-300/22 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
          
          {/* Decorative elements */}
          <div className="absolute left-[15%] top-[15%] h-16 w-16 rounded-full bg-gradient-to-br from-blue-400/12 to-indigo-600/10 animate-float" />
          <div className="absolute right-[20%] top-[30%] h-12 w-12 rounded-full bg-gradient-to-br from-pink-400/15 to-rose-600/12 animate-float-delay" />
          <div className="absolute left-[80%] bottom-[40%] h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400/10 to-teal-600/8 animate-float" style={{animationDelay: '1s'}} />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-20">
          {/* Bold headline highlighting large collection */}
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 animate-fade-in-up shadow-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            Tools Hub - All-in-One Solution
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 mb-6 leading-[0.9] animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <span className="block bg-gradient-to-r from-primary via-indigo-600 to-purple-600 bg-clip-text text-transparent">200+ Free Tools</span>
            <span className="block text-gray-900 mt-2">at Your Fingertips</span>
          </h1>
          
          {/* Value-focused subheading */}
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <span className="font-semibold text-gray-800">Boost your productivity</span> with our comprehensive collection of tools for 
            <span className="font-medium text-primary"> writing, SEO optimization, design, development, and content creation</span>. 
            Everything you need in one place - fast, secure, and completely free.
          </p>

          {/* Primary and Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <Button size="lg" asChild className="shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white border-0 group relative overflow-hidden transform hover:scale-105 transition-all duration-300 px-10 py-6 text-xl h-16">
              <Link href="#tools" className="relative z-10" title="Explore 200+ Free Online Tools - Tools Hub">
                <Sparkles className="mr-3 h-6 w-6 animate-pulse" />
                Explore Free Tools
                <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-2 border-gray-300 hover:border-primary hover:bg-primary/5 transition-all duration-300 group transform hover:scale-105 px-10 py-6 text-xl h-16 backdrop-blur-sm bg-white/80">
              <Link href="/about" title="Learn More About Tools Hub - Free Online Tools">
                <Info className="mr-3 h-5 w-5 transition-colors duration-300 group-hover:text-primary" />
                Learn More About Tools Hub
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Fade effect at bottom to merge with white background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none z-10"></div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in-up">
              <TrendingUp className="mr-2 h-4 w-4" />
              Popular Tools
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Most Used Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Discover our most popular tools loved by thousands of users worldwide. 
              Perfect for everyday tasks and productivity boosts.
            </p>
          </div>

          {/* Popular Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {popularTools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <div
                  key={tool.name}
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fade-in-up"
                  style={{animationDelay: `${0.3 + index * 0.1}s`}}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-white shadow-lg">
                      {tool.badge}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="relative p-8">
                    {/* Icon with animated background */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 group-hover:bg-white group-hover:shadow-lg transition-all duration-300 mb-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Icon className={`h-8 w-8 ${tool.color} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                    </div>

                    {/* Tool Info */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{tool.stats}</span>
                    </div>

                    {/* CTA Button */}
                    <Link 
                      href={tool.href}
                      className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-gray-50 text-gray-700 font-medium group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:scale-105"
                    >
                      Try Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Animated border on hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300"></div>
                </div>
              )
            })}
          </div>

          {/* View All Tools Button */}
          <div className="text-center animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Link href="/tools">
                <Star className="mr-2 h-5 w-5" />
                View All Tools A-Z
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Category Section */}
      <ToolsCategorySection />

      {/* Enhanced Tools Section */}
      <section id="tools" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 to-white"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/40 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-28 h-28 bg-purple-200/40 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-green-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-orange-200/40 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            {searchQuery ? (
              <>
                <div className="inline-flex items-center px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 animate-fade-in-up">
                  <Search className="mr-2 h-4 w-4" />
                  Search Results
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                  Results for <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">"{searchQuery}"</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  {filteredTools.length > 0 
                    ? `Found ${filteredTools.length} perfect tool${filteredTools.length !== 1 ? 's' : ''} matching your search. Click any tool to get started instantly.`
                    : "No tools found matching your search. Try different keywords or browse our categories below."
                  }
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 animate-fade-in-up">
                  <Zap className="mr-2 h-4 w-4" />
                  Featured Tools
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                  <span className="bg-gradient-to-r from-primary via-indigo-600 to-purple-600 bg-clip-text text-transparent">Choose Your Tool</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  Discover our <span className="font-semibold text-gray-800">handpicked selection</span> of the most powerful and popular tools. 
                  Each tool is crafted for <span className="font-medium text-primary">speed, accuracy, and ease of use</span> - 
                  perfect for productivity, writing, development, and creative tasks.
                </p>
              </>
            )}
          </div>
          
          {filteredTools.length > 0 ? (
            <>
              {/* Enhanced Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {(searchQuery ? filteredTools : filteredTools.slice(0, 12)).map((tool, index) => {
                  const Icon = tool.icon
                  return (
                    <div
                      key={tool.name} 
                      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-transparent overflow-hidden animate-fade-in-up"
                      style={{animationDelay: `${0.3 + index * 0.1}s`}}
                    >
                      {/* Background gradient on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-${tool.color.replace('text-', '')}/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      {/* Floating background element */}
                      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-${tool.color.replace('text-', '')}/20 to-indigo-400/20 blur-2xl`}></div>
                      </div>

                      {/* Card Content */}
                      <div className="relative z-10 p-8">
                        {/* Icon with enhanced styling */}
                        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 group-hover:bg-white group-hover:shadow-lg transition-all duration-300 mb-6 relative overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-br from-${tool.color.replace('text-', '')}/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                          <Icon className={`h-8 w-8 ${tool.color} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                        </div>

                        {/* Tool Info with better typography */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                          {tool.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-6 text-base">
                          {tool.description}
                        </p>

                        {/* Enhanced CTA Button */}
                        <Link 
                          href={tool.href}
                          className="group/btn relative inline-flex items-center justify-center w-full px-6 py-4 rounded-xl bg-gray-50 text-gray-700 font-semibold group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:scale-105 overflow-hidden border border-gray-200 group-hover:border-primary"
                        >
                          {/* Button background effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative z-10 flex items-center">
                            <Sparkles className="mr-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            Use Tool Now
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                          </span>
                        </Link>
                      </div>

                      {/* Animated border effect */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300"></div>
                      
                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                        <div className={`absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl ${tool.color.replace('text-', 'from-')}/20 to-transparent rotate-45 transform translate-x-4 -translate-y-4 group-hover:scale-150 transition-transform duration-300`}></div>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Enhanced View All Tools Section */}
              {!searchQuery && tools.length > 12 && (
                <div className="text-center bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl p-12 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
                  <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                      <Star className="mr-2 h-4 w-4" />
                      More Tools Available
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Explore All {tools.length} Tools
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Discover our complete collection of professional tools. From text manipulation to code formatting, 
                      we have everything you need to boost your productivity.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" asChild className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold">
                        <Link href="/tools">
                          <Grid3X3 className="mr-2 h-5 w-5" />
                          View All Tools A-Z
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 hover:translate-x-1" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild className="border-2 border-gray-300 hover:border-primary hover:bg-primary/5 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg backdrop-blur-sm">
                        <Link href="/categories">
                          <Filter className="mr-2 h-5 w-5" />
                          Browse Categories
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          
          ) : searchQuery && (
            <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
              <div className="max-w-md mx-auto">
                {/* Enhanced No Results State */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Tools Found</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We couldn't find any tools matching <span className="font-semibold">"{searchQuery}"</span>. 
                  Try different keywords or explore our categories below.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => setSearchQuery("")} className="bg-primary hover:bg-primary/90 text-white">
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    Clear Search
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/categories">
                      <Grid3X3 className="mr-2 h-4 w-4" />
                      Browse Categories
                    </Link>
                  </Button>
                </div>
                
                {/* Popular search suggestions */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-4">Popular searches:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['word counter', 'password', 'json', 'qr code', 'base64'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setSearchQuery(suggestion)}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-10 w-36 h-36 bg-green-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 right-20 w-28 h-28 bg-orange-200/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 animate-fade-in-up">
              <Star className="mr-2 h-4 w-4" />
              Why Choose Tools Hub?
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <span className="bg-gradient-to-r from-primary via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Built for Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Experience the perfect blend of <span className="font-semibold text-gray-800">speed, security, and simplicity</span>. 
              Our tools are crafted with modern web technologies to deliver an exceptional user experience that puts your needs first.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.name}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-transparent overflow-hidden animate-fade-in-up"
                  style={{animationDelay: `${0.3 + index * 0.1}s`}}
                >
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Floating Background Element */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${feature.accent} blur-2xl`}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-2xl ${feature.iconBg} group-hover:shadow-lg transition-all duration-300 mb-6 relative overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                      <Icon className={`h-8 w-8 ${feature.color} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6 text-base">
                      {feature.description}
                    </p>

                    {/* Stats */}
                    <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${feature.bgColor} group-hover:shadow-md transition-all duration-300`}>
                      <div className={`text-lg font-bold ${feature.color}`}>
                        {feature.stats}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {feature.benefit}
                      </div>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300"></div>
                </div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-12 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Experience the Difference?
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join thousands of users who trust Tools Hub for their daily productivity needs. 
                Fast, secure, and completely free - just the way tools should be.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  asChild 
                  className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold"
                >
                  <Link href="#tools">
                    <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                    Try Tools Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 hover:translate-x-1" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild 
                  className="border-2 border-gray-300 hover:border-primary hover:bg-primary/5 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg backdrop-blur-sm bg-white/80"
                >
                  <Link href="/about">
                    <Info className="mr-2 h-5 w-5" />
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-purple-700"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Large floating orbs */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-48 h-48 bg-indigo-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-10 left-20 w-56 h-56 bg-purple-300/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-white/5 rotate-45 blur-xl animate-float"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-indigo-200/10 rotate-12 blur-lg animate-float-delay"></div>
          <div className="absolute bottom-1/3 left-1/2 w-28 h-28 bg-purple-200/8 rounded-full blur-xl animate-slow-spin"></div>
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='0' cy='0' r='1'/%3E%3Ccircle cx='60' cy='60' r='1'/%3E%3Ccircle cx='0' cy='60' r='1'/%3E%3Ccircle cx='60' cy='0' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-20">
          {/* Main CTA Content */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold mb-6 animate-fade-in-up">
              <Sparkles className="mr-2 h-4 w-4" />
              Join Thousands of Happy Users
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 animate-fade-in-up leading-tight" style={{animationDelay: '0.1s'}}>
              <span className="block">Ready to</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                Supercharge
              </span>
              <span className="block">Your Productivity?</span>
            </h2>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <span className="font-semibold text-white">Start using our tools instantly</span> - no registration, no setup, no hassle. 
              Just pure productivity at your fingertips, completely free forever.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <Button 
                size="lg" 
                asChild 
                className="group relative bg-white text-primary hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-10 py-6 text-xl h-16 font-bold overflow-hidden"
              >
                <Link href="#tools">
                  {/* Button background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <Zap className="mr-3 h-6 w-6 animate-pulse relative z-10" />
                  <span className="relative z-10">Start Using Tools Now</span>
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-2 relative z-10" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="group border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 px-10 py-6 text-xl h-16 font-semibold"
              >
                <Link href="/categories">
                  <Grid3X3 className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  Browse Categories
                  <ChevronRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Features Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-colors duration-300 mb-4">
                <Zap className="h-8 w-8 text-yellow-300 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Results</h3>
              <p className="text-blue-100 leading-relaxed">All tools work instantly in your browser. No waiting, no loading times.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-colors duration-300 mb-4">
                <Shield className="h-8 w-8 text-green-300 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">100% Private</h3>
              <p className="text-blue-100 leading-relaxed">Your data never leaves your browser. Complete privacy guaranteed.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-colors duration-300 mb-4">
                <Star className="h-8 w-8 text-cyan-300 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Always Free</h3>
              <p className="text-blue-100 leading-relaxed">No subscriptions, no limits. All tools are completely free forever.</p>
            </div>
          </div>

          {/* Social Proof / Stats */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">25+</div>
                <div className="text-blue-200 font-medium">Tools Available</div>
              </div>
              <div className="group">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">100K+</div>
                <div className="text-blue-200 font-medium">Happy Users</div>
              </div>
              <div className="group">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">1M+</div>
                <div className="text-blue-200 font-medium">Tools Used</div>
              </div>
              <div className="group">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
                <div className="text-blue-200 font-medium">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
      </section>
    </div>
    </>
  )
}
