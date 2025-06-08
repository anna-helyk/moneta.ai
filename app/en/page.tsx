"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export default function EnglishHomePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5] p-6">
      <div className="relative max-w-sm w-full">
        {/* Shadow layer */}
        <div
          className="absolute inset-0 rounded-2xl translate-x-[8px] translate-y-[8px]"
          style={{ backgroundColor: "#303030" }}
        ></div>

        {/* Content layer */}
        <div className="relative bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center min-h-[500px]">
          <div className="flex-1 flex flex-col items-start justify-center space-y-8 w-full">
            {/* Emoji */}
            <div className="text-8xl">💸</div>

            {/* Text content */}
            <div className="text-left">
              <h1 className="text-2xl font-bold text-[#303030] mb-4">Your guide to financial literacy.</h1>
              <p className="text-[#303030] text-base">
                This app helps you learn about money, manage it better, and build smart financial habits.
              </p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => router.push("/questionnaire/1")}
            className="w-full bg-[#D1F26E] hover:bg-[#D1F26E]/90 text-[#303030] font-medium py-3 rounded-lg flex items-center justify-center"
          >
            <span>Get started</span>
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
} 