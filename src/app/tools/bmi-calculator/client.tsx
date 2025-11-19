'use client'

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Activity,
  Target,
  TrendingUp,
  Download,
  Settings,
  CheckCircle,
  AlertTriangle,
  Heart,
  Scale,
  Zap,
  Award,
  Calendar,
  Share2,
  RefreshCw,
  Info,
  BarChart3,
  Shield,
  Search,
  ChevronRight,
  FileText
} from "lucide-react"
import Link from "next/link"
import { ALL_TOOLS } from "@/lib/constants"

interface BMIResult {
  bmi: number
  category: string
  categoryColor: string
  categoryBg: string
  healthRisk: string
  idealWeightRange: { min: number; max: number }
  bodyFatEstimate: { min: number; max: number }
  recommendations: string[]
}

interface BMIHistory {
  date: string
  bmi: number
  weight: number
  height: number
  category: string
}

interface HealthMetrics {
  bmr: number
  tdee: number
  waterIntake: number
  proteinNeeds: number
}

export default function BmiCalculatorClient() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [activityLevel, setActivityLevel] = useState<"sedentary" | "light" | "moderate" | "active" | "very_active">("moderate")
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [result, setResult] = useState<BMIResult | null>(null)
  const [history, setHistory] = useState<BMIHistory[]>([])
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Get relevant tools
  const relevantTools = ALL_TOOLS.filter(tool =>
    tool.href.includes('bmi') ||
    tool.href.includes('percentage') ||
    tool.href.includes('calorie') 
  ).slice(0, 5)

  // Get other tools
  const otherTools = ALL_TOOLS.filter(tool =>
    !tool.href.includes('bmi')
  ).slice(0, 6)
  
  const filteredRelevantTools = relevantTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const calculateBMI = (weightKg: number, heightM: number): number => {
    return Math.round((weightKg / (heightM * heightM)) * 10) / 10
  }

  const getBMICategory = (bmi: number): { category: string; color: string; bg: string; risk: string } => {
    if (bmi < 18.5) return {
      category: "Underweight",
      color: "text-blue-600",
      bg: "bg-blue-50",
      risk: "Low"
    }
    if (bmi < 25) return {
      category: "Normal Weight",
      color: "text-green-600",
      bg: "bg-green-50",
      risk: "Low"
    }
    if (bmi < 30) return {
      category: "Overweight",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      risk: "Moderate"
    }
    if (bmi < 35) return {
      category: "Obese Class I",
      color: "text-orange-600",
      bg: "bg-orange-50",
      risk: "High"
    }
    if (bmi < 40) return {
      category: "Obese Class II",
      color: "text-red-600",
      bg: "bg-red-50",
      risk: "Very High"
    }
    return {
      category: "Obese Class III",
      color: "text-red-800",
      bg: "bg-red-50",
      risk: "Extremely High"
    }
  }

  const calculateIdealWeight = (heightM: number): { min: number; max: number } => {
    const minBMI = 18.5
    const maxBMI = 24.9
    return {
      min: Math.round(minBMI * heightM * heightM * 10) / 10,
      max: Math.round(maxBMI * heightM * heightM * 10) / 10
    }
  }

  const estimateBodyFat = (bmi: number, age: number, gender: string): { min: number; max: number } => {
    let baseFat = 0
    if (gender === "male") {
      baseFat = 10 + (bmi - 20) * 0.5
    } else {
      baseFat = 18 + (bmi - 20) * 0.5
    }
    const ageAdjustment = (age - 30) * 0.1
    baseFat += ageAdjustment
    return {
      min: Math.max(3, Math.round((baseFat - 2) * 10) / 10),
      max: Math.min(50, Math.round((baseFat + 2) * 10) / 10)
    }
  }

  const calculateHealthMetrics = (weight: number, height: number, age: number, gender: string, activity: string): HealthMetrics => {
    const bmr = gender === "male"
      ? 10 * weight + 6.25 * (height * 100) - 5 * age + 5
      : 10 * weight + 6.25 * (height * 100) - 5 * age - 161
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    } as const
    const tdee = Math.round(bmr * (activityMultipliers[activity as keyof typeof activityMultipliers] || 1.55))
    const waterIntake = Math.round(weight * 30)
    const proteinNeeds = Math.round(weight * 1.6)
    return { bmr: Math.round(bmr), tdee, waterIntake, proteinNeeds }
  }

  const getRecommendations = (bmi: number): string[] => {
    const recommendations = []
    if (bmi < 18.5) {
      recommendations.push("Consult a healthcare provider for healthy weight gain strategies.")
      recommendations.push("Focus on nutrient-dense foods and strength training.")
    } else if (bmi < 25) {
      recommendations.push("Maintain a balanced diet and regular exercise.")
      recommendations.push("Continue your healthy lifestyle habits.")
    } else if (bmi < 30) {
      recommendations.push("Incorporate more physical activity and portion control.")
      recommendations.push("Focus on whole foods and reduce processed items.")
    } else {
      recommendations.push("Consult a healthcare provider for a personalized weight management plan.")
      recommendations.push("Consider working with a registered dietitian.")
    }
    return recommendations
  }

  const handleCalculate = () => {
    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)
    const ageNum = parseInt(age) || 30
    if (!heightNum || !weightNum) return

    const heightM = unit === "metric" ? heightNum / 100 : heightNum * 0.0254
    const weightKg = unit === "metric" ? weightNum : weightNum * 0.453592

    const bmi = calculateBMI(weightKg, heightM)
    const categoryInfo = getBMICategory(bmi)
    const idealWeight = calculateIdealWeight(heightM)
    const bodyFat = estimateBodyFat(bmi, ageNum, gender)
    const recommendations = getRecommendations(bmi)

    const newResult: BMIResult = {
      bmi,
      category: categoryInfo.category,
      categoryColor: categoryInfo.color,
      categoryBg: categoryInfo.bg,
      healthRisk: categoryInfo.risk,
      idealWeightRange: idealWeight,
      bodyFatEstimate: bodyFat,
      recommendations
    }
    setResult(newResult)

    const historyEntry: BMIHistory = {
      date: new Date().toISOString(),
      bmi,
      weight: weightKg,
      height: heightM,
      category: categoryInfo.category
    }
    setHistory(prev => [historyEntry, ...prev.slice(0, 9)])
  }

  const handleClear = () => {
    setHeight("")
    setWeight("")
    setAge("")
    setResult(null)
  }

  const handleCopy = async () => {
    if (!result) return
    const shareText = `My BMI: ${result.bmi} (${result.category})\nIdeal weight: ${result.idealWeightRange.min}-${result.idealWeightRange.max} kg\nCalculated with Tools Hub BMI Calculator`
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const exportResults = () => {
    if (!result) return
    const exportData = {
      calculation: { height: parseFloat(height), weight: parseFloat(weight), unit, age: parseInt(age) || 30, gender, activityLevel },
      results: result,
      healthMetrics: showAdvanced ? calculateHealthMetrics(
        unit === "imperial" ? parseFloat(weight) * 0.453592 : parseFloat(weight),
        unit === "imperial" ? parseFloat(height) * 0.0254 : parseFloat(height) / 100,
        parseInt(age) || 30,
        gender,
        activityLevel
      ) : null,
      timestamp: new Date().toISOString(),
      history: history.slice(0, 5)
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bmi-analysis-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const healthMetrics = result && showAdvanced ? calculateHealthMetrics(
    unit === "imperial" ? parseFloat(weight) * 0.453592 : parseFloat(weight),
    unit === "metric" ? parseFloat(height) / 100 : parseFloat(height) * 0.0254,
    parseInt(age) || 30,
    gender,
    activityLevel
  ) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50/20">
      <section className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-4">
              <Activity className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold text-gray-700">Health Calculator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Advanced BMI Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive tool for assessing your health and wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-4">
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

              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <h3 className="text-sm font-bold text-gray-900">Relevant Tools</h3>
                </div>
                <div className="space-y-1">
                  {(searchQuery ? filteredRelevantTools : relevantTools).map((tool, index) => (
                    <Link
                      key={index}
                      href={tool.href}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-purple-600" />
                      <span className="text-xs text-gray-700 group-hover:text-purple-600 font-medium">
                        {tool.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-orange-600" />
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
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4">
                    <Button
                      variant={unit === "metric" ? "default" : "outline"}
                      onClick={() => setUnit("metric")}
                      className="flex-1"
                    >
                      Metric
                    </Button>
                    <Button
                      variant={unit === "imperial" ? "default" : "outline"}
                      onClick={() => setUnit("imperial")}
                      className="flex-1"
                    >
                      Imperial
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Height ({unit === "metric" ? "cm" : "in"})
                      </label>
                      <Input
                        type="number"
                        placeholder={unit === "metric" ? "170" : "67"}
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight ({unit === "metric" ? "kg" : "lbs"})
                      </label>
                      <Input
                        type="number"
                        placeholder={unit === "metric" ? "70" : "154"}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                  </div>
                  {showAdvanced && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                        <Input
                          type="number"
                          placeholder="30"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value as "male" | "female")}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                        <select
                          value={activityLevel}
                          onChange={(e) => setActivityLevel(e.target.value as "sedentary" | "light" | "moderate" | "active" | "very_active")}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="sedentary">Sedentary</option>
                          <option value="light">Light</option>
                          <option value="moderate">Moderate</option>
                          <option value="active">Active</option>
                          <option value="very_active">Very Active</option>
                        </select>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-4">
                    <Button onClick={handleCalculate} disabled={!height || !weight}>
                      Calculate
                    </Button>
                    <Button onClick={() => setShowAdvanced(!showAdvanced)} variant="link">
                      {showAdvanced ? "Basic" : "Advanced"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {result && (
                <Card>
                  <CardHeader>
                    <CardTitle>Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${result.categoryColor}`}>{result.bmi}</div>
                      <div className={`text-lg font-semibold ${result.categoryColor}`}>{result.category}</div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold">Ideal Weight</h4>
                        <p>{result.idealWeightRange.min} - {result.idealWeightRange.max} kg</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Body Fat % (Est.)</h4>
                        <p>{result.bodyFatEstimate.min}% - {result.bodyFatEstimate.max}%</p>
                      </div>
                    </div>
                    {healthMetrics && (
                      <div className="mt-4">
                        <h4 className="font-semibold">Daily Health Metrics</h4>
                        <ul className="list-disc list-inside">
                          <li>BMR: {healthMetrics.bmr} calories</li>
                          <li>TDEE: {healthMetrics.tdee} calories</li>
                          <li>Water Intake: {healthMetrics.waterIntake} ml</li>
                          <li>Protein Needs: {healthMetrics.proteinNeeds} g</li>
                        </ul>
                      </div>
                    )}
                    <div className="mt-4">
                      <h4 className="font-semibold">Recommendations</h4>
                      <ul className="list-disc list-inside">
                        {result.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                      </ul>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleCopy} variant="outline" size="sm">
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                      <Button onClick={exportResults} variant="outline" size="sm">
                        Export
                      </Button>
                      <Button onClick={handleClear} variant="outline" size="sm">
                        Clear
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {history.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {history.map((entry, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{new Date(entry.date).toLocaleDateString()}</span>
                          <span>{entry.bmi} ({entry.category})</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
