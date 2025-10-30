import { ReactNode } from "react"

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export default function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div className={`
      grid gap-6
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      auto-rows-fr
      ${className}
    `}>
      {children}
    </div>
  )
}

interface BentoItemProps {
  children: ReactNode
  className?: string
  span?: "wide" | "tall" | "large" | "normal"
}

export function BentoItem({ children, className = "", span = "normal" }: BentoItemProps) {
  const spanClasses = {
    normal: "",
    wide: "md:col-span-2",
    tall: "md:row-span-2",
    large: "md:col-span-2 md:row-span-2"
  }

  return (
    <div className={`
      ${spanClasses[span]}
      ${className}
    `}>
      {children}
    </div>
  )
}
