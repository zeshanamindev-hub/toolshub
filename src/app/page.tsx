"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import StructuredData from "@/components/structured-data"
import GoogleAdSlot from "@/components/ads/google-ad-slot"
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
    gradient: "from-yellow-400 to-orange-500",
    stats: "< 100ms",
    benefit: "Processing Time"
  },
  {
    name: "Privacy First",
    description: "Your data never leaves your browser. Everything is processed locally with zero server communication for maximum security.",
    icon: Shield,
    color: "text-green-600",
    gradient: "from-green-400 to-emerald-500",
    stats: "100%",
    benefit: "Local Processing"
  },
  {
    name: "Mobile Ready",
    description: "Perfect experience on any device - desktop, tablet, or mobile. Responsive design that adapts to your screen.",
    icon: Smartphone,
    color: "text-blue-600",
    gradient: "from-blue-400 to-indigo-500",
    stats: "All Devices",
    benefit: "Supported"
  },
  {
    name: "Always Free",
    description: "No subscriptions, no hidden fees, no catch. All tools are completely free to use without any limitations.",
    icon: Star,
    color: "text-purple-600",
    gradient: "from-purple-400 to-pink-500",
    stats: "Forever",
    benefit: "100% Free"
  }
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Categorize tools based on their name and functionality
  const getToolCategory = (tool: typeof ALL_TOOLS[0]): string => {
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

      {/* Hero Section - Modern 2025-26 Design */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Gradient Mesh Background */}
        <div className="absolute inset-0 gradient-mesh opacity-40"></div>

        {/* Glassmorphic Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-float-bounce"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/25 to-pink-400/25 rounded-full blur-3xl animate-float-bounce" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-float-bounce" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gradient-to-br from-pink-400/15 to-orange-400/15 rounded-full blur-3xl animate-float-bounce" style={{animationDelay: '1s'}}></div>
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
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-gray-200 animate-fade-in-up shadow-lg backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-purple-600 animate-pulse" />
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {SITE_CONFIG.toolCount}+ Professional Tools
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight animate-fade-in-up leading-tight" style={{animationDelay: '0.1s'}}>
                <span className="block text-gradient drop-shadow-lg">
                  Free Online Tools
                </span>
                <span className="block text-gray-900 mt-3">
                  for Everyone
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed animate-fade-in-up font-medium max-w-2xl" style={{animationDelay: '0.2s'}}>
                Boost your productivity with our collection of
                <span className="text-gradient font-bold"> professional tools</span> for
                text manipulation, development, SEO, and content creation.
                <span className="block mt-3 text-base sm:text-lg text-gray-600">⚡ Fast • 🔒 Secure • ✓ No Registration Required</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <Link href="#tools">
                  <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-7 text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 magnetic border-0 w-full sm:w-auto cursor-pointer">
                    <span className="relative z-10 flex items-center gap-3 font-bold">
                      <Rocket className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      Explore All Tools
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>

                <Link href="/about">
                  <Button size="lg" variant="outline" className="group bg-white/80 backdrop-blur-sm hover:bg-white px-10 py-7 text-lg rounded-2xl border-2 border-gray-300 hover:border-purple-500 transition-all duration-300 magnetic font-bold text-gray-700 hover:text-purple-600 w-full sm:w-auto cursor-pointer">
                    <Globe className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Stats with Glassmorphism */}
            <div className="grid grid-cols-2 gap-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              {[
                { label: "Tools Available", value: `${SITE_CONFIG.toolCount}+`, icon: Grid3X3, gradient: "from-blue-500 to-indigo-500" },
                { label: "Always Free", value: "100%", icon: Star, gradient: "from-purple-500 to-pink-500" },
                { label: "Privacy First", value: "Local", icon: Lock, gradient: "from-green-500 to-emerald-500" },
                { label: "Users Worldwide", value: "100K+", icon: Users, gradient: "from-orange-500 to-red-500" }
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-3xl p-8 group relative overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
                  style={{animationDelay: `${0.5 + index * 0.1}s`}}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 ease-out`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-4xl font-black text-gradient mb-2 group-hover:scale-105 transition-all duration-500 ease-out">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-semibold group-hover:text-gray-900 transition-all duration-500 ease-out">{stat.label}</div>
                  </div>

                  {/* Floating decoration */}
                  <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${stat.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-500 ease-out`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Ad Placement 1 - After Hero Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Advertisement</span>
          </div>
          <div className="glass-card rounded-3xl p-6 border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[280px]">
            <GoogleAdSlot slot="homepage-top" />
          </div>
        </div>
      </section>

      {/* Features Section - Completely Revamped */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-lg border border-gray-200 mb-6">
              <Sparkles className="h-4 w-4 text-purple-600 animate-pulse" />
              <span className="text-sm font-bold text-gray-700">Our Advantages</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              Why Choose <span className="text-gradient">Tools Hub</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the perfect blend of <span className="font-bold text-gray-900">speed, security, and simplicity</span> with our modern web-based tools
            </p>
          </div>

          {/* Features Grid - New Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={feature.name}
                  className="group relative"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Card */}
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out border border-gray-100 overflow-hidden hover:-translate-y-2">
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                    {/* Content Grid */}
                    <div className="relative z-10 flex items-start gap-6">
                      {/* Icon Section */}
                      <div className="flex-shrink-0">
                        <div className={`p-5 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out`}>
                          <Icon className="h-10 w-10 text-white" />
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 pt-1">
                        <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-gradient transition-all duration-500">
                          {feature.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-5 text-base">
                          {feature.description}
                        </p>

                        {/* Stats Badge */}
                        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-50 group-hover:bg-white border border-gray-200 group-hover:border-transparent group-hover:shadow-lg transition-all duration-500">
                          <div className="flex flex-col">
                            <span className={`text-3xl font-black bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                              {feature.stats}
                            </span>
                            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                              {feature.benefit}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative corner element */}
                    <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br ${feature.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>

                    {/* Accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-b-3xl`}></div>
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
              <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 font-bold cursor-pointer">
                <Rocket className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Start Using Tools Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Tools Section - Revamped with Card Stack Design */}
      <section id="tools" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Vibrant gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50"></div>

        {/* Animated gradient orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-300/20 to-pink-300/20 rounded-full blur-3xl animate-float-bounce"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-float-bounce" style={{animationDelay: '2s'}}></div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-xl mb-6 animate-pulse">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-bold">Most Popular</span>
              <Star className="h-4 w-4 fill-current" />
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              Trending <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">Tools</span>
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
                  className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden hover:-translate-y-1"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Popular badge for first item */}
                  {index === 0 && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                      #1 Popular
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-100 to-pink-100 mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500`}>
                      <Icon className={`h-8 w-8 ${toolData.color}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gradient transition-all duration-500">
                      {toolData.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                      {toolData.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center text-orange-600 group-hover:text-pink-600 font-semibold text-sm transition-colors duration-500">
                      <span>Try now</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Link>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <Link href="/tools">
              <Button size="lg" variant="outline" className="group bg-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 px-10 py-6 text-base rounded-2xl border-2 border-orange-300 hover:border-transparent transition-all duration-500 font-bold hover:text-white shadow-lg hover:shadow-xl cursor-pointer">
                <span className="text-gray-700 group-hover:text-white transition-colors duration-500">View All {SITE_CONFIG.toolCount}+ Tools</span>
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Placement 2 - After Trending Tools */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50/30 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Advertisement</span>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-dashed border-purple-200 flex items-center justify-center min-h-[280px]">
            <GoogleAdSlot slot="homepage-middle" />
          </div>
        </div>
      </section>

      {/* All Tools Section - Revamped with Soft, Modern Design */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50"></div>

        {/* Gentle floating orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-float-bounce"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-float-bounce" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-indigo-100/20 via-purple-100/20 to-pink-100/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-lg border border-gray-200 mb-6">
              <Grid3X3 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-bold text-gray-700">Full Collection</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              Complete <span className="text-gradient">Toolbox</span>
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
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md'
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
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md'
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
                  className="group relative bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-500 overflow-hidden hover:-translate-y-1"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500`}>
                        <Icon className={`h-6 w-6 ${tool.color}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-gradient transition-all duration-500">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-500">
                        {tool.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-blue-600 group-hover:text-purple-600 font-semibold text-sm mt-4 transition-colors duration-500">
                      <span>Explore</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Bottom gradient accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl"></div>
                </Link>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <Link href="/tools">
              <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-7 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 font-bold border-0 hover:scale-105 cursor-pointer">
                <Search className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-500" />
                Browse All {SITE_CONFIG.toolCount}+ Tools
                <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Placement 3 - Before Footer */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Advertisement</span>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-dashed border-blue-200 flex items-center justify-center min-h-[280px]">
            <GoogleAdSlot slot="homepage-bottom" />
          </div>
        </div>
      </section>
    </>
  )
}
