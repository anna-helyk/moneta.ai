"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { ArrowLeft, AlertCircle } from "lucide-react"

export default function EmailInputPageUA() {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)

    if (newEmail.trim() === "") {
      setEmailError("")
      setIsValidEmail(false)
    } else if (!validateEmail(newEmail)) {
      setEmailError("Будь ласка, введіть дійсну електронну адресу")
      setIsValidEmail(false)
    } else {
      setEmailError("")
      setIsValidEmail(true)
    }
  }

  const handleNext = () => {
    if (isValidEmail && email.trim()) {
      // Save email
      localStorage.setItem("userEmail", email)
      router.push("/ua/personal-data/name")
    }
  }

  const handleBack = () => {
    router.push("/ua/quiz-result")
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
            <h1 className="text-xl font-bold text-[#303030] text-left">Яка ваша електронна пошта?</h1>

            <div className="space-y-6">
              <div className="space-y-2">
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && isValidEmail) {
                      handleNext()
                    }
                  }}
                  className={`w-full rounded-lg p-3 h-12 text-left ${
                    emailError 
                      ? "border-2 border-red-500" 
                      : isValidEmail && email.trim()
                        ? "border-2 border-[#D1F26E]"
                        : "border border-gray-200"
                  }`}
                  placeholder="example@gmail.com"
                />
                {emailError && (
                  <div className="flex items-center space-x-2 text-red-500 text-sm">
                    <AlertCircle size={16} />
                    <span>{emailError}</span>
                  </div>
                )}
              </div>
              <button
                onClick={handleNext}
                disabled={!isValidEmail}
                className={`w-full py-3 rounded-lg flex items-center justify-center ${
                  isValidEmail
                    ? "bg-[#D1F26E] hover:bg-[#D1F26E]/90 text-[#303030]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } font-medium transition-colors`}
              >
                Далі
              </button>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex justify-center space-x-2">
              <div className="h-1 w-6 rounded-full bg-[#303030]"></div>
              <div className="h-1 w-6 rounded-full bg-gray-300"></div>
              <div className="h-1 w-6 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
