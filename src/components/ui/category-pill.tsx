"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface CategoryPillProps {
  name: string
  href: string
  icon?: LucideIcon
  count?: number
  active?: boolean
  gradient?: string
}

export default function CategoryPill({
  name,
  href,
  icon: Icon,
  count,
  active = false,
  gradient = "from-blue-500 to-purple-500"
}: CategoryPillProps) {
  return (
    <Link
      href={href}
      className={`
        group relative inline-flex items-center gap-2 px-6 py-3 rounded-full
        transition-all duration-300 magnetic
        ${active
          ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
          : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:text-white border border-gray-200 hover:border-transparent'
        }
      `}
    >
      {/* Hover gradient background */}
      {!active && (
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`} />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4" />}
        <span className="font-bold text-sm">{name}</span>
        {count !== undefined && (
          <span className={`
            px-2 py-0.5 text-xs font-bold rounded-full
            ${active
              ? 'bg-white/20'
              : 'bg-gray-100 text-gray-600 group-hover:bg-white/20 group-hover:text-white'
            }
            transition-colors duration-300
          `}>
            {count}
          </span>
        )}
      </div>

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradient} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`} />
    </Link>
  )
}
