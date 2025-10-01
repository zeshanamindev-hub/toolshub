'use client'

import { useState } from "react"
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
  Shield
} from "lucide-react"

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

export default function BMICalculatorPage() {
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
    // Simplified body fat estimation based on BMI and demographics
    let baseFat = 0
    if (gender === "male") {
      baseFat = 10 + (bmi - 20) * 0.5
    } else {
      baseFat = 18 + (bmi - 20) * 0.5
    }

    // Age adjustment
    const ageAdjustment = (age - 30) * 0.1
    baseFat += ageAdjustment

    return {
      min: Math.max(3, Math.round((baseFat - 2) * 10) / 10),
      max: Math.min(50, Math.round((baseFat + 2) * 10) / 10)
    }
  }

  const calculateHealthMetrics = (weight: number, height: number, age: number, gender: string, activity: string): HealthMetrics => {
    // BMR calculation using Mifflin-St Jeor Equation
    const bmr = gender === "male"
      ? 10 * weight + 6.25 * (height * 100) - 5 * age + 5
      : 10 * weight + 6.25 * (height * 100) - 5 * age - 161

    // TDEE calculation based on activity level
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    } as const

    const tdee = Math.round(bmr * (activityMultipliers[activity as keyof typeof activityMultipliers] || 1.55))

    // Water intake (30ml per kg)
    const waterIntake = Math.round(weight * 30)

    // Protein needs (1.6g per kg for general health)
    const proteinNeeds = Math.round(weight * 1.6)

    return { bmr: Math.round(bmr), tdee, waterIntake, proteinNeeds }
  }

  const getRecommendations = (bmi: number): string[] => {
    const recommendations = []

    if (bmi < 18.5) {
      recommendations.push("Consider consulting a healthcare provider about healthy weight gain strategies")
      recommendations.push("Focus on nutrient-dense foods and strength training")
      recommendations.push("Aim for gradual weight gain of 0.5-1 lb per week")
    } else if (bmi < 25) {
      recommendations.push("Maintain your healthy weight with balanced nutrition and regular exercise")
      recommendations.push("Continue with your current healthy lifestyle habits")
      recommendations.push("Regular health check-ups are recommended")
    } else if (bmi < 30) {
      recommendations.push("Consider gradual weight loss of 0.5-1 lb per week through diet and exercise")
      recommendations.push("Increase physical activity to 150 minutes of moderate exercise per week")
      recommendations.push("Focus on whole foods and portion control")
    } else {
      recommendations.push("Consult a healthcare provider for personalized weight management plan")
      recommendations.push("Consider working with a registered dietitian")
      recommendations.push("Regular monitoring of blood pressure and blood sugar is important")
    }

    return recommendations
  }

  const handleCalculate = () => {
    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)
    const ageNum = parseInt(age) || 30

    if (!heightNum || !weightNum) return

    // Convert to metric if needed
    let heightM = heightNum
    let weightKg = weightNum

    if (unit === "imperial") {
      heightM = heightNum * 0.0254 // inches to meters
      weightKg = weightNum * 0.453592 // pounds to kg
    }

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

    // Add to history
    const historyEntry: BMIHistory = {
      date: new Date().toISOString(),
      bmi,
      weight: weightKg,
      height: heightM,
      category: categoryInfo.category
    }

    setHistory(prev => [historyEntry, ...prev.slice(0, 9)]) // Keep last 10 entries
  }

  const handleClear = () => {
    setHeight("")
    setWeight("")
    setAge("")
    setResult(null)
  }

  const handleCopy = async () => {
    if (!result) return

    const shareText = `My BMI: ${result.bmi} (${result.category})\nIdeal weight range: ${result.idealWeightRange.min}-${result.idealWeightRange.max} kg\nCalculated with Tools Hub BMI Calculator`

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
      calculation: {
        height: parseFloat(height),
        weight: parseFloat(weight),
        unit,
        age: parseInt(age) || 30,
        gender,
        activityLevel
      },
      results: result,
      healthMetrics: showAdvanced ? calculateHealthMetrics(
        unit === "imperial" ? parseFloat(weight) * 0.453592 : parseFloat(weight),
        unit === "imperial" ? parseFloat(height) * 0.0254 : parseFloat(height),
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
    unit === "imperial" ? parseFloat(height) * 0.0254 : parseFloat(height),
    parseInt(age) || 30,
    gender,
    activityLevel
  ) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50/20 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl">
                <Activity className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent mb-4 sm:mb-6">
            Advanced BMI Calculator
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive health assessment with BMI calculation, body fat estimation,
            and personalized health recommendations for optimal wellness.
          </p>
        </div>

        {/* BMI Scale Visualization */}
        {result && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${result.categoryBg} ${result.categoryColor} font-semibold text-sm`}>
                    <Target className="h-4 w-4 mr-2" />
                    Your BMI: {result.bmi} - {result.category}
                  </div>
                </div>

                {/* BMI Scale */}
                <div className="relative mb-4">
                  <div className="flex h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-1/6 bg-blue-500 relative">
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-700">Under</span>
                    </div>
                    <div className="w-1/6 bg-green-500 relative">
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-green-700">Normal</span>
                    </div>
                    <div className="w-1/6 bg-yellow-500 relative">
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-yellow-700">Over</span>
                    </div>
                    <div className="w-1/6 bg-orange-500 relative">
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-orange-700">Obese I</span>
                    </div>
                    <div className="w-1/6 bg-red-500 relative">
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-red-700">Obese II</span>
                    </div>
                    <div className="w-1/6 bg-red-700 relative">
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-red-100">Obese III</span>
                    </div>
                  </div>

                  {/* BMI Indicator */}
                  <div
                    className="absolute top-0 h-6 w-1 bg-gray-900 transform -translate-x-1/2 transition-all duration-500"
                    style={{ left: `${Math.min(100, Math.max(0, ((result.bmi - 15) / 25) * 100))}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {result.bmi}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-600">
                  BMI Scale: 15 - 40+ | Your Position: {result.category}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Input Section - Spans 3 columns */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl flex items-center space-x-2">
                      <Scale className="h-6 w-6 text-emerald-600" />
                      <span>Health Calculator</span>
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      Enter your measurements for comprehensive BMI analysis
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      variant="outline"
                      size="sm"
                      className="hidden sm:flex"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {showAdvanced ? 'Basic' : 'Advanced'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Unit Selection */}
                <div className="flex gap-4">
                  <Button
                    variant={unit === "metric" ? "default" : "outline"}
                    onClick={() => setUnit("metric")}
                    className="flex-1"
                  >
                    Metric (kg, cm)
                  </Button>
                  <Button
                    variant={unit === "imperial" ? "default" : "outline"}
                    onClick={() => setUnit("imperial")}
                    className="flex-1"
                  >
                    Imperial (lb, in)
                  </Button>
                </div>

                {/* Basic Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height ({unit === "metric" ? "cm" : "inches"})
                    </label>
                    <Input
                      type="number"
                      placeholder={unit === "metric" ? "170" : "67"}
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="text-lg"
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
                      className="text-lg"
                    />
                  </div>
                </div>

                {/* Advanced Inputs */}
                {showAdvanced && (
                  <div className="border-t pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="sedentary">Sedentary</option>
                          <option value="light">Light Exercise</option>
                          <option value="moderate">Moderate Exercise</option>
                          <option value="active">Active</option>
                          <option value="very_active">Very Active</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleCalculate}
                    disabled={!height || !weight}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Calculate BMI
                  </Button>
                  <Button onClick={handleCopy} variant="outline" disabled={!result}>
                    {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
                    {copied ? 'Copied!' : 'Share Results'}
                  </Button>
                  <Button onClick={handleClear} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button onClick={exportResults} variant="outline" disabled={!result} className="hidden sm:flex">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel - 1 column */}
          <div className="space-y-6">
            {/* BMI Result */}
            {result && (
              <Card className={`shadow-lg ${result.categoryBg} border-0`}>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-lg ${result.categoryColor}`}>Your BMI Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${result.categoryColor} mb-2`}>
                      {result.bmi}
                    </div>
                    <div className={`text-lg font-semibold ${result.categoryColor} mb-1`}>
                      {result.category}
                    </div>
                    <div className="text-sm text-gray-600">
                      Health Risk: <span className={`font-medium ${result.categoryColor}`}>{result.healthRisk}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ideal Weight:</span>
                      <span className="font-medium">
                        {result.idealWeightRange.min}-{result.idealWeightRange.max} kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Body Fat Est.:</span>
                      <span className="font-medium">
                        {result.bodyFatEstimate.min}-{result.bodyFatEstimate.max}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Health Metrics */}
            {healthMetrics && (
              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Health Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">BMR</span>
                    </div>
                    <span className="text-sm font-bold">{healthMetrics.bmr} cal</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">TDEE</span>
                    </div>
                    <span className="text-sm font-bold">{healthMetrics.tdee} cal</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Info className="h-4 w-4 text-cyan-500" />
                      <span className="text-sm font-medium">Water</span>
                    </div>
                    <span className="text-sm font-bold">{healthMetrics.waterIntake} ml</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Protein</span>
                    </div>
                    <span className="text-sm font-bold">{healthMetrics.proteinNeeds} g</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* BMI History */}
            {history.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                    <span>Recent History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {history.slice(0, 5).map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-sm">
                        <div>
                          <div className="font-medium">{entry.bmi}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(entry.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-600">{entry.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recommendations */}
        {result && (
          <div className="mb-8">
            <Card className="shadow-xl bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-emerald-600" />
                  <span>Health Recommendations</span>
                </CardTitle>
                <CardDescription>
                  Personalized advice based on your BMI results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-white/60 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Section */}
        <Card className="shadow-xl bg-gradient-to-r from-slate-50 to-emerald-50 border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl">Advanced Features</CardTitle>
            <CardDescription className="text-lg">
              Comprehensive health assessment tools for better wellness tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Activity,
                  title: "BMI Categories",
                  description: "Precise classification with health risk assessment",
                  color: "text-emerald-600"
                },
                {
                  icon: Target,
                  title: "Ideal Weight Range",
                  description: "Calculate healthy weight goals based on your height",
                  color: "text-blue-600"
                },
                {
                  icon: BarChart3,
                  title: "Body Fat Estimation",
                  description: "Estimate body fat percentage using advanced algorithms",
                  color: "text-purple-600"
                },
                {
                  icon: Heart,
                  title: "Health Metrics",
                  description: "BMR, TDEE, water intake, and protein recommendations",
                  color: "text-red-600"
                },
                {
                  icon: TrendingUp,
                  title: "Progress Tracking",
                  description: "Monitor your BMI changes over time",
                  color: "text-orange-600"
                },
                {
                  icon: Shield,
                  title: "Privacy First",
                  description: "All calculations happen locally in your browser",
                  color: "text-green-600"
                },
                {
                  icon: Download,
                  title: "Export Results",
                  description: "Save your health data in JSON format",
                  color: "text-indigo-600"
                },
                {
                  icon: Share2,
                  title: "Share Results",
                  description: "Copy and share your BMI results easily",
                  color: "text-cyan-600"
                }
              ].map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="text-center group">
                    <div className="mx-auto w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* BMI Information */}
        <div className="mt-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Understanding BMI</CardTitle>
              <CardDescription>What your BMI means for your health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="font-medium text-gray-900 flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    Underweight ({'<'} 18.5)
                  </p>
                  <p className="text-gray-600">May indicate malnutrition or other health concerns</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    Normal (18.5-24.9)
                  </p>
                  <p className="text-gray-600">Generally considered healthy weight range</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900 flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    Overweight (25-29.9)
                  </p>
                  <p className="text-gray-600">May increase risk for certain health conditions</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900 flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    Obese (≥ 30)
                  </p>
                  <p className="text-gray-600">Higher risk for serious health complications</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">Important Note</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      BMI is a screening tool, not a diagnostic tool. It doesn't account for muscle mass,
                      bone density, or body composition. Consult healthcare professionals for personalized advice.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
