"use client"

interface GoogleAdSlotProps {
  slot: "header" | "sidebar" | "footer" | "content"
  className?: string
}

export default function GoogleAdSlot({ slot, className = "" }: GoogleAdSlotProps) {
  const getAdConfig = () => {
    switch (slot) {
      case "header":
        return {
          width: "728",
          height: "90",
          title: "Header Advertisement"
        }
      case "sidebar":
        return {
          width: "300",
          height: "250",
          title: "Sidebar Advertisement"
        }
      case "content":
        return {
          width: "468",
          height: "60",
          title: "Content Advertisement"
        }
      case "footer":
        return {
          width: "728",
          height: "90",
          title: "Footer Advertisement"
        }
      default:
        return {
          width: "300",
          height: "250",
          title: "Advertisement"
        }
    }
  }

  const config = getAdConfig()

  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center ${className}`} 
         style={{ width: `${config.width}px`, height: `${config.height}px` }}>
      <div className="text-center">
        <div className="text-xs text-gray-400 mb-1">Advertisement</div>
        <div className="text-xs text-gray-500">{config.title}</div>
        <div className="text-xs text-gray-400 mt-1">{config.width} × {config.height}</div>
      </div>
      {/* Add actual Google AdSense code here */}
    </div>
  )
}