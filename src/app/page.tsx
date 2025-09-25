"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import StructuredData from "@/components/structured-data"
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
  Users
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
]

const features = [
  {
    name: "Lightning Fast",
    description: "All tools work instantly in your browser without any delays.",
    icon: Zap,
  },
  {
    name: "Privacy First",
    description: "Your text never leaves your browser. Everything is processed locally.",
    icon: Shield,
  },
  {
    name: "Mobile Friendly",
    description: "Works perfectly on all devices - desktop, tablet, and mobile.",
    icon: Smartphone,
  },
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

      {/* Tools Section */}
      <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {searchQuery ? (
              <>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {filteredTools.length > 0 
                    ? `Found ${filteredTools.length} tool${filteredTools.length !== 1 ? 's' : ''} matching your search.`
                    : "No tools found matching your search. Try different keywords."
                  }
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Choose Your Tool
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Select from our collection of carefully crafted tools for productivity, writing, SEO, design, and development. 
                  Each tool is designed to be fast, accurate, and easy to use.
                </p>
              </>
            )}
          </div>
          
          {filteredTools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(searchQuery ? filteredTools : filteredTools.slice(0, 12)).map((tool, index) => {
                  const Icon = tool.icon
                  return (
                    <Card key={tool.name} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group" style={{
                      animationDelay: `${index * 0.1}s`
                    }}>
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
                        <Button asChild className="w-full group-hover:shadow-md transition-all duration-200">
                          <Link href={tool.href}>
                            Use Tool
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
              
              {/* View All Tools Button - only show when not searching and there are more than 12 tools */}
              {!searchQuery && tools.length > 12 && (
                <div className="text-center mt-12">
                  <Button size="lg" asChild className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4">
                    <Link href="/tools">
                      View All Tools ({tools.length} total)
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              )}
            </>
          
          ) : searchQuery && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
              <p className="text-gray-600 mb-6">Try searching for different keywords like "word", "password", "json", or "qr"</p>
              <Button onClick={() => setSearchQuery("")} variant="outline">
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Tools Hub?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with modern web technologies to provide the best user experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.name} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose any tool above and start manipulating your text right away. 
            No registration required, completely free to use.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="#tools">
              Start Using Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
    </>
  )
}
