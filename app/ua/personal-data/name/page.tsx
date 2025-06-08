"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

export default function NameInputPageUA() {
  const router = useRouter()
  const [name, setName] = useState<string>("")

  const handleNext = () => {
    if (name.trim()) {
      // Save name
      localStorage.setItem("userName", name)
      router.push("/ua/personal-data/age")
    }
  }

  const handleBack = () => {
    router.push("/ua/personal-data/email")
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
            <h1 className="text-xl font-bold text-[#303030] text-left">Як вас звати?</h1>

            <div className="space-y-6">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && name.trim()) {
                    handleNext()
                  }
                }}
                className="w-full border border-gray-300 rounded-lg p-3 h-12 text-left"
                placeholder="Ім'я"
              />
              <button
                onClick={handleNext}
                disabled={!name.trim()}
                className={`w-full py-3 rounded-lg flex items-center justify-center ${
                  name.trim() ? "bg-[#D1F26E] hover:bg-[#D1F26E]/90 text-[#303030]" : "bg-gray-300 text-gray-500"
                } font-medium`}
              >
                Далі
              </button>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex justify-center space-x-2">
              <div className="h-1 w-6 rounded-full bg-[#303030]"></div>
              <div className="h-1 w-6 rounded-full bg-[#303030]"></div>
              <div className="h-1 w-6 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
