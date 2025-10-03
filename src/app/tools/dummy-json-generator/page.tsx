"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Copy, Trash2, RefreshCw, Plus, X, Download } from "lucide-react"

interface JSONField {
  id: string
  name: string
  type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object'
  required: boolean
  arrayType?: 'string' | 'number' | 'boolean'
  arrayLength?: number
}

interface JSONTemplate {
  name: string
  fields: JSONField[]
}

export default function DummyJSONGeneratorPage() {
  const [generatedJSON, setGeneratedJSON] = useState("")
  const [fields, setFields] = useState<JSONField[]>([
    { id: '1', name: 'id', type: 'number', required: true },
    { id: '2', name: 'name', type: 'string', required: true },
    { id: '3', name: 'email', type: 'string', required: false }
  ])
  const [arrayLength, setArrayLength] = useState(5)
  const [indentation, setIndentation] = useState(2)
  const [newFieldName, setNewFieldName] = useState("")
  const [newFieldType, setNewFieldType] = useState<'string' | 'number' | 'boolean' | 'date' | 'array' | 'object'>('string')

  const templates: JSONTemplate[] = [
    {
      name: 'User Data',
      fields: [
        { id: '1', name: 'id', type: 'number', required: true },
        { id: '2', name: 'name', type: 'string', required: true },
        { id: '3', name: 'email', type: 'string', required: true },
        { id: '4', name: 'age', type: 'number', required: false },
        { id: '5', name: 'active', type: 'boolean', required: false }
      ]
    },
    {
      name: 'Product Data',
      fields: [
        { id: '1', name: 'id', type: 'number', required: true },
        { id: '2', name: 'title', type: 'string', required: true },
        { id: '3', name: 'price', type: 'number', required: true },
        { id: '4', name: 'category', type: 'string', required: false },
        { id: '5', name: 'inStock', type: 'boolean', required: false }
      ]
    },
    {
      name: 'Blog Post',
      fields: [
        { id: '1', name: 'id', type: 'number', required: true },
        { id: '2', name: 'title', type: 'string', required: true },
        { id: '3', name: 'content', type: 'string', required: true },
        { id: '4', name: 'author', type: 'string', required: true },
        { id: '5', name: 'publishedAt', type: 'date', required: false },
        { id: '6', name: 'tags', type: 'array', arrayType: 'string', arrayLength: 3, required: false }
      ]
    }
  ]

  const generateRandomValue = (type: JSONField['type'], arrayType?: 'string' | 'number' | 'boolean', arrayLength?: number): unknown => {
    switch (type) {
      case 'string':
        const strings = [
          'Lorem ipsum dolor sit amet',
          'Consectetur adipiscing elit',
          'Sed do eiusmod tempor incididunt',
          'Ut labore et dolore magna aliqua',
          'Enim ad minim veniam',
          'Quis nostrud exercitation ullamco',
          'Laboris nisi ut aliquip ex ea commodo',
          'Duis aute irure dolor in reprehenderit',
          'Voluptate velit esse cillum dolore',
          'Eu fugiat nulla pariatur'
        ]
        return strings[Math.floor(Math.random() * strings.length)]

      case 'number':
        return Math.floor(Math.random() * 1000) + 1

      case 'boolean':
        return Math.random() > 0.5

      case 'date':
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 365))
        return date.toISOString().split('T')[0]

      case 'array':
        if (!arrayType || !arrayLength) return []
        const arr = []
        for (let i = 0; i < arrayLength; i++) {
          arr.push(generateRandomValue(arrayType))
        }
        return arr

      case 'object':
        return {
          nestedId: Math.floor(Math.random() * 100) + 1,
          nestedName: 'Nested Object',
          nestedValue: Math.random() > 0.5
        }

      default:
        return null
    }
  }

  const generateSingleObject = (): Record<string, unknown> => {
    const obj: Record<string, unknown> = {}

    fields.forEach(field => {
      if (field.required || Math.random() > 0.3) { // 70% chance for optional fields
        obj[field.name] = generateRandomValue(field.type, field.arrayType, field.arrayLength)
      }
    })

    return obj
  }

  const generateJSON = () => {
    const objects = []

    for (let i = 0; i < arrayLength; i++) {
      objects.push(generateSingleObject())
    }

    const jsonString = JSON.stringify(objects, null, indentation)
    setGeneratedJSON(jsonString)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedJSON)
    } catch (err) {
      console.error("Failed to copy JSON:", err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([generatedJSON], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dummy-data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setGeneratedJSON("")
  }

  const addField = () => {
    if (!newFieldName.trim()) return

    const newField: JSONField = {
      id: Date.now().toString(),
      name: newFieldName.trim(),
      type: newFieldType,
      required: false
    }

    if (newFieldType === 'array') {
      newField.arrayType = 'string'
      newField.arrayLength = 3
    }

    setFields([...fields, newField])
    setNewFieldName("")
    setNewFieldType('string')
  }

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id))
  }

  const updateField = (id: string, updates: Partial<JSONField>) => {
    setFields(fields.map(field =>
      field.id === id ? { ...field, ...updates } : field
    ))
  }

  const loadTemplate = (template: JSONTemplate) => {
    setFields(template.fields.map(field => ({ ...field, id: Date.now().toString() + Math.random() })))
  }

  const validateJSON = (jsonString: string): boolean => {
    try {
      JSON.parse(jsonString)
      return true
    } catch {
      return false
    }
  }

  const isValidJSON = generatedJSON ? validateJSON(generatedJSON) : true

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Dummy JSON Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate realistic sample JSON data for testing, development, and prototyping.
            Create custom data structures with various field types.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Generator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Field Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>JSON Structure</CardTitle>
                <CardDescription>
                  Define the fields for your JSON objects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Field */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Field name..."
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addField()}
                    className="flex-1"
                  />
                  <select
                    value={newFieldType}
                    onChange={(e) => setNewFieldType(e.target.value as 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object')}
                    className="border rounded px-3 py-1 text-sm w-32"
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="date">Date</option>
                    <option value="array">Array</option>
                    <option value="object">Object</option>
                  </select>
                  <Button onClick={addField} disabled={!newFieldName.trim()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                {/* Field List */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {fields.map((field) => (
                    <div key={field.id} className="flex items-center gap-2 p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{field.name}</span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {field.type}
                          </span>
                          {field.required && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                              Required
                            </span>
                          )}
                        </div>
                        {field.type === 'array' && (
                          <div className="text-xs text-gray-500 mt-1">
                            Array of {field.arrayType}s (length: {field.arrayLength})
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <label className="flex items-center gap-1 text-xs">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => updateField(field.id, { required: e.target.checked })}
                          />
                          Req
                        </label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeField(field.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generation Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Generation Settings</CardTitle>
                <CardDescription>
                  Configure output format and quantity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Number of Objects
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      value={arrayLength}
                      onChange={(e) => setArrayLength(parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Indentation
                    </label>
                    <select
                      value={indentation.toString()}
                      onChange={(e) => setIndentation(parseInt(e.target.value) as 0 | 2 | 4)}
                      className="border rounded px-3 py-1 text-sm"
                    >
                      <option value="0">Minified</option>
                      <option value="2">2 spaces</option>
                      <option value="4">4 spaces</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={generateJSON}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generate JSON
                  </Button>
                  <Button onClick={handleClear} variant="outline">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Generated JSON */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Generated JSON
                  {generatedJSON && (
                    <span className={`text-sm px-2 py-1 rounded ${
                      isValidJSON ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {isValidJSON ? 'Valid JSON' : 'Invalid JSON'}
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  Your generated dummy JSON data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={generatedJSON}
                  readOnly
                  className="min-h-[400px] resize-none font-mono text-sm"
                  placeholder="Generated JSON will appear here..."
                />

                <div className="flex gap-2">
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="sm"
                    disabled={!generatedJSON}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy JSON
                  </Button>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                    disabled={!generatedJSON}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Templates</CardTitle>
                <CardDescription>
                  Quick-start with predefined structures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {templates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => loadTemplate(template)}
                  >
                    {template.name}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Field Types Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Field Types</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-3">
                <div>
                  <strong>String:</strong> Text data (names, descriptions, etc.)
                </div>
                <div>
                  <strong>Number:</strong> Numeric values (IDs, prices, counts)
                </div>
                <div>
                  <strong>Boolean:</strong> True/false values (active, enabled, etc.)
                </div>
                <div>
                  <strong>Date:</strong> ISO date strings (YYYY-MM-DD format)
                </div>
                <div>
                  <strong>Array:</strong> Lists of values (tags, categories, etc.)
                </div>
                <div>
                  <strong>Object:</strong> Nested JSON objects
                </div>
              </CardContent>
            </Card>

            {/* Usage Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>API Testing:</strong> Generate mock data for REST API endpoints
                </p>
                <p>
                  <strong>Database Seeding:</strong> Create sample data for database testing
                </p>
                <p>
                  <strong>UI Development:</strong> Populate components with realistic data
                </p>
                <p>
                  <strong>Prototyping:</strong> Quickly test data structures and layouts
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold text-sm">Custom Fields</div>
                      <p className="text-xs text-gray-600">Define any JSON structure you need</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold text-sm">Multiple Types</div>
                      <p className="text-xs text-gray-600">Support for all JSON data types</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold text-sm">Validation</div>
                      <p className="text-xs text-gray-600">Real-time JSON validation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}