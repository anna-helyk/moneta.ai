"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { useEffect } from "react"

export default function ThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    // Check selected language
    const selectedLanguage = localStorage.getItem("selectedLanguage")

    // Redirect to the appropriate quiz result page based on language
    if (selectedLanguage === "ua") {
      router.push("/ua/quiz-result")
    } else {
      router.push("/quiz-result")
    }
  }, [router])

  const handleContinue = () => {
    const selectedLanguage = localStorage.getItem("selectedLanguage")
    if (selectedLanguage === "ua") {
      router.push("/ua/quiz-result")
    } else {
      router.push("/quiz-result")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5] p-6">
      <div className="relative max-w-sm w-full">
        {/* Shadow layer */}
        <div
          className="absolute inset-0 rounded-2xl translate-x-[8px] translate-y-[8px]"
          style={{ backgroundColor: "#303030" }}
        ></div>

        {/* Content layer */}
        <div className="relative bg-white rounded-2xl p-6 border border-gray-100 min-h-[500px] flex flex-col">
          <div className="flex-1 flex flex-col items-start justify-center space-y-8 py-16">
            {/* Emoji */}
            <div className="text-8xl mb-4">🙌</div>

            {/* Text content */}
            <div className="text-left">
              <h1 className="text-2xl font-bold text-[#303030] mb-4">All done, thank you!</h1>
              <p className="text-[#303030] text-base">Ready to see your results?</p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleContinue}
            className="w-full bg-[#D1F26E] hover:bg-[#D1F26E]/90 text-[#303030] font-medium py-3 rounded-lg flex items-center justify-center"
          >
            <span>Let's go!</span>
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}
