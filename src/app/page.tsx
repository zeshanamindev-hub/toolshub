"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import StructuredData from "@/components/structured-data"
import { useState } from "react"
import {
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Smartphone,
  TrendingUp,
  Star,
  Users,
  ChevronRight,
  Grid3X3,
  Rocket,
  Globe,
  Lock,
  Search
} from "lucide-react"
import { ALL_TOOLS, POPULAR_TOOLS, CATEGORIES, SITE_CONFIG } from "@/lib/constants"
import ToolCard from "@/components/ui/tool-card"
import BentoGrid, { BentoItem } from "@/components/ui/bento-grid"
import CategoryPill from "@/components/ui/category-pill"

const features = [
  {
    name: "Lightning Fast",
    description: "All tools work instantly in your browser without any delays. No waiting, no loading - just immediate results.",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-500",
    stats: "< 100ms",
    benefit: "Processing Time"
  },
  {
    name: "Privacy First",
    description: "Your data never leaves your browser. Everything is processed locally with zero server communication for maximum security.",
    icon: Shield,
    color: "text-green-600",
    bgColor: "bg-green-500",
    stats: "100%",
    benefit: "Local Processing"
  },
  {
    name: "Mobile Ready",
    description: "Perfect experience on any device - desktop, tablet, or mobile. Responsive design that adapts to your screen.",
    icon: Smartphone,
    color: "text-blue-600",
    bgColor: "bg-blue-500",
    stats: "All Devices",
    benefit: "Supported"
  },
  {
    name: "Always Free",
    description: "No subscriptions, no hidden fees, no catch. All tools are completely free to use without any limitations.",
    icon: Star,
    color: "text-purple-600",
    bgColor: "bg-purple-500",
    stats: "Forever",
    benefit: "100% Free"
  }
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Categorize tools based on their name and functionality
  const getToolCategory = (tool: { name: string; description: string }): string => {
    const name = tool.name.toLowerCase()
    const desc = tool.description.toLowerCase()

    // Text & Writing tools
    if (name.includes('word') || name.includes('character') || name.includes('case') ||
        name.includes('text') || name.includes('reverse') || name.includes('palindrome') ||
        name.includes('emoji') || name.includes('letter') || name.includes('diff') ||
        name.includes('sorter') || name.includes('extractor') || name.includes('spaces')) {
      return 'text-writing'
    }

    // Converters & Encoding
    if (name.includes('converter') || name.includes('encoder') || name.includes('decoder') ||
        name.includes('ascii') || name.includes('morse') || name.includes('url') ||
        name.includes('base64') || name.includes('html entities') || name.includes('escape') ||
        name.includes('timestamp') || desc.includes('convert') || desc.includes('encode')) {
      return 'converters'
    }

    // Generators
    if (name.includes('generator') || name.includes('random') || name.includes('qr') ||
        name.includes('lorem') || name.includes('password') || name.includes('dummy') ||
        name.includes('palette')) {
      return 'generators'
    }

    // Developer Tools
    if (name.includes('json') || name.includes('regex') || name.includes('minifier') ||
        name.includes('beautifier') || name.includes('formatter') || name.includes('sql') ||
        name.includes('css') || name.includes('js ') || name.includes('javascript') ||
        name.includes('hash') || name.includes('markdown')) {
      return 'developers'
    }

    // SEO Tools
    if (name.includes('seo') || name.includes('meta') || name.includes('html character')) {
      return 'seo'
    }

    // Default to text-writing
    return 'text-writing'
  }

  // Filter tools by category
  const filteredTools = selectedCategory
    ? ALL_TOOLS.filter(tool => getToolCategory(tool) === selectedCategory)
    : ALL_TOOLS

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Tools Hub",
    "url": "https://toolshub.com",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are Tools Hub tools really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All tools on Tools Hub are 100% free with no hidden fees, subscriptions, or premium features. You can use all tools unlimited times without any restrictions."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data safe when using Tools Hub?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! All processing happens in your browser. Your data never leaves your device and is not sent to any server, ensuring complete privacy and security."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to create an account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No account needed! Tools Hub works instantly without any registration. Just visit the tool you need and start using it immediately."
        }
      }
    ]
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <StructuredData data={faqStructuredData} />

      {/* Hero Section - Clean Design */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-blue-50">
        {/* Decorative Orbs - Solid Colors */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 animate-float-bounce"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-30 animate-float-bounce" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-cyan-100 rounded-full blur-3xl opacity-25 animate-float-bounce" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-20 animate-float-bounce" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M0 0h30v30H0zm30 30h30v30H30z' fill='%233b82f6' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content & CTA */}
            <div className="space-y-8 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 animate-fade-in-up shadow-lg">
                <Sparkles className="h-4 w-4 text-purple-600 animate-pulse" />
                <span className="text-sm font-bold text-blue-600">
                  {SITE_CONFIG.toolCount}+ Professional Tools
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight animate-fade-in-up leading-tight" style={{animationDelay: '0.1s'}}>
                <span className="block text-blue-600 drop-shadow-lg">
                  Free Online Tools
                </span>
                <span className="block text-gray-900 mt-3">
                  for Everyone
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed animate-fade-in-up font-medium max-w-2xl" style={{animationDelay: '0.2s'}}>
                Boost your productivity with our collection of
                <span className="text-blue-700 font-bold"> professional tools</span> for
                text manipulation, development, SEO, and content creation.
                <span className="block mt-3 text-base sm:text-lg text-gray-600">⚡ Fast • 🔒 Secure • ✓ No Registration Required</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <Link href="#tools">
                  <Button size="lg" className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 magnetic border-0 w-full sm:w-auto cursor-pointer">
                    <span className="relative z-10 flex items-center gap-3 font-bold">
                      <Rocket className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      Explore All Tools
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </Button>
                </Link>

                <Link href="/about">
                  <Button size="lg" variant="outline" className="group bg-white hover:bg-gray-50 px-10 py-7 text-lg rounded-2xl border-2 border-gray-300 hover:border-blue-500 transition-all duration-300 magnetic font-bold text-gray-700 hover:text-blue-600 w-full sm:w-auto cursor-pointer">
                    <Globe className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Stats Cards */}
            <div className="grid grid-cols-2 gap-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              {[
                { label: "Tools Available", value: `${SITE_CONFIG.toolCount}+`, icon: Grid3X3, bgColor: "bg-blue-500", lightBg: "bg-blue-50" },
                { label: "Always Free", value: "100%", icon: Star, bgColor: "bg-purple-500", lightBg: "bg-purple-50" },
                { label: "Privacy First", value: "Local", icon: Lock, bgColor: "bg-green-500", lightBg: "bg-green-50" },
                { label: "Users Worldwide", value: "100K+", icon: Users, bgColor: "bg-orange-500", lightBg: "bg-orange-50" }
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`${stat.lightBg} rounded-3xl p-8 group relative overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl border border-gray-200`}
                  style={{animationDelay: `${0.5 + index * 0.1}s`}}
                >
                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`inline-flex p-3 rounded-2xl ${stat.bgColor} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out shadow-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-4xl font-black text-gray-900 mb-2 group-hover:scale-105 transition-all duration-500 ease-out">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-semibold group-hover:text-gray-900 transition-all duration-500 ease-out">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-100 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-100 opacity-20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-lg border border-gray-200 mb-6">
              <Sparkles className="h-4 w-4 text-purple-600 animate-pulse" />
              <span className="text-sm font-bold text-gray-700">Our Advantages</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              Why Choose <span className="text-blue-600 font-black">Tools Hub</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the perfect blend of <span className="font-bold text-gray-900">speed, security, and simplicity</span> with our modern web-based tools
            </p>
          </div>

          {/* Features Grid - New Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon

              return (
                <div
                  key={feature.name}
                  className="group relative"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Card */}
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out border border-gray-100 overflow-hidden hover:-translate-y-2">
                    {/* Content Grid */}
                    <div className="relative z-10 flex items-start gap-6">
                      {/* Icon Section */}
                      <div className="flex-shrink-0">
                        <div className={`p-5 rounded-2xl ${feature.bgColor} shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out`}>
                          <Icon className="h-10 w-10 text-white" />
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 pt-1">
                        <h3 className={`text-2xl font-black text-gray-900 mb-3 group-hover:${feature.color} transition-all duration-500`}>
                          {feature.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-5 text-base">
                          {feature.description}
                        </p>

                        {/* Stats Badge */}
                        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-50 group-hover:bg-white border border-gray-200 group-hover:border-transparent group-hover:shadow-lg transition-all duration-500">
                          <div className="flex flex-col">
                            <span className={`text-3xl font-black ${feature.color}`}>
                              {feature.stats}
                            </span>
                            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                              {feature.benefit}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${feature.bgColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-b-3xl`}></div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-lg text-gray-600 mb-6">
              Ready to boost your productivity?
            </p>
            <Link href="#tools">
              <Button size="lg" className="group bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 font-bold cursor-pointer">
                <Rocket className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Start Using Tools Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section id="tools" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-orange-50">
        {/* Animated orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-200 opacity-20 rounded-full blur-3xl animate-float-bounce"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-200 opacity-20 rounded-full blur-3xl animate-float-bounce" style={{animationDelay: '2s'}}></div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white shadow-xl mb-6">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-bold">Most Popular</span>
              <Star className="h-4 w-4 fill-current" />
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              Trending <span className="text-orange-600 font-black">Tools</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join <span className="font-bold text-orange-600">100K+ users</span> who rely on these powerful tools every day
            </p>
          </div>

          {/* Tools Grid - Compact Card Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {POPULAR_TOOLS.slice(0, 6).map((tool, index) => {
              const toolData = ALL_TOOLS.find(t => t.href === tool.href)
              if (!toolData) return null
              const Icon = toolData.icon

              return (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-orange-200 overflow-hidden hover:-translate-y-1"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Popular badge for first item */}
                  {index === 0 && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                      #1 Popular
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-2xl bg-orange-100 mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500`}>
                      <Icon className={`h-8 w-8 ${toolData.color}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-all duration-500">
                      {toolData.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                      {toolData.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center text-orange-600 group-hover:text-orange-700 font-semibold text-sm transition-colors duration-500">
                      <span>Try now</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Link>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <Link href="/tools">
              <Button size="lg" variant="outline" className="group bg-white hover:bg-orange-500 px-10 py-6 text-base rounded-2xl border-2 border-orange-300 hover:border-orange-500 transition-all duration-500 font-bold hover:text-white shadow-lg hover:shadow-xl cursor-pointer">
                <span className="text-gray-700 group-hover:text-white transition-colors duration-500">View All {SITE_CONFIG.toolCount}+ Tools</span>
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* All Tools Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-blue-50">
        {/* Gentle floating orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 opacity-30 rounded-full blur-3xl animate-float-bounce"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 opacity-30 rounded-full blur-3xl animate-float-bounce" style={{animationDelay: '3s'}}></div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-lg border border-gray-200 mb-6">
              <Grid3X3 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-bold text-gray-700">Full Collection</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              Complete <span className="text-blue-600 font-black">Toolbox</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover all <span className="font-bold text-gray-900">{SITE_CONFIG.toolCount}+ powerful tools</span> organized by category
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-500 cursor-pointer ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              All Tools
            </button>
            {Object.values(CATEGORIES).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-500 cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-xl scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Tools Grid - Clean Card Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {filteredTools.slice(0, 12).map((tool, index) => {
              const Icon = tool.icon

              return (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="group relative bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 overflow-hidden hover:-translate-y-1"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className={`inline-flex p-3 rounded-xl bg-blue-100 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500`}>
                        <Icon className={`h-6 w-6 ${tool.color}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-all duration-500">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-500">
                        {tool.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-semibold text-sm mt-4 transition-colors duration-500">
                      <span>Explore</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl"></div>
                </Link>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <Link href="/tools">
              <Button size="lg" className="group bg-blue-600 hover:bg-blue-700 text-white px-12 py-7 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 font-bold border-0 hover:scale-105 cursor-pointer">
                <Search className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-500" />
                Browse All {SITE_CONFIG.toolCount}+ Tools
                <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
