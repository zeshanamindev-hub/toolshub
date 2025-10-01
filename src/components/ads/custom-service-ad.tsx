"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface CustomServiceAdProps {
  // Branding
  brandName: string
  tagline: string
  icon?: React.ReactNode

  // Content
  headline: string
  description: string
  features: string[]

  // CTA
  buttonText: string
  buttonLink: string
  pricing?: string

  // Trust indicators
  trustIndicators?: string[]

  // Styling
  gradientFrom?: string
  gradientTo?: string
  textColor?: string
}

export default function CustomServiceAd({
  brandName = "Your Service",
  tagline = "Professional Solutions",
  icon,
  headline = "Transform Your Business with Our Professional Services",
  description = "Comprehensive solutions designed to help you achieve your goals with cutting-edge technology and expert support.",
  features = [
    "Advanced Technology",
    "Expert Support",
    "Proven Results"
  ],
  buttonText = "Learn More",
  buttonLink = "#",
  pricing,
  trustIndicators = [
    "✓ 99.9% Satisfaction",
    "✓ 24/7 Support",
    "✓ Money Back Guarantee"
  ],
  gradientFrom = "blue-600",
  gradientTo = "purple-700",
  textColor = "white"
}: CustomServiceAdProps) {
  return (
    <div className={`bg-gradient-to-br from-${gradientFrom} via-indigo-600 to-${gradientTo} rounded-3xl p-8 text-${textColor} relative overflow-hidden shadow-2xl`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-4 right-4 opacity-20">
        {icon || <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold">{brandName.charAt(0)}</span>
        </div>}
      </div>
      <div className="absolute bottom-4 left-4 opacity-20">
        <div className="w-12 h-12 bg-white/20 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="bg-white/20 p-3 rounded-2xl mr-4">
            {icon || <div className="w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold">{brandName.charAt(0)}</span>
            </div>}
          </div>
          <div>
            <h3 className="text-2xl font-bold">{brandName}</h3>
            <p className={`text-${textColor === 'white' ? 'blue-100' : 'gray-600'} text-sm`}>{tagline}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4">
            {headline}
          </h4>
          <p className={`text-${textColor === 'white' ? 'blue-100' : 'gray-600'} mb-6 leading-relaxed`}>
            {description}
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-xs text-white">✓</span>
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {pricing && (
            <div className="flex items-center text-yellow-300">
              <span className="text-sm font-medium">{pricing}</span>
            </div>
          )}

          <Link
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
          >
            {buttonText}
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Trust Indicators */}
        {trustIndicators && trustIndicators.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center justify-between text-xs text-blue-100">
              {trustIndicators.map((indicator, index) => (
                <span key={index}>{indicator}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 skew-x-12 rounded-3xl pointer-events-none" />
    </div>
  )
}