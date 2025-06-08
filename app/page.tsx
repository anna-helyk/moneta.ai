"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()
  const [showSplash, setShowSplash] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash")
    const selectedLanguage = localStorage.getItem("selectedLanguage")

    if (!hasSeenSplash) {
      // Show splash screen only on first run
      setShowSplash(true)
      const timer = setTimeout(() => {
        setShowSplash(false)
        localStorage.setItem("hasSeenSplash", "true")
        router.push("/language-selection")
      }, 2000)

      return () => clearTimeout(timer)
    } else {
      // For returning users, check language and redirect
      if (selectedLanguage === "ua") {
        router.push("/ua")
      } else if (selectedLanguage === "en") {
        router.push("/en")
      } else {
        router.push("/language-selection")
      }
    }
  }, [router])

  // Show splash screen
  if (showSplash) {
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

  // Show loading state while checking language
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5]">
        <div className="text-[#303030]">Loading...</div>
      </div>
    )
  }

  // Redirect to language selection if somehow we get here
  router.push("/language-selection")
  return null
}
