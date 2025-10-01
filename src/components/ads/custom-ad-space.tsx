"use client"

interface CustomAdSpaceProps {
  id: string
  title?: string
  size?: "small" | "medium" | "large" | "banner" | "sidebar"
  className?: string
  placeholder?: string
  showBorder?: boolean
}

export default function CustomAdSpace({
  id,
  title = "Advertisement",
  size = "medium",
  className = "",
  placeholder = "Your ad here",
  showBorder = true
}: CustomAdSpaceProps) {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "min-h-[100px] w-full max-w-sm"
      case "medium":
        return "min-h-[200px] w-full max-w-md"
      case "large":
        return "min-h-[300px] w-full max-w-lg"
      case "banner":
        return "min-h-[90px] w-full"
      case "sidebar":
        return "min-h-[600px] w-full max-w-xs"
      default:
        return "min-h-[200px] w-full max-w-md"
    }
  }

  const borderClasses = showBorder
    ? "border-2 border-dashed border-gray-300"
    : ""

  return (
    <div
      id={`custom-ad-${id}`}
      className={`custom-ad-space bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 flex items-center justify-center text-center ${getSizeClasses()} ${borderClasses} ${className}`}
    >
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-600">
          {title}
        </div>
        <div className="text-lg font-bold text-gray-800">
          {placeholder}
        </div>
        <div className="text-xs text-gray-500">
          Custom Ad Space - {size} ({id})
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Replace this content with your advertisement
        </div>
      </div>

      {/* This div can be targeted by JavaScript to inject custom ad content */}
      <div
        id={`ad-content-${id}`}
        className="hidden"
        data-ad-type="custom"
        data-ad-size={size}
      />
    </div>
  )
}