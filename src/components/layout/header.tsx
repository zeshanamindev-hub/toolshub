"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Menu, X, Wrench, ChevronDown, Search, Flame, Grid3X3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { POPULAR_TOOLS, CATEGORIES, NAVIGATION_LINKS, SITE_CONFIG } from "@/lib/constants"

// Convert categories object to array for display
const mainCategories = Object.values(CATEGORIES).map(category => ({
  ...category,
  count: getToolCountForCategory(category.id)
}))

// Helper function to get tool count for each category (you can make this dynamic later)
function getToolCountForCategory(categoryId: string): number {
  const counts: Record<string, number> = {
    "text-writing": 12,
    "converters": 15, 
    "generators": 8,
    "developers": 10,
    "security": 6
  }
  return counts[categoryId] || 0
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
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
  const filteredPopularTools = POPULAR_TOOLS.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative p-3 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <Wrench className="h-7 w-7 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  Tools Hub
                </span>
                <span className="text-xs font-medium text-gray-500 -mt-1">
                  {SITE_CONFIG.toolCount}+ Free Tools
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all duration-200 ${searchFocused ? 'text-blue-500 scale-110' : 'text-gray-400'}`} />
              <Input
                type="text"
                placeholder={`Search ${SITE_CONFIG.toolCount}+ tools...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="pl-12 pr-4 py-3 w-full bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
              />
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredPopularTools.length > 0 ? (
                      filteredPopularTools.map((tool) => (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          onClick={() => setSearchQuery("")}
                        >
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          <div>
                            <div className="font-medium text-gray-900 group-hover:text-blue-600">
                              {tool.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {tool.description}
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        No tools found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {NAVIGATION_LINKS.main.slice(0, 2).map((item) => (
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
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors h-auto px-4 py-2 gap-1 rounded-lg hover:bg-blue-50"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onMouseEnter={() => setToolsDropdownOpen(true)}
              >
                <Grid3X3 className="h-4 w-4" />
                <span>Tools</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>

              {/* Mega Dropdown */}
              {toolsDropdownOpen && (
                <div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 w-[700px] z-50"
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                >

                  {/* Popular Tools Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Flame className="h-5 w-5 text-orange-500" />
                      <h3 className="text-lg font-semibold text-gray-900">Popular Tools</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {POPULAR_TOOLS.slice(0, 8).map((tool) => (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          onClick={() => setToolsDropdownOpen(false)}
                        >
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 group-hover:bg-blue-600" />
                          <div>
                            <div className="font-medium text-gray-900 group-hover:text-blue-600">
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
                      href="/tools" 
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
              {NAVIGATION_LINKS.main.slice(0, 2).map((item) => (
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
                  {POPULAR_TOOLS.slice(0, 6).map((tool) => (
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