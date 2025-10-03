import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ALL_TOOLS, CATEGORIES } from "@/lib/constants"

const category = CATEGORIES["developers"]
const categoryTools = ALL_TOOLS.filter(tool =>
  [
    "Regex Tester",
    "CSS Minifier",
    "JS Minifier",
    "JavaScript Obfuscator",
    "JSON Escape/Unescape",
    "HTML Escape/Unescape",
    "SQL Beautifier",
    "CSV to Markdown Table Converter",
    "Markdown Table Generator",
    "Percentage Calculator",
    "BMI Calculator"
  ].includes(tool.name)
)

export const metadata = {
  title: `${category.name} Tools - Free Online Utilities | Tools Hub`,
  description: `${category.description}. Access ${categoryTools.length} essential developer tools including regex tester, code minifiers, formatters, and utilities. All tools are free and work instantly in your browser.`,
  keywords: "developer tools, regex tester, code minifier, JSON formatter, CSS minifier, JS minifier, free online tools"
}

export default function DevelopersCategoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/categories"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Categories
          </Link>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {category.name} Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {category.description}. Browse our collection of {categoryTools.length} essential utilities for developers and programmers.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                {categoryTools.length} Tools Available
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                100% Free
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                Instant Results
              </span>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categoryTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Card key={tool.name} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-orange-50 transition-colors">
                      <Icon className={`h-6 w-6 ${tool.color}`} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={tool.href}>
                      Use Tool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Related Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Other Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(CATEGORIES).filter(cat => cat.id !== category.id).map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}