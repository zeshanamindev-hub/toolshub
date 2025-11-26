"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  Hash, 
  Type, 
  Scissors, 
  RotateCcw,
  ArrowRight,
  Shield,
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
  Grid3X3,
  TrendingUp,
  Star,
  Layers3,
  Zap,
  ChevronRight,
  Wand2,
  Target,
  Activity
} from "lucide-react"

const categories = [
  {
    id: "text-writing",
    name: "Text & Writing",
    description: "Powerful text analysis, transformation, and processing tools for writers and content creators",
    count: 14,
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    iconBg: "bg-blue-100",
    accent: "from-blue-500 to-indigo-600",
    icon: FileText,
    tools: [
      { name: "Word Counter", href: "/tools/word-counter", icon: FileText },
      { name: "Character Counter", href: "/tools/character-counter", icon: Hash },
      { name: "Case Converter", href: "/tools/case-converter", icon: Type },
      { name: "Remove Extra Spaces", href: "/tools/remove-spaces", icon: Scissors },
      { name: "Reverse Text", href: "/tools/reverse-text", icon: RotateCcw },
      { name: "Letter Counter", href: "/tools/letter-counter", icon: BarChart3 },
    ]
  },
  {
    id: "converters-encoding",
    name: "Converters & Encoding",
    description: "Convert between formats, encodings, and data representations with precision",
    count: 9,
    color: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    iconBg: "bg-purple-100",
    accent: "from-purple-500 to-pink-600",
    icon: Binary,
    tools: [
      { name: "URL Encoder/Decoder", href: "/tools/url-encoder", icon: LinkIcon },
      { name: "Base64 Converter", href: "/tools/base64-converter", icon: Binary },
      { name: "JSON Formatter", href: "/tools/json-formatter", icon: Braces },
      { name: "Text to ASCII", href: "/tools/text-to-ascii", icon: Binary },
      { name: "HTML Entities", href: "/tools/html-entities", icon: Code },
      { name: "Timestamp Converter", href: "/tools/timestamp-converter", icon: Clock },
    ]
  },
  {
    id: "generators",
    name: "Generators",
    description: "Generate secure passwords, QR codes, placeholder content, and creative assets",
    count: 8,
    color: "text-green-600",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    iconBg: "bg-green-100",
    accent: "from-green-500 to-emerald-600",
    icon: Wand2,
    tools: [
      { name: "Password Generator", href: "/tools/password-generator", icon: Lock },
      { name: "QR Code Generator", href: "/tools/qr-generator", icon: QrCode },
      { name: "Hash Generator", href: "/tools/hash-generator", icon: Shield },
      { name: "Lorem Ipsum Generator", href: "/tools/lorem-ipsum-generator", icon: FileText },
      { name: "Color Palette Generator", href: "/tools/color-palette-generator", icon: Palette },
      { name: "Random String", href: "/tools/random-string", icon: Shuffle },
    ]
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    description: "Essential utilities and debugging tools for developers and programmers",
    count: 11,
    color: "text-orange-600",
    bgColor: "bg-gradient-to-br from-orange-50 to-yellow-50",
    borderColor: "border-orange-200",
    iconBg: "bg-orange-100",
    accent: "from-orange-500 to-yellow-600",
    icon: Code,
    tools: [
      { name: "Regex Tester", href: "/tools/regex-tester", icon: Search },
      { name: "JSON Formatter", href: "/tools/json-formatter", icon: Braces },
      { name: "Base64 Converter", href: "/tools/base64-converter", icon: Binary },
      { name: "URL Encoder", href: "/tools/url-encoder", icon: LinkIcon },
      { name: "Hash Generator", href: "/tools/hash-generator", icon: Shield },
      { name: "Text Diff Checker", href: "/tools/text-diff-checker", icon: GitCompare },
    ]
  }
]

interface ToolsCategorySectionProps {
  showAll?: boolean
  maxCategories?: number
  title?: string
  subtitle?: string
}

export default function ToolsCategorySection({ 
  showAll = false, 
  maxCategories = 4,
  title = "Browse by Category",
  subtitle = "Discover our comprehensive collection of tools organized by functionality"
}: ToolsCategorySectionProps) {
  
  const displayCategories = showAll ? categories : categories.slice(0, maxCategories)
  const totalTools = categories.reduce((sum, category) => sum + category.count, 0)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-purple-200/40 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-green-200/40 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 right-1/3 w-20 h-20 bg-orange-200/40 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6 animate-fade-in-up">
            <Grid3X3 className="mr-2 h-4 w-4" />
            Tool Categories
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {subtitle}. Choose from {totalTools}+ professional tools designed for efficiency and precision.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {displayCategories.map((category, index) => {
            const CategoryIcon = category.icon
            return (
              <Card 
                key={category.id} 
                className={`group relative overflow-hidden border-2 ${category.borderColor} hover:border-transparent transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up`}
                style={{animationDelay: `${0.3 + index * 0.1}s`}}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Floating elements */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.accent} blur-xl animate-pulse`}></div>
                </div>

                <CardHeader className={`relative z-10 ${category.bgColor} border-b border-gray-100 group-hover:border-transparent transition-all duration-300`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        {/* Category Icon */}
                        <div className={`p-4 rounded-2xl ${category.iconBg} group-hover:shadow-lg transition-all duration-300 relative overflow-hidden`}>
                          <div className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                          <CategoryIcon className={`h-8 w-8 ${category.color} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                        </div>
                        
                        {/* Count Badge */}
                        <div className="flex flex-col items-center">
                          <div className={`text-3xl font-bold ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                            {category.count}
                          </div>
                          <div className="text-xs text-gray-500 font-medium">tools</div>
                        </div>
                      </div>
                      
                      <CardTitle className={`text-2xl ${category.color} mb-3 group-hover:text-gray-900 transition-colors duration-300`}>
                        {category.name}
                      </CardTitle>
                      <p className="text-base text-gray-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6 relative z-10 bg-white/80 backdrop-blur-sm">
                  {/* Tools Preview Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {category.tools.slice(0, 6).map((tool) => {
                      const ToolIcon = tool.icon
                      return (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 group-hover:hover:bg-white/60 transition-all duration-300 group/tool border border-transparent hover:border-gray-200 hover:shadow-sm"
                        >
                          <div className={`p-1.5 rounded-lg ${category.iconBg} group-hover/tool:shadow-md transition-all duration-200`}>
                            <ToolIcon className={`h-4 w-4 ${category.color} group-hover/tool:scale-110 transition-transform duration-200`} />
                          </div>
                          <span className="text-sm font-medium text-gray-700 group-hover/tool:text-gray-900 transition-colors truncate">
                            {tool.name}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                  
                  {/* More tools indicator */}
                  {category.tools.length > 6 && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 animate-fade-in-up">
                      <Activity className="h-4 w-4" />
                      <span>+{category.tools.length - 6} more tools available</span>
                    </div>
                  )}

                  {/* Category CTA Button */}
                  <Button 
                    asChild 
                    className={`w-full group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 bg-gradient-to-r ${category.accent} hover:shadow-xl border-0 text-white font-bold`}
                  >
                    <Link href={`/categories/${category.id}`}>
                      <Target className="mr-2 h-4 w-4" />
                      Explore {category.name}
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>

                {/* Hover effect border */}
                <div className={`absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-gradient-to-r group-hover:${category.accent} transition-all duration-300 pointer-events-none`}></div>
              </Card>
            )
          })}
        </div>

        {/* Bottom Stats Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                  <Layers3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">{totalTools}+</div>
              <div className="text-gray-600 font-medium">Total Tools</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors duration-300">
                  <Grid3X3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">{categories.length}</div>
              <div className="text-gray-600 font-medium">Categories</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div className="text-gray-600 font-medium">Free to Use</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-orange-100 group-hover:bg-orange-200 transition-colors duration-300">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-gray-600 font-medium">Available</div>
            </div>
          </div>
        </div>

        {/* View All Categories CTA */}
        {!showAll && categories.length > maxCategories && (
          <div className="text-center mt-12 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <Button 
              size="lg" 
              asChild 
              className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-bold"
            >
              <Link href="/categories">
                <Star className="mr-2 h-5 w-5 animate-pulse" />
                View All Categories
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}