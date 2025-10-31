"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Copy, Trash2, Shuffle } from "lucide-react"

type SortOrder = "asc" | "desc"
type SortType = "alphabetical" | "numerical" | "length" | "random"

export default function LineSorterClient() {
  const [inputText, setInputText] = useState("")
  const [sortType, setSortType] = useState<SortType>("alphabetical")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [ignoreCase, setIgnoreCase] = useState(false)
  const [removeDuplicates, setRemoveDuplicates] = useState(false)
  const [removeEmpty, setRemoveEmpty] = useState(false)
  const [trimLines, setTrimLines] = useState(false)

  const processedLines = useMemo(() => {
    if (!inputText.trim()) return []

    let lines = inputText.split('\n')

    // Apply preprocessing options
    if (trimLines) {
      lines = lines.map(line => line.trim())
    }

    if (removeEmpty) {
      lines = lines.filter(line => line.trim().length > 0)
    }

    if (removeDuplicates) {
      const seen = new Set<string>()
      lines = lines.filter(line => {
        const key = ignoreCase ? line.toLowerCase() : line
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    }

    // Apply sorting
    const sorted = [...lines]
    
    switch (sortType) {
      case "alphabetical":
        sorted.sort((a, b) => {
          const aVal = ignoreCase ? a.toLowerCase() : a
          const bVal = ignoreCase ? b.toLowerCase() : b
          return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
        })
        break

      case "numerical":
        sorted.sort((a, b) => {
          const aNum = parseFloat(a.replace(/[^0-9.-]/g, '')) || 0
          const bNum = parseFloat(b.replace(/[^0-9.-]/g, '')) || 0
          return sortOrder === "asc" ? aNum - bNum : bNum - aNum
        })
        break

      case "length":
        sorted.sort((a, b) => {
          const diff = a.length - b.length
          return sortOrder === "asc" ? diff : -diff
        })
        break

      case "random":
        for (let i = sorted.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [sorted[i], sorted[j]] = [sorted[j], sorted[i]]
        }
        break
    }

    return sorted
  }, [inputText, sortType, sortOrder, ignoreCase, removeDuplicates, removeEmpty, trimLines])

  const outputText = processedLines.join('\n')

  const getStats = () => {
    const inputLines = inputText.split('\n')
    const inputNonEmpty = inputLines.filter(line => line.trim().length > 0)
    
    return {
      inputLines: inputLines.length,
      inputNonEmpty: inputNonEmpty.length,
      outputLines: processedLines.length,
      duplicatesRemoved: removeDuplicates ? inputNonEmpty.length - processedLines.length : 0,
      emptyLinesRemoved: removeEmpty ? inputLines.length - inputNonEmpty.length : 0
    }
  }

  const stats = getStats()

  const handleClear = () => {
    setInputText("")
  }

  const handleCopyInput = async () => {
    try {
      await navigator.clipboard.writeText(inputText)
    } catch (err) {
      console.error("Failed to copy input:", err)
    }
  }

  const handleCopyOutput = async () => {
    try {
      await navigator.clipboard.writeText(outputText)
    } catch (err) {
      console.error("Failed to copy output:", err)
    }
  }

  const handleShuffle = () => {
    setSortType("random")
  }

  const loadSample = () => {
    setInputText(`Zebra
apple
Cherry
banana
Date
elderberry
Fig
grape
honeydew
kiwi
1. First item
2. Second item
10. Tenth item
3. Third item`)
  }

  const presets = [
    {
      name: "Alphabetical A-Z",
      sortType: "alphabetical" as SortType,
      sortOrder: "asc" as SortOrder,
      ignoreCase: true
    },
    {
      name: "Alphabetical Z-A",
      sortType: "alphabetical" as SortType,
      sortOrder: "desc" as SortOrder,
      ignoreCase: true
    },
    {
      name: "By Length (Short to Long)",
      sortType: "length" as SortType,
      sortOrder: "asc" as SortOrder,
      ignoreCase: false
    },
    {
      name: "By Length (Long to Short)",
      sortType: "length" as SortType,
      sortOrder: "desc" as SortOrder,
      ignoreCase: false
    },
    {
      name: "Numerical Sort",
      sortType: "numerical" as SortType,
      sortOrder: "asc" as SortOrder,
      ignoreCase: false
    },
    {
      name: "Random Shuffle",
      sortType: "random" as SortType,
      sortOrder: "asc" as SortOrder,
      ignoreCase: false
    }
  ]

  const applyPreset = (preset: typeof presets[0]) => {
    setSortType(preset.sortType)
    setSortOrder(preset.sortOrder)
    setIgnoreCase(preset.ignoreCase)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ArrowUpDown className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Line Sorter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sort text lines alphabetically, numerically, by length, or randomly. 
            Remove duplicates, filter empty lines, and more.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Sorting Options</CardTitle>
              <CardDescription>
                Configure how you want to sort and process your lines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Sort Type:</label>
                  <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value as SortType)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  >
                    <option value="alphabetical">Alphabetical</option>
                    <option value="numerical">Numerical</option>
                    <option value="length">By Length</option>
                    <option value="random">Random Shuffle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sort Order:</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    disabled={sortType === "random"}
                  >
                    <option value="asc">
                      {sortType === "alphabetical" ? "A to Z" :
                       sortType === "numerical" ? "Low to High" :
                       sortType === "length" ? "Short to Long" : "Ascending"}
                    </option>
                    <option value="desc">
                      {sortType === "alphabetical" ? "Z to A" :
                       sortType === "numerical" ? "High to Low" :
                       sortType === "length" ? "Long to Short" : "Descending"}
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Processing Options:</div>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={ignoreCase}
                      onChange={(e) => setIgnoreCase(e.target.checked)}
                      className="rounded"
                      disabled={sortType !== "alphabetical"}
                    />
                    Ignore case (alphabetical only)
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={removeDuplicates}
                      onChange={(e) => setRemoveDuplicates(e.target.checked)}
                      className="rounded"
                    />
                    Remove duplicates
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={removeEmpty}
                      onChange={(e) => setRemoveEmpty(e.target.checked)}
                      className="rounded"
                    />
                    Remove empty lines
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={trimLines}
                      onChange={(e) => setTrimLines(e.target.checked)}
                      className="rounded"
                    />
                    Trim whitespace
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleShuffle} variant="outline" size="sm">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Shuffle
                </Button>
                <Button onClick={loadSample} variant="outline" size="sm">
                  Load Sample
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Tool */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle>Input Text</CardTitle>
                <CardDescription>
                  Enter text with each line to be sorted on a separate line
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter lines to sort..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[300px] resize-none font-mono text-sm"
                />

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Total lines: {stats.inputLines}</span>
                  <span>Non-empty lines: {stats.inputNonEmpty}</span>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCopyInput} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={handleClear} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600">Sorted Result</CardTitle>
                <CardDescription>
                  Your text lines sorted according to the selected options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={outputText}
                  readOnly
                  className="min-h-[300px] resize-none font-mono text-sm bg-gray-50"
                  placeholder="Sorted lines will appear here..."
                />

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Sorted lines: {stats.outputLines}</span>
                  {stats.duplicatesRemoved > 0 && (
                    <span>Duplicates removed: {stats.duplicatesRemoved}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleCopyOutput} 
                    variant="outline" 
                    size="sm"
                    disabled={!outputText}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Result
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Presets */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Presets</CardTitle>
                <CardDescription>
                  Common sorting configurations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {presets.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => applyPreset(preset)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Processing Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Input lines:</span>
                  <span className="font-medium">{stats.inputLines}</span>
                </div>
                <div className="flex justify-between">
                  <span>Non-empty lines:</span>
                  <span className="font-medium">{stats.inputNonEmpty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Output lines:</span>
                  <span className="font-medium text-purple-600">{stats.outputLines}</span>
                </div>
                {stats.duplicatesRemoved > 0 && (
                  <div className="flex justify-between">
                    <span>Duplicates removed:</span>
                    <span className="font-medium text-red-600">{stats.duplicatesRemoved}</span>
                  </div>
                )}
                {stats.emptyLinesRemoved > 0 && (
                  <div className="flex justify-between">
                    <span>Empty lines removed:</span>
                    <span className="font-medium text-orange-600">{stats.emptyLinesRemoved}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sorting Types Info */}
            <Card>
              <CardHeader>
                <CardTitle>Sorting Types</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <div>
                  <strong>Alphabetical:</strong> Sorts lines in dictionary order, 
                  with option to ignore case differences.
                </div>
                <div>
                  <strong>Numerical:</strong> Extracts numbers from each line 
                  and sorts by numeric value.
                </div>
                <div>
                  <strong>By Length:</strong> Sorts lines by their character 
                  length from shortest to longest or vice versa.
                </div>
                <div>
                  <strong>Random:</strong> Randomly shuffles the order of lines.
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-1">
                <p>• Sort lists and inventories</p>
                <p>• Organize data imports</p>
                <p>• Clean up text files</p>
                <p>• Prepare data for processing</p>
                <p>• Remove duplicate entries</p>
                <p>• Randomize order for fairness</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Comprehensive line sorting and processing capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-purple-600 font-semibold mb-2">Multiple Sort Types</div>
                  <p className="text-sm text-gray-600">
                    Alphabetical, numerical, length-based, and random sorting
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-blue-600 font-semibold mb-2">Flexible Processing</div>
                  <p className="text-sm text-gray-600">
                    Remove duplicates, empty lines, and trim whitespace
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-semibold mb-2">Real-time Results</div>
                  <p className="text-sm text-gray-600">
                    See sorted results instantly as you type
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-orange-600 font-semibold mb-2">Detailed Statistics</div>
                  <p className="text-sm text-gray-600">
                    Track processing results and changes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}