"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit } from "lucide-react"
import { AccountCircleOutlined } from "@mui/icons-material"

type UserProfile = {
  name: string
  age: string
  level: string
}

// Function to get level display name based on quiz result
const getLevelDisplayName = () => {
  const quizResult = localStorage.getItem("quizResult")
  if (quizResult) {
    const result = JSON.parse(quizResult)
    return result.titleUA || "Початківець"
  }
  return "Початківець"
}

// Mock lesson data
const lessonPlans = {
  "1": {
    title: "Підвищіть рівень своїх інвестицій",
    lessons: [
      {
        id: 1,
        title: "Фінансовий план",
        status: "current",
        description: "Зрозумійте силу того, як змусити ваші гроші працювати на вас та ваші цілі.",
      },
      {
        id: 2,
        title: "Інвестиційний план",
        status: "upcoming",
        description: "Створіть стратегію для керування вашими інвестиційними рішеннями та досягнення цілей.",
      },
      {
        id: 3,
        title: "Інвестиційні техніки",
        status: "locked",
        description: "Ознайомтеся з поширеними стратегіями для створення та розвитку вашого інвестиційного портфеля.",
      },
    ],
  },
}

export default function LessonsPageUA({ params }: { params: { planId: string } }) {
  const router = useRouter()
  const planId = params.planId
  const plan = lessonPlans[planId as keyof typeof lessonPlans]
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    level: "Початківець",
  })
  const [updatedLessons, setUpdatedLessons] = useState(plan?.lessons || [])

  useEffect(() => {
    // Load user data from localStorage
    const userName = localStorage.getItem("userName") || "Користувач"
    const userAge = localStorage.getItem("userAge") || "Не вказано"
    const levelDisplay = getLevelDisplayName()

    setProfile({
      name: userName,
      age: userAge,
      level: levelDisplay,
    })

    // Check for completed lessons and update lesson status
    const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]")

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
  }, [plan])

  if (!plan) {
    return <div>План не знайдено</div>
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
                onClick={() => router.push("/ua/edit-profile")}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
              >
                <Edit size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex">
                <div className="w-1/3 text-gray-500">Ім'я</div>
                <div className="w-2/3 font-medium text-[#303030]">{profile.name}</div>
              </div>
              <div className="flex">
                <div className="w-1/3 text-gray-500">Вік</div>
                <div className="w-2/3 font-medium text-[#303030]">{profile.age}</div>
              </div>
              <div className="flex">
                <div className="w-1/3 text-gray-500">Рівень</div>
                <div className="w-2/3 font-medium text-[#303030]">{profile.level}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Class Cards */}
        <div className="grid grid-cols-1 gap-6 place-items-center">
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
                  <div className="text-sm font-medium text-[#303030]">Урок #{lesson.id}</div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lesson.status === "completed"
                        ? "bg-gray-200 text-gray-600"
                        : lesson.status === "current"
                          ? "bg-[#D1F26E] text-[#303030]"
                          : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {lesson.status === "completed"
                      ? "Пройдено"
                      : lesson.status === "current"
                        ? "Поточний"
                        : "Заблокований"}
                  </div>
                </div>

                <h2 className="text-lg font-bold text-[#303030] mb-2">{lesson.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{lesson.description}</p>

                <button
                  onClick={() =>
                    (lesson.status === "current" || lesson.status === "completed") &&
                    router.push(`/ua/lesson/${lesson.id}`)
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
                  {lesson.status === "completed" ? "Повторити" : "Почати"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
