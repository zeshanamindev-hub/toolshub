"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Wrench, ChevronDown, BarChart3, RefreshCw, ArrowRightLeft, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const toolCategories = [
  {
    name: "Text Analysis",
    icon: BarChart3,
    tools: [
      { name: "Word Counter", href: "/tools/word-counter" },
      { name: "Character Counter", href: "/tools/character-counter" },
      { name: "Letter Counter", href: "/tools/letter-counter" },
    ]
  },
  {
    name: "Text Transformation",
    icon: RefreshCw,
    tools: [
      { name: "Case Converter", href: "/tools/case-converter" },
      { name: "Remove Spaces", href: "/tools/remove-spaces" },
      { name: "Reverse Text", href: "/tools/reverse-text" },
    ]
  },
  {
    name: "Text Conversion",
    icon: ArrowRightLeft,
    tools: [
      { name: "Text to ASCII", href: "/tools/text-to-ascii" },
      { name: "ASCII to Text", href: "/tools/ascii-to-text" },
      { name: "HTML Entities", href: "/tools/html-entities" },
      { name: "Text to Morse", href: "/tools/text-to-morse" },
      { name: "Morse to Text", href: "/tools/morse-to-text" },
    ]
  },
  {
    name: "Generators",
    icon: Zap,
    tools: [
      { name: "Password Generator", href: "/tools/password-generator" },
      { name: "Random String", href: "/tools/random-string" },
    ]
  }
]

const navigation = [
  { name: "Home", href: "/" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Wrench className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">Tools Hub</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Tool Categories Dropdowns */}
            {toolCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <DropdownMenu key={category.name}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="text-sm font-medium text-gray-700 hover:text-primary transition-colors h-auto p-2 gap-1"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="whitespace-nowrap">{category.name}</span>
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      {category.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {category.tools.map((tool) => (
                      <DropdownMenuItem key={tool.name} asChild>
                        <Link 
                          href={tool.href}
                          className="cursor-pointer"
                        >
                          {tool.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Tool Categories */}
              {toolCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <div key={category.name} className="mt-4">
                    <div className="px-3 py-2 text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      {category.name}
                    </div>
                    {category.tools.map((tool) => (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        className="block px-6 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}