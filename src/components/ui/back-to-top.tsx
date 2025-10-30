"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const scrolled = (scrollPx / winHeightPx) * 100

      setScrollProgress(scrolled)
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })
    toggleVisibility()

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 group"
      aria-label="Back to top"
    >
      {/* Progress circle */}
      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 60 60">
        {/* Background circle */}
        <circle
          cx="30"
          cy="30"
          r="26"
          fill="none"
          stroke="rgba(229, 231, 235, 0.3)"
          strokeWidth="4"
        />
        {/* Progress circle */}
        <circle
          cx="30"
          cy="30"
          r="26"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 26}`}
          strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
          className="transition-all duration-300"
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>

      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="glass-card p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
          <ArrowUp className="h-5 w-5 text-gray-700 group-hover:text-purple-600 transition-colors duration-300" />
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
    </button>
  )
}
