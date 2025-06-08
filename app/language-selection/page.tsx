"use client"

import { useRouter } from "next/navigation"

export default function LanguageSelectionPage() {
  const router = useRouter()

  const handleLanguageSelect = (language: string) => {
    // Store language preference
    localStorage.setItem("selectedLanguage", language)

    // Store a flag to indicate language has been selected
    localStorage.setItem("languageSelected", "true")

    // Navigate to appropriate welcome screen
    if (language === "ua") {
      router.push("/ua")
    } else {
      router.push("/en")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5] p-6">
      <div className="relative max-w-sm w-full">
        {/* Shadow layer */}
        <div
          className="absolute inset-0 rounded-3xl translate-x-[8px] translate-y-[8px]"
          style={{ backgroundColor: "#303030" }}
        ></div>

        {/* Content layer */}
        <div className="relative bg-white rounded-3xl p-6 border border-gray-100 min-h-[500px] flex flex-col items-center">
          {/* App Branding Block */}
          <div className="flex flex-col items-center mb-8 mt-8">
            {/* Logo */}
            <div className="relative mb-3">
              <div
                className="absolute inset-0 rounded-xl translate-x-[2px] translate-y-[2px]"
                style={{ backgroundColor: "#303030" }}
              ></div>
              <div className="relative bg-[#D1F26E] rounded-xl p-4 border border-gray-100 w-16 h-16 flex items-center justify-center">
                <div className="text-2xl">💸</div>
              </div>
            </div>

            {/* App Name */}
            <h2 className="text-[#303030] font-medium text-base">moneta.ai</h2>
          </div>

          {/* Language Heading */}
          <h1 className="text-xl font-bold text-[#303030] mb-8 text-center">Select your language</h1>

          {/* Language Buttons */}
          <div className="w-full space-y-4">
            <button
              onClick={() => handleLanguageSelect("ua")}
              className="w-full bg-white border border-gray-300 rounded-lg py-3 px-6 flex items-center justify-center font-medium text-[#303030] hover:bg-gray-50 transition-colors shadow-sm"
            >
              🇺🇦 Українська
            </button>

            <button
              onClick={() => handleLanguageSelect("en")}
              className="w-full bg-white border border-gray-300 rounded-lg py-3 px-6 flex items-center justify-center font-medium text-[#303030] hover:bg-gray-50 transition-colors shadow-sm"
            >
              🇬🇧 English
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
