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
  CheckCircle
} from "lucide-react"

export const metadata = {
  title: "About Tools Hub - Free Online Text Manipulation Tools",
  description: "Learn about Tools Hub, our mission to provide free, fast, and reliable text manipulation tools. Discover our commitment to privacy and user experience.",
  keywords: "about tools hub, text tools, online tools, privacy, free tools",
}

export default function AboutPage() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "All tools work instantly in your browser without any server processing delays."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your text never leaves your browser. Everything is processed locally for maximum privacy."
    },
    {
      icon: Heart,
      title: "Completely Free",
      description: "All tools are free to use with no registration, subscriptions, or hidden fees."
    },
    {
      icon: Users,
      title: "User Friendly",
      description: "Clean, intuitive interface designed for both beginners and power users."
    }
  ]

  const tools = [
    "Word Counter - Count words, characters, sentences, and paragraphs",
    "Character Counter - Detailed character analysis with social media limits",
    "Case Converter - Convert between 11 different case formats",
    "Remove Extra Spaces - Clean up text with 8 different space removal options",
    "Reverse Text Generator - Reverse text in 8 different ways"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About Tools Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to providing the best free online text manipulation tools 
            with a focus on privacy, speed, and user experience.
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              At Tools Hub, we believe that powerful text manipulation tools should be accessible 
              to everyone. Our mission is to provide a comprehensive suite of free, fast, and 
              reliable text tools that work entirely in your browser.
            </p>
            <p>
              We're committed to creating tools that respect your privacy, work instantly, 
              and provide the functionality you need without unnecessary complexity or costs.
            </p>
          </CardContent>
        </Card>

        {/* What We Offer */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">What We Offer</CardTitle>
            <CardDescription>
              A comprehensive collection of text manipulation tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tools.map((tool, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{tool}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Why Choose Tools Hub?</CardTitle>
            <CardDescription>
              What makes our tools special
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Our Commitment */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Our Commitment</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Privacy & Security</h3>
              <p>
                All text processing happens locally in your browser. We never store, 
                transmit, or have access to your text data. Your privacy is our priority.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Always Free</h3>
              <p>
                Our core tools will always be free to use. We believe in making 
                powerful text tools accessible to everyone, regardless of budget.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Continuous Improvement</h3>
              <p>
                We're constantly working to improve our tools, add new features, 
                and enhance the user experience based on feedback from our community.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Technology */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Built with Modern Technology</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            <p className="mb-4">
              Tools Hub is built using cutting-edge web technologies to ensure 
              the best performance and user experience:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Next.js for fast, server-side rendered pages</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>React for interactive user interfaces</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>TypeScript for reliable, type-safe code</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Tailwind CSS for responsive, modern design</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-600 mb-6">
                Try our tools now and experience the difference of fast, 
                private, and reliable text manipulation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/">
                    Explore Tools
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}