"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import {
  Search,
  ChevronRight,
  Info
} from "lucide-react"
import { ALL_TOOLS } from "@/lib/constants"

interface QuickReferenceItem {
  label: string
  value: string
  icon?: React.ElementType
  color?: string
}

interface StandardToolLayoutProps {
  // Tool identity
  toolName: string
  toolDescription: string
  toolIcon: React.ElementType
  categoryBadge: string

  // Main content
  children: ReactNode

  // Sidebar configuration
  quickReference?: QuickReferenceItem[]
  quickReferenceTitle?: string
  relevantToolsFilter?: (tool: typeof ALL_TOOLS[number]) => boolean

  // About section
  aboutSections: Array<{
    title: string
    content: ReactNode
  }>

  // Optional: examples section
  examples?: Array<{
    title: string
    input: string
    output: string
    description?: string
  }>
}

export default function StandardToolLayout({
  toolName,
  toolDescription,
  toolIcon: ToolIcon,
  categoryBadge,
  children,
  quickReference = [],
  quickReferenceTitle = "Quick Reference",
  relevantToolsFilter,
  aboutSections,
  examples
}: StandardToolLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Get relevant tools based on filter or default to same category
  const relevantTools = ALL_TOOLS.filter(tool => {
    if (relevantToolsFilter) {
      return relevantToolsFilter(tool)
    }
    return false
  }).slice(0, 5)

  // Get other random tools
  const otherTools = ALL_TOOLS.filter(tool =>
    !relevantTools.find(rt => rt.href === tool.href) &&
    tool.href !== window?.location?.pathname
  ).slice(0, 6)

  // Filter tools based on search
  const filteredRelevantTools = searchQuery
    ? relevantTools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : relevantTools

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
      {/* Hero Section */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-4">
              <ToolIcon className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">{categoryBadge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              {toolName}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {toolDescription}
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Search */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm font-bold text-gray-900">Search Tools</h3>
                </div>
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-gray-200 rounded-xl"
                />
              </div>

              {/* Quick Reference (if provided) */}
              {quickReference.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    {quickReference[0]?.icon ? (
                      <quickReference[0].icon className="h-4 w-4 text-green-600" />
                    ) : (
                      <Info className="h-4 w-4 text-green-600" />
                    )}
                    <h3 className="text-sm font-bold text-gray-900">{quickReferenceTitle}</h3>
                  </div>
                  <div className="space-y-2 text-xs">
                    {quickReference.map((item, index) => (
                      <div key={index} className="flex justify-between py-1.5 border-b border-gray-100 last:border-b-0">
                        <span className="font-semibold text-gray-700">{item.label}</span>
                        <span className="text-gray-500">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Relevant Tools */}
              {relevantTools.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <ToolIcon className="h-4 w-4 text-purple-600" />
                    <h3 className="text-sm font-bold text-gray-900">Related Tools</h3>
                  </div>
                  <div className="space-y-1">
                    {filteredRelevantTools.map((tool, index) => (
                      <Link
                        key={index}
                        href={tool.href}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600" />
                        <span className="text-xs text-gray-700 group-hover:text-blue-600 font-medium">
                          {tool.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Tools */}
              {otherTools.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="h-4 w-4 text-orange-600" />
                    <h3 className="text-sm font-bold text-gray-900">Other Tools</h3>
                  </div>
                  <div className="space-y-1">
                    {otherTools.map((tool, index) => (
                      <Link
                        key={index}
                        href={tool.href}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-orange-600" />
                        <span className="text-xs text-gray-700 group-hover:text-orange-600 font-medium">
                          {tool.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {children}
            </div>
          </div>

          {/* Examples Section (if provided) */}
          {examples && examples.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Info className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Examples</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {examples.map((example, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{example.title}</h3>
                    {example.description && (
                      <p className="text-sm text-gray-600 mb-3">{example.description}</p>
                    )}
                    <div className="space-y-2">
                      <div>
                        <strong className="text-gray-900 text-sm">Input:</strong>
                        <code className="block bg-white px-3 py-2 rounded mt-1 font-mono text-sm">
                          {example.input}
                        </code>
                      </div>
                      <div>
                        <strong className="text-gray-900 text-sm">Output:</strong>
                        <code className="block bg-white px-3 py-2 rounded mt-1 font-mono text-sm">
                          {example.output}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full-width About Section */}
          <div className="mt-8 bg-white rounded-2xl p-8 border border-gray-200">
            <div className="max-w-full">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">About {toolName}</h2>
              </div>

              <div className="prose prose-sm text-gray-600 max-w-none space-y-6">
                {aboutSections.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h3>
                    {section.content}
                  </div>
                ))}

                {/* Privacy & Security (always included) */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy & Security</h3>
                  <p>
                    All processing happens directly in your browser. Your data never leaves your device
                    and is not sent to any server. This ensures complete privacy and security for all
                    your operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Import useState at the top
import { useState } from "react"
