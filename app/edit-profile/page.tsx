"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

export default function EditProfilePage() {
  const router = useRouter()
  const [name, setName] = useState<string>("")
  const [age, setAge] = useState<string>("")
  const [level, setLevel] = useState<string>("")

  const levelOptions = [
    { value: "rookie", label: "Money Rookie" },
    { value: "ninja", label: "Money Ninja in Training" },
    { value: "rockstar", label: "Financial Rock Star" },
  ]

  useEffect(() => {
    // Load existing data from localStorage
    const userName = localStorage.getItem("userName") || ""
    const userAge = localStorage.getItem("userAge") || ""

    // Get level from quiz result
    const quizResult = localStorage.getItem("quizResult")
    let userLevel = "rookie"
    if (quizResult) {
      const result = JSON.parse(quizResult)
      userLevel = result.type || "rookie"
    }

    setName(userName)
    setAge(userAge)
    setLevel(userLevel)
  }, [])

  const handleSave = () => {
    // Save updated data to localStorage
    localStorage.setItem("userName", name)
    localStorage.setItem("userAge", age)

    // Update quiz result with new level
    const quizResult = localStorage.getItem("quizResult")
    if (quizResult) {
      const result = JSON.parse(quizResult)
      result.type = level

      // Update titles based on level
      const levelTitles = {
        rookie: { title: "Money Rookie", titleUA: "Грошовий новачок" },
        ninja: { title: "Money Ninja in Training", titleUA: "Грошовий ніндзя-стажер" },
        rockstar: { title: "Financial Rock Star", titleUA: "Фінансовий рок-зірка" },
      }

      const selectedLevel = levelTitles[level as keyof typeof levelTitles]
      if (selectedLevel) {
        result.title = selectedLevel.title
        result.titleUA = selectedLevel.titleUA
      }

      localStorage.setItem("quizResult", JSON.stringify(result))
    }

    // Navigate back to lessons
    router.push("/lessons/1")
  }

  const handleBack = () => {
    router.push("/lessons/1")
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
          <div className="mb-6">
            <button
              onClick={handleBack}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#303030] text-white"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-6 mb-6">
            <h1 className="text-xl font-bold text-[#303030] text-left">Edit Profile</h1>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 h-12 text-left"
                  placeholder="Name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Age</label>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 h-12 text-left"
                  placeholder="Age"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 h-12 text-left bg-white"
                >
                  {levelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSave}
                disabled={!name.trim() || !age.trim()}
                className={`w-full py-3 rounded-lg flex items-center justify-center ${
                  name.trim() && age.trim()
                    ? "bg-[#D1F26E] hover:bg-[#D1F26E]/90 text-[#303030]"
                    : "bg-gray-300 text-gray-500"
                } font-medium`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
