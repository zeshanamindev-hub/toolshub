"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowLeft, 
  Share2, 
  BookOpen, 
  Heart, 
  Star,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Users,
  ChevronRight,
  Lightbulb,
  HelpCircle,
  Target
} from "lucide-react"

interface ToolPageLayoutProps {
  children: ReactNode
  toolName: string
  toolDescription: string
  toolIcon: React.ElementType
  category: string
  categoryHref?: string
  features?: string[]
  useCases?: string[]
  relatedTools?: Array<{
    name: string
    href: string
    icon: React.ElementType
    description: string
  }>
  tips?: string[]
  faqs?: Array<{
    question: string
    answer: string
  }>
}

export default function ToolPageLayout({
  children,
  toolName,
  toolDescription,
  toolIcon: ToolIcon,
  category,
  categoryHref = "/categories",
  features = [],
  useCases = [],
  relatedTools = [],
  tips = [],
  faqs = []
}: ToolPageLayoutProps) {
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${toolName} - Free Online Tool`,
        text: toolDescription,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/30 to-white">
      {/* Breadcrumb & Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link
                href="/tools"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                Tools
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link
                href={categoryHref}
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                {category}
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{toolName}</span>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="hidden sm:flex"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Link href="/tools">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  All Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Tool Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-blue-100 rounded-2xl">
                  <ToolIcon className="h-12 w-12 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                      {toolName}
                    </h1>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Zap className="h-3 w-3 mr-1" />
                      Free
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {toolDescription}
                  </p>
                  
                  {/* Key Features */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="h-4 w-4 mr-2 text-blue-600" />
                      100% Private
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-blue-600" />
                      Instant Results
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-blue-600" />
                      No Registration
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tool Interface */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Use the Tool
                </CardTitle>
                <CardDescription>
                  Start using the {toolName.toLowerCase()} below. All processing happens in your browser.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {children}
              </CardContent>
            </Card>

            {/* Features Section */}
            {features.length > 0 && (
              <Card className="shadow-sm border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-600" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Use Cases */}
            {useCases.length > 0 && (
              <Card className="shadow-sm border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    Use Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {useCases.map((useCase, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips Section */}
            {tips.length > 0 && (
              <Card className="shadow-sm border-gray-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <span className="text-blue-900">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* FAQ Section */}
            {faqs.length > 0 && (
              <Card className="shadow-sm border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index}>
                        <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <Card className="shadow-sm border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Related Tools</CardTitle>
                  <CardDescription>More tools you might find useful</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedTools.map((tool) => {
                    const RelatedIcon = tool.icon
                    return (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <RelatedIcon className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            {tool.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {tool.description}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </Link>
                    )
                  })}
                </CardContent>
              </Card>
            )}

            {/* Category Navigation */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Explore Category</CardTitle>
                <CardDescription>More {category.toLowerCase()} tools</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={categoryHref}>
                  <Button className="w-full" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse {category}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Support Section */}
            <Card className="shadow-sm border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Heart className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Loving our tools?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Help us spread the word and reach more users who need these tools.
                  </p>
                  <Button
                    onClick={handleShare}
                    size="sm"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Tool
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}