"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      const selectedLanguage = localStorage.getItem("selectedLanguage")
      if (selectedLanguage === "ua") {
        router.push("/ua")
      } else {
        router.push("/")
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#D1F26E] p-6">
      <div className="flex flex-col items-center space-y-3">
        {/* Logo Card */}
        <div className="relative">
          {/* Shadow layer */}
          <div
            className="absolute inset-0 rounded-2xl translate-x-[3px] translate-y-[3px]"
            style={{ backgroundColor: "#303030" }}
          ></div>

          {/* Content layer */}
          <div className="relative bg-white rounded-2xl p-8 border border-gray-100 w-24 h-24 flex items-center justify-center">
            <div className="text-4xl">💸</div>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-[#303030] font-medium text-lg">moneta.ai</h1>
      </div>
    </div>
  )
}
