"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { GitCompare, Copy, Trash2, ArrowRightLeft, Eye, EyeOff } from "lucide-react"

interface DiffResult {
  type: 'equal' | 'insert' | 'delete' | 'replace'
  oldText?: string
  newText?: string
  text: string
}

export default function TextDiffCheckerClient() {
  const [originalText, setOriginalText] = useState("")
  const [modifiedText, setModifiedText] = useState("")
  const [showUnified, setShowUnified] = useState(true)
  const [ignoreCase, setIgnoreCase] = useState(false)
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false)

  // Simple diff algorithm (Myers' algorithm simplified)
  const computeDiff = (original: string, modified: string): DiffResult[] => {
    let originalLines = original.split('\n')
    let modifiedLines = modified.split('\n')

    // Apply ignore options
    if (ignoreCase) {
      originalLines = originalLines.map(line => line.toLowerCase())
      modifiedLines = modifiedLines.map(line => line.toLowerCase())
    }

    if (ignoreWhitespace) {
      originalLines = originalLines.map(line => line.trim())
      modifiedLines = modifiedLines.map(line => line.trim())
    }

    const results: DiffResult[] = []
    let i = 0, j = 0

    while (i < originalLines.length || j < modifiedLines.length) {
      if (i >= originalLines.length) {
        // Remaining lines in modified are insertions
        results.push({
          type: 'insert',
          text: modifiedLines[j],
          newText: modifiedLines[j]
        })
        j++
      } else if (j >= modifiedLines.length) {
        // Remaining lines in original are deletions
        results.push({
          type: 'delete',
          text: originalLines[i],
          oldText: originalLines[i]
        })
        i++
      } else if (originalLines[i] === modifiedLines[j]) {
        // Lines are equal
        results.push({
          type: 'equal',
          text: originalLines[i]
        })
        i++
        j++
      } else {
        // Look ahead to see if this is a replacement or separate insert/delete
        let foundMatch = false
        
        // Check if the next few lines in modified match current original
        for (let k = j + 1; k < Math.min(j + 5, modifiedLines.length); k++) {
          if (originalLines[i] === modifiedLines[k]) {
            // Insert the lines before the match
            for (let l = j; l < k; l++) {
              results.push({
                type: 'insert',
                text: modifiedLines[l],
                newText: modifiedLines[l]
              })
            }
            j = k
            foundMatch = true
            break
          }
        }

        if (!foundMatch) {
          // Check if the next few lines in original match current modified
          for (let k = i + 1; k < Math.min(i + 5, originalLines.length); k++) {
            if (originalLines[k] === modifiedLines[j]) {
              // Delete the lines before the match
              for (let l = i; l < k; l++) {
                results.push({
                  type: 'delete',
                  text: originalLines[l],
                  oldText: originalLines[l]
                })
              }
              i = k
              foundMatch = true
              break
            }
          }
        }

        if (!foundMatch) {
          // This is likely a replacement
          results.push({
            type: 'replace',
            text: `${originalLines[i]} → ${modifiedLines[j]}`,
            oldText: originalLines[i],
            newText: modifiedLines[j]
          })
          i++
          j++
        }
      }
    }

    return results
  }

  const diff = useMemo(() => {
    if (!originalText && !modifiedText) return []
    return computeDiff(originalText, modifiedText)
  }, [originalText, modifiedText, computeDiff])

  const stats = useMemo(() => {
    const insertions = diff.filter(d => d.type === 'insert').length
    const deletions = diff.filter(d => d.type === 'delete').length
    const modifications = diff.filter(d => d.type === 'replace').length
    const unchanged = diff.filter(d => d.type === 'equal').length

    return { insertions, deletions, modifications, unchanged }
  }, [diff])

  const handleClear = () => {
    setOriginalText("")
    setModifiedText("")
  }

  const handleSwap = () => {
    const temp = originalText
    setOriginalText(modifiedText)
    setModifiedText(temp)
  }

  const handleCopyOriginal = async () => {
    try {
      await navigator.clipboard.writeText(originalText)
    } catch (err) {
      console.error("Failed to copy original text:", err)
    }
  }

  const handleCopyModified = async () => {
    try {
      await navigator.clipboard.writeText(modifiedText)
    } catch (err) {
      console.error("Failed to copy modified text:", err)
    }
  }

  const handleCopyDiff = async () => {
    const diffText = diff.map(d => {
      switch (d.type) {
        case 'insert':
          return `+ ${d.text}`
        case 'delete':
          return `- ${d.text}`
        case 'replace':
          return `~ ${d.text}`
        case 'equal':
          return `  ${d.text}`
        default:
          return d.text
      }
    }).join('\n')

    try {
      await navigator.clipboard.writeText(diffText)
    } catch (err) {
      console.error("Failed to copy diff:", err)
    }
  }

  const loadSample = () => {
    setOriginalText(`The quick brown fox jumps over the lazy dog.
This is the first line.
This is the second line.
This is the third line.
The end.`)

    setModifiedText(`The quick brown fox leaps over the lazy dog.
This is the first line.
This is a new second line.
This is the third line.
This is an additional line.
The end.`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <GitCompare className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Text Diff Checker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare two text blocks and see the differences highlighted. 
            Perfect for reviewing changes, comparing versions, and code reviews.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Comparison Options</CardTitle>
              <CardDescription>
                Configure how the text comparison is performed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={ignoreCase}
                    onChange={(e) => setIgnoreCase(e.target.checked)}
                    className="rounded"
                  />
                  Ignore case differences
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={ignoreWhitespace}
                    onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                    className="rounded"
                  />
                  Ignore whitespace differences
                </label>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowUnified(!showUnified)}
                >
                  {showUnified ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showUnified ? "Hide" : "Show"} Unified View
                </Button>

                <Button onClick={loadSample} variant="outline" size="sm">
                  Load Sample
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Texts */}
          <div className="space-y-6">
            {/* Original Text */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Original Text</CardTitle>
                <CardDescription>
                  The original or "before" version of your text
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter original text..."
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  className="min-h-[300px] resize-none font-mono text-sm"
                />
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Lines: {originalText.split('\n').length}</span>
                  <span>Characters: {originalText.length}</span>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCopyOriginal} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Modified Text */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Modified Text</CardTitle>
                <CardDescription>
                  The modified or "after" version of your text
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter modified text..."
                  value={modifiedText}
                  onChange={(e) => setModifiedText(e.target.value)}
                  className="min-h-[300px] resize-none font-mono text-sm"
                />
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Lines: {modifiedText.split('\n').length}</span>
                  <span>Characters: {modifiedText.length}</span>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCopyModified} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={handleSwap} variant="outline" size="sm">
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Swap
                  </Button>
                  <Button onClick={handleClear} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Both
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Diff Results */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Comparison Summary</CardTitle>
                <CardDescription>
                  Overview of changes between the texts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.insertions}</div>
                    <div className="text-sm text-green-600">Insertions</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{stats.deletions}</div>
                    <div className="text-sm text-red-600">Deletions</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{stats.modifications}</div>
                    <div className="text-sm text-orange-600">Modifications</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">{stats.unchanged}</div>
                    <div className="text-sm text-gray-600">Unchanged</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Diff View */}
            {showUnified && (originalText || modifiedText) && (
              <Card>
                <CardHeader>
                  <CardTitle>Unified Diff View</CardTitle>
                  <CardDescription>
                    Line-by-line comparison with changes highlighted
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-h-96 overflow-y-auto border rounded p-4 bg-gray-50">
                    <div className="font-mono text-sm space-y-1">
                      {diff.map((item, index) => (
                        <div 
                          key={index}
                          className={`px-2 py-1 rounded ${
                            item.type === 'insert' ? 'bg-green-100 text-green-800' :
                            item.type === 'delete' ? 'bg-red-100 text-red-800' :
                            item.type === 'replace' ? 'bg-orange-100 text-orange-800' :
                            'bg-white'
                          }`}
                        >
                          <span className="inline-block w-4 text-gray-500 mr-2">
                            {item.type === 'insert' ? '+' :
                             item.type === 'delete' ? '-' :
                             item.type === 'replace' ? '~' : ' '}
                          </span>
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleCopyDiff} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Diff
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Legend</CardTitle>
                <CardDescription>
                  Understanding the diff symbols and colors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-4 bg-green-100 rounded flex items-center justify-center text-green-800 font-mono text-xs">+</span>
                    <span>Added lines (insertions)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-4 bg-red-100 rounded flex items-center justify-center text-red-800 font-mono text-xs">-</span>
                    <span>Removed lines (deletions)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-4 bg-orange-100 rounded flex items-center justify-center text-orange-800 font-mono text-xs">~</span>
                    <span>Modified lines (replacements)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-4 bg-white border rounded flex items-center justify-center text-gray-500 font-mono text-xs"> </span>
                    <span>Unchanged lines</span>
                  </div>
                </div>
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
                Comprehensive text comparison capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-green-600 font-bold mb-2">Line-by-Line Diff</div>
                  <p className="text-sm text-gray-600">
                    Clear visualization of added, removed, and changed lines
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-blue-600 font-bold mb-2">Flexible Options</div>
                  <p className="text-sm text-gray-600">
                    Ignore case and whitespace differences as needed
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-bold mb-2">Statistics</div>
                  <p className="text-sm text-gray-600">
                    Detailed summary of changes and modifications
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-orange-600 font-bold mb-2">Export Results</div>
                  <p className="text-sm text-gray-600">
                    Copy diff output in standard format
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