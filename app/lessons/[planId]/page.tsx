"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit } from "lucide-react"
import { AccountCircleOutlined } from "@mui/icons-material"
import { useLocalStorage } from "@/hooks/useLocalStorage"

type UserProfile = {
  name: string
  age: string
  level: string
}

// Function to get level display name based on quiz result
const getLevelDisplayName = (language: string) => {
  const quizResult = localStorage.getItem("quizResult")
  if (quizResult) {
    const result = JSON.parse(quizResult)
    if (language === "ua") {
      return result.titleUA || "Emerging learner"
    } else {
      return result.title || "Emerging learner"
    }
  }
  return "Emerging learner"
}

// Mock lesson data
const lessonPlans = {
  "1": {
    title: "Level up your investments",
    lessons: [
      {
        id: 1,
        title: "Financial Plan",
        status: "current",
        description: "Understand the power of making your money work for you and for your goals.",
      },
      {
        id: 2,
        title: "Investment plan",
        status: "upcoming",
        description: "Craft a strategy to guide your investment decisions and achieve your targets.",
      },
      {
        id: 3,
        title: "Investment techniques",
        status: "locked",
        description: "Get to know common strategies to build and grow your investment portfolio.",
      },
    ],
  },
}

export default function LessonsPage({ params }: { params: { planId: string } }) {
  const router = useRouter()
  const planId = params.planId
  const plan = lessonPlans[planId as keyof typeof lessonPlans]
  const [selectedLanguage] = useLocalStorage("selectedLanguage", "en")
  const [userName] = useLocalStorage("userName", selectedLanguage === "ua" ? "Користувач" : "User")
  const [userAge] = useLocalStorage("userAge", selectedLanguage === "ua" ? "Не вказано" : "Not specified")
  const [completedLessons] = useLocalStorage<number[]>("completedLessons", [])
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    level: "Emerging learner",
  })
  const [updatedLessons, setUpdatedLessons] = useState(plan?.lessons || [])

  useEffect(() => {
    const isUkrainian = selectedLanguage === "ua"
    const levelDisplay = getLevelDisplayName(isUkrainian ? "ua" : "en")

    setProfile({
      name: userName,
      age: userAge,
      level: levelDisplay,
    })

    // Check for completed lessons and update lesson status
    if (plan && completedLessons.length > 0) {
      const updatedLessonsList = [...plan.lessons]

      // If lesson 1 is completed, update lesson 1 status to "completed" and lesson 2 status to "current"
      if (completedLessons.includes(1)) {
        if (updatedLessonsList[0]) {
          updatedLessonsList[0].status = "completed"
        }
        if (updatedLessonsList[1]) {
          updatedLessonsList[1].status = "current"
        }
      }

      setUpdatedLessons(updatedLessonsList)
    }
  }, [plan, userName, userAge, selectedLanguage, completedLessons])

  if (!plan) {
    return <div>Plan not found</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5] p-6">
      <div className="space-y-6">
        {/* User Profile Card */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-2xl translate-x-[8px] translate-y-[8px]"
            style={{ backgroundColor: "#303030" }}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#303030] text-white text-xl">
                <AccountCircleOutlined style={{ color: "#FFFFFF", fontSize: "24px" }} />
              </div>
              <button
                onClick={() => router.push("/edit-profile")}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
              >
                <Edit size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex">
                <div className="w-1/3 text-gray-500">Name</div>
                <div className="w-2/3 font-medium text-[#303030]">{profile.name}</div>
              </div>
              <div className="flex">
                <div className="w-1/3 text-gray-500">Age</div>
                <div className="w-2/3 font-medium text-[#303030]">{profile.age}</div>
              </div>
              <div className="flex">
                <div className="w-1/3 text-gray-500">Level</div>
                <div className="w-2/3 font-medium text-[#303030]">{profile.level}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Class Cards */}
        {updatedLessons.map((lesson) => (
          <div key={lesson.id} className="relative">
            <div
              className="absolute inset-0 rounded-2xl translate-x-[8px] translate-y-[8px]"
              style={{ backgroundColor: "#303030" }}
            ></div>
            <div
              className={`relative rounded-2xl p-6 border border-gray-100 ${
                lesson.status === "completed"
                  ? "bg-white"
                  : lesson.status === "current"
                    ? "bg-[#FFFFF0]"
                    : "bg-[#E6E6E6]"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="text-sm font-medium text-[#303030]">Class #{lesson.id}</div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    lesson.status === "completed"
                      ? "bg-gray-200 text-gray-600"
                      : lesson.status === "current"
                        ? "bg-[#D1F26E] text-[#303030]"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {lesson.status === "completed" ? "Completed" : lesson.status === "current" ? "Current" : "Locked"}
                </div>
              </div>

              <h2 className="text-lg font-bold text-[#303030] mb-2">{lesson.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{lesson.description}</p>

              <button
                onClick={() =>
                  (lesson.status === "current" || lesson.status === "completed") && router.push(`/lesson/${lesson.id}`)
                }
                disabled={lesson.status === "locked"}
                className={`w-full py-3 rounded-lg flex items-center justify-center ${
                  lesson.status === "completed"
                    ? "bg-white border border-gray-300 hover:bg-gray-50 text-gray-800"
                    : lesson.status === "current"
                      ? "bg-[#D1F26E] hover:bg-[#D1F26E]/90 text-[#303030]"
                      : "bg-gray-300 text-gray-500"
                } font-medium`}
              >
                {lesson.status === "completed" ? "Repeat" : "Start"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
