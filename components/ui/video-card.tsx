"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Play } from "lucide-react"

interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  emoji?: string
  classNumber?: number
  onPlay?: () => void
}

export function VideoCard({ title, subtitle, emoji = "💰", classNumber, onPlay, className, ...props }: VideoCardProps) {
  return (
    <div className="w-full" {...props}>
      <div className="bg-orange-500 p-6 pb-12 rounded-t-[20px]">
        <div className="text-white mb-4">
          {classNumber && <div className="text-sm opacity-80">Class #{classNumber}</div>}
          <h1 className="text-xl font-bold uppercase">{title}</h1>
        </div>

        <div className="flex justify-center">
          <div className="text-5xl">{emoji}</div>
        </div>
      </div>

      <div className="relative -mt-6">
        <div className="absolute inset-0 rounded-[20px] translate-x-[3px] translate-y-[3px] bg-gray-800"></div>
        <div className={cn("relative bg-card-cream rounded-[20px] p-5 border border-gray-100", className)}>
          {subtitle && <h2 className="text-lg font-bold mb-4">{subtitle}</h2>}

          <button
            onClick={onPlay}
            className="w-full flex items-center justify-center bg-white rounded-xl p-4 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Play size={24} className="text-gray-800 ml-1" />
            </div>
            <span className="ml-3 font-medium">Play video</span>
          </button>
        </div>
      </div>
    </div>
  )
}
