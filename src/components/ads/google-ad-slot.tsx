"use client"

import { useEffect } from "react"

// Declare AdSense global
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

interface GoogleAdSlotProps {
  slot: "header" | "sidebar" | "footer" | "content" | "mobile" | "responsive"
  className?: string
  adSlot?: string // AdSense ad slot ID
  adClient?: string // AdSense publisher ID
}

export default function GoogleAdSlot({
  slot,
  className = "",
  adSlot,
  adClient = "ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense publisher ID
}: GoogleAdSlotProps) {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  const getAdConfig = () => {
    switch (slot) {
      case "header":
        return {
          width: "728",
          height: "90",
          title: "Leaderboard",
          format: "horizontal"
        }
      case "sidebar":
        return {
          width: "300",
          height: "600",
          title: "Large Rectangle",
          format: "vertical"
        }
      case "content":
        return {
          width: "336",
          height: "280",
          title: "Large Rectangle",
          format: "rectangle"
        }
      case "footer":
        return {
          width: "728",
          height: "90",
          title: "Leaderboard",
          format: "horizontal"
        }
      case "mobile":
        return {
          width: "320",
          height: "50",
          title: "Mobile Banner",
          format: "mobile"
        }
      case "responsive":
        return {
          width: "auto",
          height: "auto",
          title: "Responsive Ad",
          format: "responsive"
        }
      default:
        return {
          width: "300",
          height: "250",
          title: "Medium Rectangle",
          format: "rectangle"
        }
    }
  }

  const config = getAdConfig()

  // For responsive ads, use auto-sizing
  const containerStyle = config.format === "responsive"
    ? { minHeight: "100px" }
    : { width: `${config.width}px`, height: `${config.height}px` }

  return (
    <div className={`ad-container ${className}`}>
      {/* Google AdSense Ad Unit */}
      <ins
        className="adsbygoogle"
        style={containerStyle}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={config.format === "responsive" ? "auto" : undefined}
        data-full-width-responsive={config.format === "responsive" ? "true" : undefined}
      />

      {/* Fallback for when ads don't load */}
      <div className={`bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center ${className}`}
            style={containerStyle}>
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Advertisement</div>
          <div className="text-xs text-gray-500">{config.title}</div>
          <div className="text-xs text-gray-400 mt-1">
            {config.format === "responsive" ? "Responsive" : `${config.width} × ${config.height}`}
          </div>
        </div>
      </div>
    </div>
  )
}