"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

export default function EditProfilePageUA() {
  const router = useRouter()
  const [name, setName] = useState<string>("")
  const [age, setAge] = useState<string>("")

  useEffect(() => {
    // Load existing data from localStorage
    const userName = localStorage.getItem("userName") || ""
    const userAge = localStorage.getItem("userAge") || ""

    setName(userName)
    setAge(userAge)
  }, [])

  const handleSave = () => {
    // Save updated data to localStorage
    localStorage.setItem("userName", name)
    localStorage.setItem("userAge", age)

    // Navigate back to profile
    router.push("/ua/lessons/1")
  }

  const handleBack = () => {
    router.push("/ua/lessons/1")
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
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-[#303030]"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-6 mb-6">
            <h1 className="text-xl font-bold text-[#303030] text-left">Редагувати профіль</h1>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Ім'я</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 h-12 text-left"
                  placeholder="Ім'я"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Вік</label>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 h-12 text-left"
                  placeholder="Вік"
                />
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
                Зберегти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
