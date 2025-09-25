"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Menu, X, Wrench, ChevronDown, Search, Flame, Grid3X3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Popular/Featured tools that appear in the mega dropdown
const popularTools = [
  { name: "Word Counter", href: "/tools/word-counter", description: "Count words, characters & more" },
  { name: "JSON Formatter", href: "/tools/json-formatter", description: "Format & validate JSON" },
  { name: "QR Code Generator", href: "/tools/qr-generator", description: "Generate QR codes" },
  { name: "URL Encoder", href: "/tools/url-encoder", description: "Encode/decode URLs" },
  { name: "Hash Generator", href: "/tools/hash-generator", description: "Generate secure hashes" },
  { name: "Regex Tester", href: "/tools/regex-tester", description: "Test regular expressions" },
  { name: "Base64 Converter", href: "/tools/base64-converter", description: "Encode/decode Base64" },
  { name: "Password Generator", href: "/tools/password-generator", description: "Generate secure passwords" },
]

// Main categories with tool counts (will be dynamic in the future)
const mainCategories = [
  { name: "Text & Writing", count: 12, href: "/categories/text", description: "Word counters, case converters, text analysis" },
  { name: "Converters", count: 15, href: "/categories/converters", description: "URL, Base64, ASCII, HTML entities" },
  { name: "Generators", count: 8, href: "/categories/generators", description: "Passwords, QR codes, lorem ipsum" },
  { name: "Code & Development", count: 10, href: "/categories/development", description: "Regex testing, JSON formatting" },
  { name: "Security & Hash", count: 6, href: "/categories/security", description: "Hash generators, encryption tools" },
  { name: "Design & Media", count: 5, href: "/categories/design", description: "Color palettes, image tools" },
]

const navigation = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Filter popular tools based on search
  const filteredPopularTools = popularTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Wrench className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">Tools Hub</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Tools Mega Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <Button 
                variant="ghost" 
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors h-auto px-3 py-2 gap-1"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onMouseEnter={() => setToolsDropdownOpen(true)}
              >
                <span>Tools</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>

              {/* Mega Dropdown */}
              {toolsDropdownOpen && (
                <div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-[800px] z-50"
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                >
                  {/* Search Section */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Search 200+ tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-3 w-full text-lg border-2 border-gray-200 focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Popular Tools Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Flame className="h-5 w-5 text-orange-500" />
                      <h3 className="text-lg font-semibold text-gray-900">Popular Tools</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {(searchQuery ? filteredPopularTools : popularTools).slice(0, 8).map((tool) => (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          onClick={() => setToolsDropdownOpen(false)}
                        >
                          <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2 group-hover:bg-primary/80" />
                          <div>
                            <div className="font-medium text-gray-900 group-hover:text-primary">
                              {tool.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {tool.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Categories Section */}
                  {!searchQuery && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Grid3X3 className="h-5 w-5 text-blue-500" />
                        <h3 className="text-lg font-semibold text-gray-900">Browse Categories</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {mainCategories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-primary hover:bg-primary/5 transition-all group"
                            onClick={() => setToolsDropdownOpen(false)}
                          >
                            <div>
                              <div className="font-medium text-gray-900 group-hover:text-primary">
                                {category.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {category.description}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-primary">
                              <span className="text-sm font-medium">{category.count}</span>
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <Link 
                      href="/categories" 
                      className="text-sm text-primary hover:text-primary/80 font-medium"
                      onClick={() => setToolsDropdownOpen(false)}
                    >
                      Browse All Categories
                    </Link>
                    <Link 
                      href="/tools-list" 
                      className="text-sm text-primary hover:text-primary/80 font-medium"
                      onClick={() => setToolsDropdownOpen(false)}
                    >
                      A-Z Tool List
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              About
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  className="pl-10 pr-4 py-2"
                />
              </div>

              {/* Mobile Navigation Links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-base font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <Link
                href="/about"
                className="block py-2 text-base font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              {/* Mobile Popular Tools */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <h4 className="font-semibold text-gray-900">Popular Tools</h4>
                </div>
                <div className="space-y-2">
                  {popularTools.slice(0, 6).map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="block py-2 text-sm text-gray-600 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Grid3X3 className="h-4 w-4 text-blue-500" />
                  <h4 className="font-semibold text-gray-900">Categories</h4>
                </div>
                <div className="space-y-2">
                  {mainCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center justify-between py-2 text-sm text-gray-600 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{category.name}</span>
                      <span className="text-xs text-primary">({category.count})</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}