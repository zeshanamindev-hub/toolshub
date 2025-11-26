"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Hash, Copy, Trash2, Twitter, Facebook, Instagram } from "lucide-react"

interface CharacterStats {
  total: number
  withoutSpaces: number
  spaces: number
  letters: number
  numbers: number
  punctuation: number
  lines: number
}

interface SocialMediaLimit {
  platform: string
  limit: number
  icon: React.ElementType
  color: string
  remaining: number
  percentage: number
}

export default function CharacterCounterClient() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState<CharacterStats>({
    total: 0,
    withoutSpaces: 0,
    spaces: 0,
    letters: 0,
    numbers: 0,
    punctuation: 0,
    lines: 0,
  })

  const calculateStats = (inputText: string): CharacterStats => {
    const total = inputText.length
    const withoutSpaces = inputText.replace(/\s/g, "").length
    const spaces = total - withoutSpaces
    const letters = (inputText.match(/[a-zA-Z]/g) || []).length
    const numbers = (inputText.match(/[0-9]/g) || []).length
    const punctuation = (inputText.match(/[^\w\s]/g) || []).length
    const lines = inputText === "" ? 0 : inputText.split("\n").length

    return {
      total,
      withoutSpaces,
      spaces,
      letters,
      numbers,
      punctuation,
      lines,
    }
  }

  useEffect(() => {
    setStats(calculateStats(text))
  }, [text])

  const handleClear = () => {
    setText("")
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const socialMediaLimits: SocialMediaLimit[] = [
    {
      platform: "Twitter/X",
      limit: 280,
      icon: Twitter,
      color: "text-blue-500",
      remaining: Math.max(0, 280 - stats.total),
      percentage: Math.min(100, (stats.total / 280) * 100),
    },
    {
      platform: "Facebook",
      limit: 63206,
      icon: Facebook,
      color: "text-blue-600",
      remaining: Math.max(0, 63206 - stats.total),
      percentage: Math.min(100, (stats.total / 63206) * 100),
    },
    {
      platform: "Instagram",
      limit: 2200,
      icon: Instagram,
      color: "text-pink-500",
      remaining: Math.max(0, 2200 - stats.total),
      percentage: Math.min(100, (stats.total / 2200) * 100),
    },
  ]

  const statCards = [
    { label: "Total Characters", value: stats.total, color: "text-blue-600" },
    { label: "Without Spaces", value: stats.withoutSpaces, color: "text-green-600" },
    { label: "Spaces", value: stats.spaces, color: "text-gray-600" },
    { label: "Letters", value: stats.letters, color: "text-purple-600" },
    { label: "Numbers", value: stats.numbers, color: "text-orange-600" },
    { label: "Punctuation", value: stats.punctuation, color: "text-red-600" },
    { label: "Lines", value: stats.lines, color: "text-indigo-600" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Hash className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Character Counter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Count characters with detailed breakdown and social media limits. 
            Perfect for tweets, posts, and content creation.
          </p>
        </div>

        {/* Main Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Text Input */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Text</CardTitle>
                <CardDescription>
                  Type or paste your text to get detailed character analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Start typing or paste your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
                <div className="flex gap-2">
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Text
                  </Button>
                  <Button onClick={handleClear} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Character Analysis</CardTitle>
                <CardDescription>
                  Detailed breakdown of your text
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {statCards.map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      {stat.label}
                    </span>
                    <span className={`text-lg font-bold ${stat.color}`}>
                      {stat.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Media Limits */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Limits</CardTitle>
              <CardDescription>
                Check how your text fits within popular platform limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {socialMediaLimits.map((platform) => {
                  const Icon = platform.icon
                  const isOverLimit = stats.total > platform.limit
                  
                  return (
                    <div key={platform.platform} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Icon className={`h-5 w-5 ${platform.color}`} />
                        <span className="font-medium">{platform.platform}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Used: {stats.total.toLocaleString()}</span>
                          <span>Limit: {platform.limit.toLocaleString()}</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              isOverLimit ? "bg-red-500" : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min(100, platform.percentage)}%` }}
                          />
                        </div>
                        
                        <div className={`text-sm font-medium ${
                          isOverLimit ? "text-red-600" : "text-green-600"
                        }`}>
                          {isOverLimit 
                            ? `${(stats.total - platform.limit).toLocaleString()} over limit`
                            : `${platform.remaining.toLocaleString()} characters remaining`
                          }
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Why use our character counter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-blue-600 font-bold mb-2">Real-time Analysis</div>
                  <p className="text-sm text-gray-600">
                    Instant character counting as you type
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-green-600 font-bold mb-2">Detailed Breakdown</div>
                  <p className="text-sm text-gray-600">
                    Letters, numbers, punctuation, and more
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-purple-600 font-bold mb-2">Social Media Limits</div>
                  <p className="text-sm text-gray-600">
                    Check limits for Twitter, Facebook, Instagram
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-orange-600 font-bold mb-2">Copy & Clear</div>
                  <p className="text-sm text-gray-600">
                    Easy text management with one-click actions
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