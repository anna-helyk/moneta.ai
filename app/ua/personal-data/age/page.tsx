"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

export default function AgeInputPageUA() {
  const router = useRouter()
  const [age, setAge] = useState<string>("")

  const handleSubmit = () => {
    if (age.trim()) {
      // Save age
      localStorage.setItem("userAge", age)

      // Simulate email sending and redirect to final screen
      router.push("/ua/personal-data/complete")
    }
  }

  const handleBack = () => {
    router.push("/ua/personal-data/name")
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
            <h1 className="text-xl font-bold text-[#303030] text-left">Скільки вам років?</h1>

            <div className="space-y-6">
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && age.trim()) {
                    handleSubmit()
                  }
                }}
                className="w-full border border-gray-300 rounded-lg p-3 h-12 text-left"
                placeholder="Вік"
              />
              <button
                onClick={handleSubmit}
                disabled={!age.trim()}
                className={`w-full py-3 rounded-lg flex items-center justify-center ${
                  age.trim() ? "bg-[#D1F26E] hover:bg-[#D1F26E]/90 text-[#303030]" : "bg-gray-300 text-gray-500"
                } font-medium`}
              >
                Отримати результат
              </button>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex justify-center space-x-2">
              <div className="h-1 w-6 rounded-full bg-[#303030]"></div>
              <div className="h-1 w-6 rounded-full bg-[#303030]"></div>
              <div className="h-1 w-6 rounded-full bg-[#303030]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
