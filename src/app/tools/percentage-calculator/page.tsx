"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Calculator,
  Copy,
  Trash2,
  RotateCcw,
  Percent,
  ArrowRight,
  CheckCircle
} from "lucide-react"

interface CalculationResult {
  result: number;
  formula: string;
  explanation: string;
}

export default function PercentageCalculatorPage() {
  // States for different calculation types
  const [value1, setValue1] = useState("")
  const [value2, setValue2] = useState("")
  const [calculationType, setCalculationType] = useState<"percentage" | "percentageOf" | "percentageChange">("percentage")
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [copied, setCopied] = useState(false)

  const calculatePercentage = () => {
    let calcResult: CalculationResult = {
      result: 0,
      formula: "",
      explanation: ""
    }

    const num1 = parseFloat(value1)
    const num2 = parseFloat(value2)

    if (isNaN(num1) || isNaN(num2)) {
      return
    }

    switch (calculationType) {
      case "percentage":
        // What is X% of Y?
        calcResult.result = (num1 * num2) / 100
        calcResult.formula = `(${num1} × ${num2}) ÷ 100`
        calcResult.explanation = `${num1}% of ${num2} is ${calcResult.result}`
        break

      case "percentageOf":
        // X is what percentage of Y?
        calcResult.result = (num1 / num2) * 100
        calcResult.formula = `(${num1} ÷ ${num2}) × 100`
        calcResult.explanation = `${num1} is ${calcResult.result}% of ${num2}`
        break

      case "percentageChange":
        // Percentage change from X to Y
        calcResult.result = ((num2 - num1) / num1) * 100
        calcResult.formula = `((${num2} - ${num1}) ÷ ${num1}) × 100`
        calcResult.explanation = `The percentage change from ${num1} to ${num2} is ${calcResult.result}%`
        break
    }

    setResult(calcResult)
  }

  const reset = () => {
    setValue1("")
    setValue2("")
    setResult(null)
  }

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result.result.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            Percentage Calculator
          </CardTitle>
          <CardDescription>
            Calculate percentages, find what percentage one number is of another, or calculate percentage change between two numbers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                variant={calculationType === "percentage" ? "default" : "outline"}
                onClick={() => setCalculationType("percentage")}
                className="flex-1"
              >
                What is X% of Y?
              </Button>
              <Button
                variant={calculationType === "percentageOf" ? "default" : "outline"}
                onClick={() => setCalculationType("percentageOf")}
                className="flex-1"
              >
                X is what % of Y?
              </Button>
              <Button
                variant={calculationType === "percentageChange" ? "default" : "outline"}
                onClick={() => setCalculationType("percentageChange")}
                className="flex-1"
              >
                % Change from X to Y
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {calculationType === "percentage" ? "Percentage (X%)" :
                   calculationType === "percentageOf" ? "Number (X)" :
                   "Original Value (X)"}
                </label>
                <Input
                  type="number"
                  placeholder="Enter number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {calculationType === "percentage" ? "Number (Y)" :
                   calculationType === "percentageOf" ? "Total (Y)" :
                   "New Value (Y)"}
                </label>
                <Input
                  type="number"
                  placeholder="Enter number"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={calculatePercentage}
                className="flex-1"
                disabled={!value1 || !value2}
              >
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={reset}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Reset
              </Button>
            </div>

            {result && (
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-semibold">
                        Result: {result.result.toFixed(2)}
                        {calculationType !== "percentageOf" && "%"}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyResult}
                        className="gap-2"
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>Formula: {result.formula}</div>
                      <div>Explanation: {result.explanation}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}