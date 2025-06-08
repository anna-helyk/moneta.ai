"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import InstagramIcon from "@mui/icons-material/Instagram"

interface PlaceholderScreenProps {
  backRoute?: string
}

export default function PlaceholderScreen({ backRoute }: PlaceholderScreenProps) {
  const router = useRouter()
  const [userCountry, setUserCountry] = useState<string>("us")

  useEffect(() => {
    // Check selected language
    const selectedLanguage = localStorage.getItem("selectedLanguage")
    if (selectedLanguage === "ua") {
      setUserCountry("ua")
    } else {
      setUserCountry("en")
    }
  }, [])

  const handleGoToProfile = () => {
    router.push(userCountry === "ua" ? "/ua/lessons/1" : "/lessons/1")
  }

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/annie_helyk/#", "_blank")
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
          <div className="flex-1 flex flex-col items-start justify-center space-y-6">
            {/* Emoji - now left-aligned */}
            <div className="text-8xl">💅</div>

            {/* Text content - already left-aligned */}
            <div className="text-left">
              <h1 className="text-2xl font-bold text-[#303030] mb-4">
                {userCountry === "ua" ? "Зараз трошки чілим і наводимо красу." : "BRB, doing a glow-up."}
              </h1>
              <p className="text-[#303030] text-base">
                {userCountry === "ua"
                  ? "Повернемося зовсім скоро, ще стильніші та швидші."
                  : "It'll be back stronger, faster, and hotter than ever."}
              </p>
            </div>
          </div>

          {/* Button - left-aligned */}
          <Button
            onClick={handleGoToProfile}
            className="w-full bg-[#D1F26E] hover:bg-[#D1F26E]/90 text-[#303030] font-medium py-3 rounded-lg flex items-center justify-center mb-4"
          >
            {userCountry === "ua" ? "Профіль" : "Profile"}
          </Button>

          {/* Instagram icon - centered */}
          <div className="flex justify-center">
            <button
              onClick={handleInstagramClick}
              className="w-8 h-8 flex items-center justify-center text-[#303030] hover:text-gray-600 transition-colors"
            >
              <InstagramIcon fontSize="small" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
