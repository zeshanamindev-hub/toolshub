"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, Wrench, ChevronDown, Search, Sparkles, Grid3X3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { POPULAR_TOOLS, ALL_TOOLS, CATEGORIES, SITE_CONFIG } from "@/lib/constants"
import ScrollProgress from "@/components/ui/scroll-progress"

export default function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle scroll for glassmorphic effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle Ctrl+/ keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === '/') {
        event.preventDefault()
        const searchInput = searchRef.current?.querySelector('input')
        searchInput?.focus()
        setSearchFocused(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Filter tools for search
  const filteredTools = ALL_TOOLS.filter(tool => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return false
    const name = tool.name.toLowerCase()
    const description = tool.description.toLowerCase()
    return name.includes(query) || description.includes(query)
  }).slice(0, 8)

  return (
    <>
      {/* Scroll Progress */}
      <ScrollProgress />

      <header className={`
        sticky top-0 z-50 transition-all duration-500
        ${scrolled
          ? 'glass border-b border-gray-200/50'
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
        }
      `}>
        {/* Top Banner - Modern Gradient */}
        <div className="bg-blue-600 relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-4 py-2.5">
            <div className="flex items-center justify-center gap-2 text-white text-sm font-bold">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Tools Hub - {SITE_CONFIG.toolCount}+ Free Online Tools</span>
              <div className="hidden sm:flex items-center gap-1.5 ml-2">
                <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-xs text-white/90 font-medium">Always Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="Tools Hub Home">
              <div className="relative p-2.5 bg-blue-600 rounded-2xl transition-all duration-300 group-hover:scale-110">
                <Wrench className="h-7 w-7 text-white relative z-10" />
              </div>
              <span className="text-2xl font-bold text-blue-600">
                Tools Hub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* All Tools Link */}
              <Link
                href="/tools"
                className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-blue-600 transition-all duration-300 relative group"
              >
                All Tools
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* Categories Dropdown */}
              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={() => {
                    setCategoriesDropdownOpen(!categoriesDropdownOpen)
                    setToolsDropdownOpen(false)
                  }}
                  onMouseEnter={() => {
                    setCategoriesDropdownOpen(true)
                    setToolsDropdownOpen(false)
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-gray-700 hover:text-blue-600 transition-all duration-300"
                  aria-expanded={categoriesDropdownOpen}
                >
                  <Grid3X3 className="h-4 w-4" />
                  Categories
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Categories Mega Dropdown */}
                {categoriesDropdownOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[600px] bg-white rounded-3xl border border-gray-200 p-6 z-50 animate-fade-in-up"
                    onMouseLeave={() => setCategoriesDropdownOpen(false)}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {Object.values(CATEGORIES).map((category) => (
                        <Link
                          key={category.id}
                          href={category.href}
                          className="group p-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-200"
                          onClick={() => setCategoriesDropdownOpen(false)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600">
                              {category.name}
                            </h3>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                          <p className="text-sm text-gray-600 group-hover:text-gray-700">
                            {category.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-blue-600 transition-all duration-300 relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center">
              <div className="relative" ref={searchRef}>
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 transition-all duration-300 ${searchFocused || searchQuery ? 'text-blue-600 scale-110' : 'text-gray-400'}`} />
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
                    className="pl-10 pr-20 py-2.5 w-80 bg-white border-gray-200 focus:border-blue-500 focus:ring-0 rounded-2xl transition-all duration-300 text-sm font-medium"
                  />
                  {!searchQuery && !searchFocused && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-400 font-medium">
                      Ctrl+/
                    </div>
                  )}
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("")
                        setSearchFocused(false)
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {searchFocused && searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl border border-gray-200 p-4 max-h-96 overflow-y-auto z-50 animate-fade-in-up">
                    {filteredTools.length > 0 ? (
                      <div className="space-y-2">
                        {filteredTools.map((tool) => {
                          const Icon = tool.icon
                          return (
                            <Link
                              key={tool.name}
                              href={tool.href}
                              className="group flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-all duration-300"
                              onClick={() => {
                                setSearchQuery("")
                                setSearchFocused(false)
                              }}
                            >
                              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-white transition-colors">
                                <Icon className={`w-4 h-4 text-blue-600`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                  {tool.name}
                                </div>
                                <div className="text-xs text-gray-600 truncate">
                                  {tool.description}
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                            </Link>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Search className="h-10 w-10 mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">No tools found</p>
                        <p className="text-xs mt-1">Try different keywords</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-xl hover:bg-blue-50 transition-all duration-300"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 animate-fade-in-up">
            <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
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
                  className="pl-10 pr-4 py-3 bg-white border-gray-200 rounded-xl w-full"
                />
              </div>

              {/* Mobile Nav Links */}
              <div className="space-y-2">
                {[
                  { name: "All Tools", href: "/tools" },
                  { name: "Categories", href: "/categories" },
                  { name: "About", href: "/about" }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Popular Tools - Mobile */}
              <div className="pt-4 border-t border-gray-200/50">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Popular Tools</h4>
                <div className="space-y-2">
                  {POPULAR_TOOLS.slice(0, 6).map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
