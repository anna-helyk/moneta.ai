import type React from "react"
import { cn } from "@/lib/utils"

interface LiftedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  backgroundColor?: "white" | "cream" | "gray"
  shadowOffset?: "right" | "left"
  shadowColor?: string
}

export function LiftedCard({
  children,
  className,
  backgroundColor = "white",
  shadowOffset = "right",
  shadowColor = "#303030",
  ...props
}: LiftedCardProps) {
  const bgColorClass = {
    white: "bg-white",
    cream: "bg-card-cream",
    gray: "bg-gray-200",
  }

  const offsetClass = {
    right: "translate-x-[8px] translate-y-[8px]",
    left: "translate-x-[-8px] translate-y-[8px]",
  }

  return (
    <div className="relative" {...props}>
      {/* Shadow layer */}
      <div
        className={cn("absolute inset-0 rounded-2xl", offsetClass[shadowOffset])}
        style={{ backgroundColor: shadowColor }}
      ></div>

      {/* Content layer */}
      <div
        className={cn(
          "relative rounded-2xl py-6 px-6 border border-gray-100 min-h-[150px]",
          bgColorClass[backgroundColor],
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
