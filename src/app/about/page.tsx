import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Target,
  Users,
  Shield,
  Zap,
  Heart,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Globe,
  Clock,
  Award
} from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export const metadata: Metadata = {
  title: "About Tools Hub | Free Online Tools for Developers & Content Creators",
  description: "Discover Tools Hub - your trusted platform for 50+ free online tools. Fast, privacy-focused, and always free. Text manipulation, converters, generators, and more. No signup required.",
  keywords: [
    "about tools hub",
    "free online tools",
    "text manipulation tools",
    "online converters",
    "developer tools",
    "privacy-focused tools",
    "no signup tools",
    "web-based utilities"
  ],
  authors: [{ name: "Tools Hub" }],
  creator: "Tools Hub",
  publisher: "Tools Hub",
  openGraph: {
    title: "About Tools Hub | 50+ Free Online Tools for Everyone",
    description: "Learn about our mission to provide fast, free, and privacy-focused online tools for developers, writers, and content creators worldwide.",
    url: `${SITE_CONFIG.url}/about`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Tools Hub | Free Online Tools",
    description: "Discover our mission to provide 50+ free, privacy-focused online tools for everyone.",
    creator: "@toolshub",
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
}

export default function AboutPage() {
  const stats = [
    {
      icon: Sparkles,
      value: `${SITE_CONFIG.toolCount}+`,
      label: "Free Tools",
      color: "text-blue-600"
    },
    {
      icon: Users,
      value: "100K+",
      label: "Monthly Users",
      color: "text-purple-600"
    },
    {
      icon: Globe,
      value: "150+",
      label: "Countries",
      color: "text-green-600"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Available",
      color: "text-orange-600"
    }
  ]

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      description: "All tools process data instantly in your browser with zero server delays. Experience real-time results for maximum productivity."
    },
    {
      icon: Shield,
      title: "Privacy-First Approach",
      description: "Your data never leaves your device. 100% client-side processing ensures complete privacy and security for all operations."
    },
    {
      icon: Heart,
      title: "Completely Free Forever",
      description: "All ${SITE_CONFIG.toolCount}+ tools are free with no registration, subscriptions, paywalls, or hidden fees. Access everything instantly."
    },
    {
      icon: Users,
      title: "User-Friendly Design",
      description: "Intuitive interface crafted for everyone - from beginners to power users. Clean design, simple controls, powerful results."
    }
  ]

  const toolCategories = [
    {
      title: "Text & Writing Tools",
      description: "Word counter, character counter, case converter, text transformer, and more",
      count: 10
    },
    {
      title: "Converters & Encoders",
      description: "ASCII, Base64, URL encoding, HTML entities, timestamp conversion",
      count: 9
    },
    {
      title: "Generators",
      description: "Password generator, hash generator, QR codes, Lorem Ipsum, color palettes",
      count: 8
    },
    {
      title: "SEO & Marketing Tools",
      description: "Meta tags, Open Graph, robots.txt, sitemap generator, keyword density",
      count: 10
    },
    {
      title: "Developer Utilities",
      description: "JSON formatter, CSS/JS minifier, regex tester, code beautifier",
      count: 12
    },
    {
      title: "Calculators",
      description: "BMI calculator, percentage calculator, and more practical calculators",
      count: 3
    }
  ]

  const values = [
    {
      icon: Award,
      title: "Quality First",
      description: "Every tool is meticulously crafted and tested to ensure accuracy, reliability, and excellent user experience."
    },
    {
      icon: Shield,
      title: "Privacy Guaranteed",
      description: "We never collect, store, or transmit your data. All processing happens locally on your device for complete privacy."
    },
    {
      icon: Sparkles,
      title: "Innovation Driven",
      description: "Constantly evolving with new tools and features based on user feedback and emerging technology trends."
    },
    {
      icon: Globe,
      title: "Globally Accessible",
      description: "Available 24/7 from anywhere in the world. No geographical restrictions, no VPN required."
    }
  ]

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tools Hub",
    description: "Free online tools for text manipulation, converters, generators, and developer utilities",
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    sameAs: [
      "https://twitter.com/toolshub",
      "https://github.com/toolshub"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "hello@toolshub.com",
      url: `${SITE_CONFIG.url}/contact`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-6">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-bold text-gray-700">About Us</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              About Tools Hub
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your trusted platform for <strong>{SITE_CONFIG.toolCount}+ free online tools</strong>.
              Fast, privacy-focused, and always free. Empowering developers, writers, and content creators worldwide.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const StatIcon = stat.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <StatIcon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Mission & Story */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-3xl">Our Mission & Story</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-6 text-lg leading-relaxed">
              <p>
                At <strong>Tools Hub</strong>, we believe that powerful online utilities should be accessible to everyone, everywhere. Our mission is to provide a comprehensive suite of <strong>free, fast, and reliable tools</strong> that empower developers, content creators, marketers, students, and professionals to work more efficiently without compromising their privacy or breaking the bank.
              </p>
              <p>
                Founded in 2024, Tools Hub was born from a simple observation: most online tools either charge premium fees for basic functionality, require tedious signups, or compromise user privacy by processing data on remote servers. We set out to change that by creating a platform where <strong>every tool is 100% free, works instantly in your browser, and respects your privacy completely</strong>.
              </p>
              <p>
                Today, Tools Hub serves over <strong>100,000+ users monthly</strong> from <strong>150+ countries</strong>, providing {SITE_CONFIG.toolCount}+ tools across multiple categories including text manipulation, converters, generators, SEO utilities, and developer tools. Our commitment remains unwavering: deliver exceptional tools that are fast, private, and accessible to all.
              </p>
            </CardContent>
          </Card>

          {/* Tool Categories */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl">What We Offer</CardTitle>
              <CardDescription className="text-base">
                A comprehensive collection of {SITE_CONFIG.toolCount}+ free online tools across 6 major categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {toolCategories.map((category, index) => (
                  <div key={index} className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                      <span className="px-3 py-1 bg-white rounded-full text-sm font-bold text-blue-600">
                        {category.count} tools
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Why Choose Us */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl">Why Choose Tools Hub?</CardTitle>
              <CardDescription className="text-base">
                What makes us different from other online tool providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100">
                          <Icon className="h-7 w-7 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Core Values */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl">Our Core Values</CardTitle>
              <CardDescription className="text-base">
                The principles that guide everything we do at Tools Hub
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon
                  return (
                    <div key={index} className="p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                      <Icon className="h-10 w-10 text-purple-600 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl">Built with Modern Technology</CardTitle>
              <CardDescription className="text-base">
                Leveraging cutting-edge web technologies for optimal performance and security
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Tools Hub is built using the latest web technologies to ensure lightning-fast performance, rock-solid security, and an exceptional user experience across all devices.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="font-bold">Next.js 15 - Fast, SEO-optimized framework</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-purple-50">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  <span className="font-bold">React 19 - Modern UI library</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-green-50">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="font-bold">TypeScript - Type-safe development</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-orange-50">
                  <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  <span className="font-bold">Tailwind CSS - Responsive design</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-0 text-white">
            <CardContent className="p-12 text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join 100,000+ users worldwide and experience the power of our {SITE_CONFIG.toolCount}+ free online tools. No signup required, no credit card needed, no strings attached.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
                  <Link href="/" className="group">
                    Explore All Tools
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}