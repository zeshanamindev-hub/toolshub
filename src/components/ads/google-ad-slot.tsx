"use client"

import { useEffect } from "react"

// Declare AdSense global
declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface GoogleAdSlotProps {
  slot: "header" | "sidebar" | "footer" | "content" | "mobile" | "responsive" | "homepage-top" | "homepage-middle" | "homepage-bottom"
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
      case "homepage-top":
      case "homepage-middle":
      case "homepage-bottom":
        return {
          width: "728",
          height: "90",
          title: "Leaderboard",
          format: "horizontal"
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
    </div>
  )
}