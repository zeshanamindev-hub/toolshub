"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useMemo } from "react"
import {
  ArrowRight,
  Search,
  ArrowLeft,
  Grid3X3,
  List
} from "lucide-react"
import { ALL_TOOLS } from "@/lib/constants"

export default function AllToolsClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return ALL_TOOLS

    const query = searchQuery.toLowerCase().trim()
    return ALL_TOOLS.filter(tool =>
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Group tools alphabetically
  const groupedTools = useMemo(() => {
    type ToolType = typeof ALL_TOOLS[number]
    const grouped: Record<string, ToolType[]> = {}

    filteredTools.forEach((tool) => {
      const firstLetter = tool.name.charAt(0).toUpperCase()
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = []
      }
      grouped[firstLetter].push(tool)
    })

    // Sort each group
    Object.keys(grouped).forEach(letter => {
      grouped[letter].sort((a, b) => a.name.localeCompare(b.name))
    })

    return grouped
  }, [filteredTools])

  const alphabeticalLetters = Object.keys(groupedTools).sort()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-indigo-100/50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setViewMode("grid")}
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setViewMode("list")}
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Tools A-Z
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Browse all {ALL_TOOLS.length} tools organized alphabetically. Find exactly what you need quickly and efficiently.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tools Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredTools.length > 0 ? (
          <div className="space-y-12">
            {alphabeticalLetters.map(letter => (
              <div key={letter} className="scroll-mt-24" id={letter}>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl font-bold text-xl">
                    {letter}
                  </div>
                  <div className="ml-4 flex-1 h-px bg-gray-200"></div>
                  <span className="ml-4 text-sm text-gray-500">
                    {groupedTools[letter].length} tool{groupedTools[letter].length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedTools[letter].map((tool) => {
                      const Icon = tool.icon
                      return (
                        <Card key={tool.name} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                          <CardHeader>
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-primary/10 transition-colors">
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
                ) : (
                  <div className="space-y-3">
                    {groupedTools[letter].map((tool) => {
                      const Icon = tool.icon
                      return (
                        <div key={tool.name} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-primary/30 hover:shadow-md transition-all duration-200 group">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-primary/10 transition-colors">
                              <Icon className={`h-5 w-5 ${tool.color}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600">{tool.description}</p>
                            </div>
                          </div>
                          <Button asChild size="sm">
                            <Link href={tool.href}>
                              Use Tool
                              <ArrowRight className="ml-2 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600 mb-6">Try searching for different keywords</p>
            <Button onClick={() => setSearchQuery("")} variant="outline">
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* Alphabet Navigation */}
      {!searchQuery && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-2 hidden lg:block">
          <div className="flex flex-col space-y-1">
            {alphabeticalLetters.map(letter => (
              <a
                key={letter}
                href={`#${letter}`}
                className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/10 rounded transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}