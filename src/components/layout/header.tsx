"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, Wrench, ChevronDown, Search, Flame, Grid3X3, ArrowRight, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { POPULAR_TOOLS, ALL_TOOLS, CATEGORIES, NAVIGATION_LINKS, SITE_CONFIG } from "@/lib/constants"

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
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false)
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesDropdownOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle Ctrl+/ keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === '/') {
        event.preventDefault()
        const searchInput = searchRef.current?.querySelector('input')
        if (searchInput) {
          searchInput.focus()
          setSearchFocused(true)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])


  // Filter all tools based on search with flexible matching
  const filteredTools = ALL_TOOLS.filter(tool => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return false

    const name = tool.name.toLowerCase()
    const description = tool.description.toLowerCase()

    // Exact matches get higher priority
    if (name.includes(query) || description.includes(query)) return true

    // Fuzzy matching - check if query words are in the tool
    const queryWords = query.split(' ')
    return queryWords.some(word =>
      name.includes(word) || description.includes(word)
    )
  }).slice(0, 12) // Limit to 12 results for performance

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-200/30 dark:border-gray-700/30 sticky top-0 z-50">
      {/* Top Branding Bar */}
      <div className="bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-sm border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-2">
            <div className="flex items-center space-x-2 text-white text-sm font-medium">
              <Flame className="h-4 w-4 text-orange-300" />
              <span>Tools Hub - 33+ Free Online Tools</span>
              <div className="hidden sm:flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs text-blue-100">Always Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex w-full items-center justify-between py-2">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-4 group" aria-label="Tools Hub Home">
              <div className="relative p-3 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-xl group-hover:shadow-2xl ring-2 ring-blue-500/20 group-hover:ring-blue-500/40">
                <Wrench className="h-8 w-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent group-hover:from-blue-800 group-hover:via-indigo-800 group-hover:to-purple-800 transition-all duration-300">
                Tools Hub
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-start lg:space-x-0">
            {NAVIGATION_LINKS.main.slice(1, 2).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group px-3 py-2.5"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {/* Tools Mega Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group px-5 py-2.5 gap-2 flex items-center"
                onClick={() => {
                  setToolsDropdownOpen(!toolsDropdownOpen)
                  setCategoriesDropdownOpen(false)
                }}
                onMouseEnter={() => {
                  setToolsDropdownOpen(true)
                  setCategoriesDropdownOpen(false)
                }}
                aria-expanded={toolsDropdownOpen}
                aria-haspopup="true"
              >
                <Wrench className="h-4 w-4" />
                <span>Tools</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </button>

              {/* Mega Dropdown */}
              {toolsDropdownOpen && (
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-200/50 dark:border-gray-600/50 p-8 w-[750px] z-50"
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                >

                  {/* Popular Tools Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-orange-100 rounded-xl">
                        <Flame className="h-5 w-5 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Popular Tools</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {POPULAR_TOOLS.slice(0, 8).map((tool) => (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/80 hover:shadow-md transition-all duration-300 group border border-transparent hover:border-blue-100"
                          onClick={() => setToolsDropdownOpen(false)}
                        >
                          <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mt-2 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300" />
                          <div>
                            <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                              {tool.name}
                            </div>
                            <div className="text-sm text-gray-600 group-hover:text-gray-700 mt-1">
                              {tool.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="pt-4 border-t border-gray-200/50 flex justify-center">
                    <Link
                      href="/tools"
                      className="text-center py-3 px-6 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800 font-semibold rounded-xl transition-all duration-300 hover:shadow-md"
                      onClick={() => setToolsDropdownOpen(false)}
                    >
                      View All Tools A-Z
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group px-5 py-2.5 gap-2 flex items-center"
                onClick={() => {
                  setCategoriesDropdownOpen(!categoriesDropdownOpen)
                  setToolsDropdownOpen(false)
                }}
                onMouseEnter={() => {
                  setCategoriesDropdownOpen(true)
                  setToolsDropdownOpen(false)
                }}
                aria-expanded={categoriesDropdownOpen}
                aria-haspopup="true"
              >
                <FolderOpen className="h-4 w-4" />
                <span>Categories</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </button>

              {/* Categories Dropdown */}
              {categoriesDropdownOpen && (
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-200/50 dark:border-gray-600/50 p-8 w-[600px] z-50"
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                >

                  {/* Categories Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-100 rounded-xl">
                        <Grid3X3 className="h-5 w-5 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Browse Categories</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {mainCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="flex items-center justify-between p-5 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50/80 hover:shadow-lg transition-all duration-300 group"
                          onClick={() => setCategoriesDropdownOpen(false)}
                        >
                          <div>
                            <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                              {category.name}
                            </div>
                            <div className="text-sm text-gray-600 group-hover:text-gray-700 mt-1">
                              {category.description}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700">
                            <span className="text-sm font-bold bg-blue-100 group-hover:bg-blue-200 px-2 py-1 rounded-full transition-colors">{category.count}</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="pt-4 border-t border-gray-200/50 flex justify-center">
                    <Link
                      href="/categories"
                      className="text-center py-3 px-6 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 font-semibold rounded-xl transition-all duration-300 hover:shadow-md"
                      onClick={() => setCategoriesDropdownOpen(false)}
                    >
                      Browse All Categories
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group px-5 py-2.5"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
          <div className="flex gap-2">
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-sm">
              <div className="relative w-full group" ref={searchRef}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all duration-300 z-10 ${searchFocused || searchQuery ? 'text-blue-600 scale-110' : 'text-gray-400'}`} />
                  <Input
                    type="text"
                    placeholder={`Search ${SITE_CONFIG.toolCount}+ tools...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        router.push(`/tools?q=${encodeURIComponent(searchQuery.trim())}`)
                        setSearchQuery("")
                        setSearchFocused(false)
                      }
                    }}
                    onFocus={() => setSearchFocused(true)}
                    className="pl-12 pr-16 py-6 w-full bg-white/80 backdrop-blur-md border-2 border-gray-200/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-2xl transition-all duration-300 hover:bg-white/95 hover:border-gray-300/70 text-base font-medium"
                    aria-label="Search tools"
                  />
                  {!searchQuery && !searchFocused && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 font-medium pointer-events-none">
                      Ctrl+/
                    </div>
                  )}
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("")
                        setSearchFocused(false)
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 z-10"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
                {searchFocused && searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-600/50 p-6 z-50 max-h-96 overflow-hidden">
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {filteredTools.length > 0 ? (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-semibold text-gray-700">
                              {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found
                            </div>
                            <div className="text-xs text-gray-500">
                              Press Enter to search all tools
                            </div>
                          </div>
                          {filteredTools.map((tool) => {
                            const Icon = tool.icon
                            return (
                              <Link
                                key={tool.name}
                                href={tool.href}
                                className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/80 hover:shadow-md transition-all duration-300 group border border-transparent hover:border-blue-100"
                                onClick={() => setSearchQuery("")}
                              >
                                <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                                  <Icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                                    {tool.name}
                                  </div>
                                  <div className="text-sm text-gray-600 group-hover:text-gray-700 mt-1 line-clamp-2">
                                    {tool.description}
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300 mt-2" />
                              </Link>
                            )
                          })}
                          {filteredTools.length >= 12 && (
                            <div className="text-center pt-4 border-t border-gray-200">
                              <Link
                                href={`/tools?q=${encodeURIComponent(searchQuery)}`}
                                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                onClick={() => setSearchQuery("")}
                              >
                                View all results
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Search className="h-12 w-10 mx-auto mb-3 opacity-50" />
                          <div className="font-medium mb-1">No tools found</div>
                          <div className="text-sm">Try different keywords like "text", "convert", or "generate"</div>
                          <div className="flex flex-wrap gap-2 justify-center mt-4">
                            {['word counter', 'json', 'password', 'qr code', 'base64'].map((suggestion) => (
                              <button
                                key={suggestion}
                                onClick={() => setSearchQuery(suggestion)}
                                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 dark:border-gray-600/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Search */}
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 z-10 ${searchQuery ? 'text-blue-600' : 'text-gray-400'}`} />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      router.push(`/tools?q=${encodeURIComponent(searchQuery.trim())}`)
                      setSearchQuery("")
                      setMobileMenuOpen(false)
                    }
                  }}
                  className="pl-12 pr-12 py-6 bg-gray-50/80 border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 transition-all duration-300 text-base font-medium"
                  aria-label="Search tools"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 z-10"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {NAVIGATION_LINKS.main.slice(0, 2).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-3 px-4 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <Link
                  href="/about"
                  className="block py-3 px-4 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </div>

              {/* Mobile Popular Tools */}
              <div className="pt-6 border-t border-gray-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Flame className="h-4 w-4 text-orange-500" />
                  </div>
                  <h4 className="font-bold text-gray-900">Popular Tools</h4>
                </div>
                <div className="space-y-1">
                  {POPULAR_TOOLS.slice(0, 6).map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="flex items-center gap-3 py-3 px-4 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="pt-6 border-t border-gray-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Grid3X3 className="h-4 w-4 text-blue-500" />
                  </div>
                  <h4 className="font-bold text-gray-900">Categories</h4>
                </div>
                <div className="space-y-1">
                  {mainCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center justify-between py-3 px-4 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-semibold">({category.count})</span>
                    </Link>
                  ))}
                  <Link
                    href="/categories"
                    className="flex items-center justify-center py-3 px-4 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all duration-300 font-medium mt-2 border border-blue-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Browse All Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}