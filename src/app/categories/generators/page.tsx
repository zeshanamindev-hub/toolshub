import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ALL_TOOLS, CATEGORIES } from "@/lib/constants"

const category = CATEGORIES["generators"]
const categoryTools = ALL_TOOLS.filter(tool =>
  [
    "Password Generator",
    "Hash Generator",
    "QR Code Generator",
    "Lorem Ipsum Generator",
    "Lorem Ipsum with Custom Words",
    "Dummy JSON Generator",
    "Color Palette Generator",
    "Random String Generator"
  ].includes(tool.name)
)

export const metadata = {
  title: `${category.name} Tools - Free Online Utilities | Tools Hub`,
  description: `${category.description}. Access ${categoryTools.length} professional generator tools including password generator, QR code generator, lorem ipsum, and more. All tools are free and work instantly in your browser.`,
  keywords: "generators, password generator, QR code generator, lorem ipsum, color palette, random string, free online tools"
}

export default function GeneratorsCategoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/categories"
            className="inline-flex items-center text-blue-600 hover:text-blue-700/80 transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Categories
          </Link>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {category.name} Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {category.description}. Browse our collection of {categoryTools.length} powerful content generation utilities.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                {categoryTools.length} Tools Available
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
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
                    <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-blue-100 transition-colors">
                      <Icon className={`h-6 w-6 ${tool.color}`} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{tool.name}</CardTitle>
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
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
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