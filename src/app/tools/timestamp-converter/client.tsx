"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Clock, Copy, RefreshCw, Calendar ,  Info } from "lucide-react"

interface ConversionResult {
  unix: number
  iso: string
  utc: string
  local: string
  relative: string
}

export default function TimestampConverterClient() {
  const [inputValue, setInputValue] = useState("")
  const [inputType, setInputType] = useState<"unix" | "iso" | "human">("unix")
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [currentTime, setCurrentTime] = useState<ConversionResult | null>(null)

  const convertTimestamp = (value: string, type: "unix" | "iso" | "human"): ConversionResult | null => {
    let date: Date

    try {
      switch (type) {
        case "unix":
          const timestamp = parseInt(value)
          if (isNaN(timestamp)) return null
          
          // Auto-detect if timestamp is in seconds or milliseconds
          const isMilliseconds = timestamp.toString().length >= 13
          date = new Date(isMilliseconds ? timestamp : timestamp * 1000)
          break
          
        case "iso":
          date = new Date(value)
          break
          
        case "human":
          date = new Date(value)
          break
          
        default:
          return null
      }

      if (isNaN(date.getTime())) return null

      const unix = Math.floor(date.getTime() / 1000)
      const iso = date.toISOString()
      const utc = date.toUTCString()
      const local = date.toLocaleString()
      const relative = getRelativeTime(date)

      return { unix, iso, utc, local, relative }
    } catch (error) {
      return null
    }
  }

  const getRelativeTime = (date: Date): string => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (Math.abs(diffSeconds) < 60) {
      return diffSeconds === 0 ? "now" : `${Math.abs(diffSeconds)} seconds ${diffSeconds > 0 ? "ago" : "from now"}`
    } else if (Math.abs(diffMinutes) < 60) {
      return `${Math.abs(diffMinutes)} minutes ${diffMinutes > 0 ? "ago" : "from now"}`
    } else if (Math.abs(diffHours) < 24) {
      return `${Math.abs(diffHours)} hours ${diffHours > 0 ? "ago" : "from now"}`
    } else if (Math.abs(diffDays) < 30) {
      return `${Math.abs(diffDays)} days ${diffDays > 0 ? "ago" : "from now"}`
    } else {
      const diffMonths = Math.floor(diffDays / 30)
      if (Math.abs(diffMonths) < 12) {
        return `${Math.abs(diffMonths)} months ${diffMonths > 0 ? "ago" : "from now"}`
      } else {
        const diffYears = Math.floor(diffMonths / 12)
        return `${Math.abs(diffYears)} years ${diffYears > 0 ? "ago" : "from now"}`
      }
    }
  }

  const handleConvert = useCallback(() => {
    if (!inputValue.trim()) {
      setResult(null)
      return
    }

    const converted = convertTimestamp(inputValue.trim(), inputType)
    setResult(converted)
  }, [inputValue, inputType])

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const loadCurrentTimestamp = () => {
    const now = new Date()
    setInputType("unix")
    setInputValue(Math.floor(now.getTime() / 1000).toString())
  }

  const loadSampleTimestamp = (sample: string, type: "unix" | "iso" | "human") => {
    setInputType(type)
    setInputValue(sample)
  }

  useEffect(() => {
    handleConvert()
  }, [inputValue, inputType, handleConvert])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const currentResult = convertTimestamp(now.getTime().toString(), "unix")
      setCurrentTime(currentResult)
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const sampleTimestamps = [
    {
      name: "Unix Epoch",
      value: "0",
      type: "unix" as const,
      description: "January 1, 1970"
    },
    {
      name: "Y2K",
      value: "946684800",
      type: "unix" as const,
      description: "January 1, 2000"
    },
    {
      name: "ISO 8601",
      value: "2024-01-01T00:00:00Z",
      type: "iso" as const,
      description: "New Year 2024"
    },
    {
      name: "Human Readable",
      value: "December 25, 2024 12:00:00",
      type: "human" as const,
      description: "Christmas 2024"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Clock className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Timestamp Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert between Unix timestamps, ISO 8601 dates, and human-readable formats. 
            Perfect for developers working with different time representations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Converter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle>Convert Timestamp</CardTitle>
                <CardDescription>
                  Enter a timestamp in any format to convert
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <select
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value as typeof inputType)}
                    className="border rounded px-3 py-2 text-sm min-w-[120px]"
                  >
                    <option value="unix">Unix Timestamp</option>
                    <option value="iso">ISO 8601</option>
                    <option value="human">Human Readable</option>
                  </select>
                  
                  <Input
                    placeholder={
                      inputType === "unix" ? "1640995200" :
                      inputType === "iso" ? "2024-01-01T00:00:00Z" :
                      "January 1, 2024 12:00:00"
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 font-mono"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={loadCurrentTimestamp} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Use Current Time
                  </Button>
                </div>

                {/* Conversion Status */}
                {inputValue && (
                  <div className="text-sm">
                    {result ? (
                      <div className="text-green-600 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Valid timestamp - converted successfully
                      </div>
                    ) : (
                      <div className="text-red-600">
                        Invalid timestamp format
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Results</CardTitle>
                  <CardDescription>
                    Your timestamp in different formats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Unix Timestamp</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(result.unix.toString())}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="font-mono text-sm">{result.unix}</div>
                      <div className="text-xs text-gray-500 mt-1">Seconds since January 1, 1970</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Unix Timestamp (Milliseconds)</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy((result.unix * 1000).toString())}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="font-mono text-sm">{result.unix * 1000}</div>
                      <div className="text-xs text-gray-500 mt-1">Milliseconds since January 1, 1970</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">ISO 8601</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(result.iso)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="font-mono text-sm">{result.iso}</div>
                      <div className="text-xs text-gray-500 mt-1">International standard format</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">UTC</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(result.utc)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="font-mono text-sm">{result.utc}</div>
                      <div className="text-xs text-gray-500 mt-1">Coordinated Universal Time</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Local Time</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(result.local)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="font-mono text-sm">{result.local}</div>
                      <div className="text-xs text-gray-500 mt-1">Your local timezone</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Relative Time</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(result.relative)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="font-mono text-sm">{result.relative}</div>
                      <div className="text-xs text-gray-500 mt-1">Relative to current time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Time */}
            <Card>
              <CardHeader>
                <CardTitle>Current Time</CardTitle>
                <CardDescription>
                  Live current timestamp
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentTime && (
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-medium">Unix:</div>
                      <div className="font-mono text-blue-600">{currentTime.unix}</div>
                    </div>
                    <div>
                      <div className="font-medium">Local:</div>
                      <div className="font-mono">{currentTime.local}</div>
                    </div>
                    <div>
                      <div className="font-medium">ISO:</div>
                      <div className="font-mono text-xs">{currentTime.iso}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sample Timestamps */}
            <Card>
              <CardHeader>
                <CardTitle>Sample Timestamps</CardTitle>
                <CardDescription>
                  Click to load common timestamps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {sampleTimestamps.map((sample, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => loadSampleTimestamp(sample.value, sample.type)}
                  >
                    <div>
                      <div className="font-medium">{sample.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {sample.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Timezone Info */}
            <Card>
              <CardHeader>
                <CardTitle>Timezone Info</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <div>
                  <strong>Your Timezone:</strong><br />
                  {Intl.DateTimeFormat().resolvedOptions().timeZone}
                </div>
                <div>
                  <strong>UTC Offset:</strong><br />
                  {new Date().getTimezoneOffset() / -60} hours
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Tips & Info</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Unix Timestamp:</strong> Seconds since Jan 1, 1970 UTC. 
                  Common in databases and APIs.
                </p>
                <p>
                  <strong>ISO 8601:</strong> International standard for date/time. 
                  Used in JSON and web APIs.
                </p>
                <p>
                  <strong>Auto-Detection:</strong> Tool automatically detects if Unix 
                  timestamp is in seconds or milliseconds.
                </p>
                <p>
                  <strong>Precision:</strong> JavaScript dates have millisecond precision.
                </p>
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
                Comprehensive timestamp conversion capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-blue-600 font-bold mb-2">Multiple Formats</div>
                  <p className="text-sm text-gray-600">
                    Unix, ISO 8601, UTC, and local time formats
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-bold mb-2">Real-time Updates</div>
                  <p className="text-sm text-gray-600">
                    Live current time and relative time calculations
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-bold mb-2">Auto-Detection</div>
                  <p className="text-sm text-gray-600">
                    Automatically detects seconds vs milliseconds
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-orange-600 font-bold mb-2">Copy & Paste</div>
                  <p className="text-sm text-gray-600">
                    One-click copying of any format
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        {/* Full-width SEO Content Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
          <div className="max-w-full">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-900">About Unix Timestamp Converter</h2>
            </div>

            <div className="prose prose-sm text-gray-600 max-w-none">
              <p className="mb-4">
                The Unix Timestamp Converter is a powerful tool for converting between Unix timestamps (epoch time) and human-readable
                dates. Unix timestamps represent the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC (the Unix
                epoch). This format is widely used in programming, databases, and APIs for storing and manipulating date/time data.
                Our converter supports milliseconds, handles timezone conversions, and provides bidirectional conversion.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span><strong>Bidirectional Conversion:</strong> Convert from timestamp to date and vice versa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span><strong>Multiple Formats:</strong> Support for seconds and milliseconds timestamps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span><strong>Timezone Support:</strong> Convert between different timezones with UTC offset display</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span><strong>Current Timestamp:</strong> Quick access to the current Unix timestamp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span><strong>Relative Time:</strong> See how long ago or how far in the future a timestamp is</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
                  <ol className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-teal-600">1.</span>
                      <span>Enter a Unix timestamp or select the current time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-teal-600">2.</span>
                      <span>View the converted human-readable date and time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-teal-600">3.</span>
                      <span>Adjust timezone settings if needed for local time display</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-teal-600">4.</span>
                      <span>Reverse the process by entering a date to get its timestamp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-teal-600">5.</span>
                      <span>Copy the converted value for use in your application</span>
                    </li>
                  </ol>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">What is it?</h3>
              <p className="mb-4">
                A Unix timestamp (also called Epoch time or POSIX time) is a system for describing a point in time as the number of
                seconds that have elapsed since the Unix epoch (00:00:00 UTC on January 1, 1970), not counting leap seconds. This
                makes it a simple and unambiguous way to represent time across different systems and timezones. For example, the
                timestamp 1640995200 represents January 1, 2022, 00:00:00 UTC. Timestamps are stored as integers, making them
                efficient for calculations and comparisons.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Common Use Cases</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span><strong>API Development:</strong> Work with timestamps in REST APIs and web services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span><strong>Database Operations:</strong> Convert between database timestamps and display formats</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span><strong>Log File Analysis:</strong> Decode timestamps in server logs and debugging output</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span><strong>Programming:</strong> Test and debug time-based features in applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span><strong>Data Migration:</strong> Convert dates between different systems and formats</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span><strong>Scheduling:</strong> Calculate exact times for cron jobs and scheduled tasks</span>
                </li>
              </ul>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy & Security</h3>
                <p>
                  All conversions are performed entirely in your browser using client-side JavaScript.
                  Your data never leaves your device and is not transmitted to any server. This ensures
                  complete privacy and security for all your conversions.
                </p>
              </div>
            </div>
          </div>
        </div>
      
        </div>
      </div>
    </div>
  )
}