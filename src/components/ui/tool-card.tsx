import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"

interface ToolCardProps {
  name: string
  description: string
  href: string
  icon: LucideIcon
  color?: string
  featured?: boolean
  large?: boolean
}

export default function ToolCard({
  name,
  description,
  href,
  icon: Icon,
  color = "text-blue-600",
  featured = false,
  large = false
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className={`
        group relative overflow-hidden rounded-3xl p-6
        glass-card card-lift magnetic
        border border-gray-200/50 hover:border-transparent
        ${large ? 'md:col-span-2 md:row-span-2 p-8' : ''}
        ${featured ? 'ring-2 ring-purple-500/20' : ''}
      `}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
        <div className="shimmer absolute inset-0" />
      </div>

      {/* Floating background blob */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${color.replace('text-', 'from-')}/10 to-purple-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-morph`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="mb-4 inline-flex">
          <div className={`
            p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100
            group-hover:from-blue-50 group-hover:to-purple-50
            transition-all duration-300
            group-hover:shadow-lg group-hover:scale-110
            ${large ? 'p-6' : 'p-4'}
          `}>
            <Icon className={`${color} ${large ? 'h-12 w-12' : 'h-8 w-8'} transition-transform duration-300 group-hover:scale-110`} />
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 ${large ? 'text-3xl' : 'text-xl'}`}>
          {name}
        </h3>

        {/* Description */}
        <p className={`text-gray-600 leading-relaxed flex-grow ${large ? 'text-lg' : 'text-sm'}`}>
          {description}
        </p>

        {/* CTA */}
        <div className="mt-6 flex items-center text-blue-600 group-hover:text-purple-600 font-semibold transition-colors duration-300">
          <span className={large ? 'text-base' : 'text-sm'}>Try it now</span>
          <ArrowRight className={`ml-2 ${large ? 'h-5 w-5' : 'h-4 w-4'} transition-transform duration-300 group-hover:translate-x-2`} />
        </div>

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Animated border on hover */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-200/50 transition-all duration-300" />
    </Link>
  )
}
