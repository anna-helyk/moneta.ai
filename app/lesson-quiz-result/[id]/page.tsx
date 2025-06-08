"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"

// Function to determine investor type based on score
const getInvestorType = (score: number) => {
  if (score < 25) return { type: "very conservative", emoji: "🧘‍♂️", highlight: false }
  if (score < 49) return { type: "conservative", emoji: "🚶‍♂️", highlight: false }
  if (score < 73) return { type: "moderate", emoji: "🏄‍♂️", highlight: false }
  return { type: "risk-taking", emoji: "🏄‍♂️", highlight: true }
}

// Function to determine Ukrainian investor type based on score
const getInvestorTypeUA = (score: number) => {
  if (score < 25) return { type: "дуже консервативний", emoji: "🧘‍♂️", highlight: false }
  if (score < 49) return { type: "консервативний", emoji: "🚶‍♂️", highlight: false }
  if (score < 73) return { type: "помірний", emoji: "🏄‍♂️", highlight: false }
  return { type: "ризиковий", emoji: "🏄‍♂️", highlight: true }
}

export default function LessonQuizResultPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const lessonId = params.id
  const score = Number.parseInt(searchParams.get("score") || "0")
  const [userCountry, setUserCountry] = useState<string>("us")
  const [investorType, setInvestorType] = useState(getInvestorType(score))

  useEffect(() => {
    // Check user's country preference from localStorage
    const savedAnswers = localStorage.getItem("userAnswers")
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers)
      if (parsedAnswers[1] === "ua") {
        setUserCountry("ua")
        setInvestorType(getInvestorTypeUA(score))
      }
    }

    // Mark lesson 1 as completed and unlock lesson 2
    const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]")
    if (!completedLessons.includes(Number(lessonId))) {
      completedLessons.push(Number(lessonId))
      localStorage.setItem("completedLessons", JSON.stringify(completedLessons))
    }
  }, [score, lessonId])

  const handleBack = () => {
    router.push(`/lesson/${lessonId}`)
  }

  const handleComplete = () => {
    if (userCountry === "ua") {
      router.push("/ua/lessons/1")
    } else {
      router.push("/lessons/1")
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
          <div className="flex justify-between items-start mb-6">
            <button
              onClick={handleBack}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-[#303030]"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm font-medium border border-gray-200 shadow-sm text-[#303030]">
              Class #1
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            <div className="text-6xl">{investorType.emoji}</div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#303030]">
                {userCountry === "ua" ? "Ви" : "You are"}
                {investorType.highlight ? (
                  <span className="inline-block bg-[#D1F26E] px-2 mx-1">{investorType.type}</span>
                ) : (
                  <span className="mx-1">{investorType.type}</span>
                )}
                {userCountry === "ua" ? "інвестор" : "investor"}
                {userCountry === "ua" && investorType.type === "дуже консервативний" ? "" : "."}
              </p>
            </div>
          </div>

          <button
            onClick={handleComplete}
            className="w-full bg-[#D1F26E] hover:bg-[#D1F26E]/90 text-[#303030] font-medium py-3 rounded-lg flex items-center justify-center"
          >
            {userCountry === "ua" ? "Завершити" : "Complete"}
          </button>
        </div>
      </div>
    </div>
  )
}
