"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, CheckCircle, XCircle, Info, Loader2 } from "lucide-react"
import { sendQuizResultEmail, isEmailJSConfigured } from "@/lib/email-service"
import { motion } from "framer-motion"

export default function PersonalDataCompletePage() {
  const router = useRouter()
  const [userCountry, setUserCountry] = useState<string>("us")
  const [emailStatus, setEmailStatus] = useState<"sending" | "success" | "error" | "not-configured" | null>(null)
  const [emailDetails, setEmailDetails] = useState<{
    email: string | null
    name: string | null
  }>({ email: null, name: null })

  useEffect(() => {
    // Check selected language
    const selectedLanguage = localStorage.getItem("selectedLanguage")
    if (selectedLanguage === "ua") {
      setUserCountry("ua")
    }

    // Get user details for display
    const email = localStorage.getItem("userEmail")
    const name = localStorage.getItem("userName")
    setEmailDetails({ email, name })

    // Check if EmailJS is configured
    if (!isEmailJSConfigured()) {
      console.log("EmailJS not configured, skipping email send")
      setEmailStatus("not-configured")
      return
    }

    // Send email with improved error handling
    const sendEmail = async () => {
      setEmailStatus("sending")

      try {
        const email = localStorage.getItem("userEmail")
        const name = localStorage.getItem("userName")
        const age = localStorage.getItem("userAge")
        const quizResult = localStorage.getItem("quizResult")

        if (email && quizResult) {
          const result = JSON.parse(quizResult)

          const emailData = {
            userEmail: email,
            userName: name || "User",
            userAge: age || "Not specified",
            quizScore: result.score,
            resultType: result.type,
            resultTitle: userCountry === "ua" ? result.titleUA : result.title,
            resultDescription: userCountry === "ua" ? result.descriptionUA : result.description,
            language: userCountry,
          }

          // Use retry logic (up to 2 retries)
          const success = await sendQuizResultEmail(emailData, 2)
          setEmailStatus(success ? "success" : "error")
        } else {
          console.error("Missing user data for email")
          setEmailStatus("error")
        }
      } catch (error) {
        console.error("Error in email sending process:", error)
        setEmailStatus("error")
      }
    }

    sendEmail()
  }, [userCountry])

  const handleContinue = () => {
    const selectedLanguage = localStorage.getItem("selectedLanguage")
    if (selectedLanguage === "ua") {
      router.push("/ua/lessons/1")
    } else {
      router.push("/lessons/1")
    }
  }

  const getStatusMessage = () => {
    if (userCountry === "ua") {
      switch (emailStatus) {
        case "sending":
          return "Надсилаємо результати на вашу пошту..."
        case "success":
          return `Результати успішно надіслано на ${emailDetails.email}!`
        case "error":
          return "Не вдалося надіслати результати. Ви можете продовжити навчання."
        case "not-configured":
          return "Функція надсилання електронної пошти ще не налаштована."
        default:
          return "Готуємо ваші результати..."
      }
    } else {
      switch (emailStatus) {
        case "sending":
          return "Sending results to your email..."
        case "success":
          return `Results successfully sent to ${emailDetails.email}!`
        case "error":
          return "Failed to send results. You can continue with your learning."
        case "not-configured":
          return "Email functionality is not yet configured."
        default:
          return "Preparing your results..."
      }
    }
  }

  const getStatusIcon = () => {
    switch (emailStatus) {
      case "sending":
        return <Loader2 className="text-blue-500 animate-spin" size={20} />
      case "success":
        return <CheckCircle className="text-green-500" size={20} />
      case "error":
        return <XCircle className="text-red-500" size={20} />
      case "not-configured":
        return <Info className="text-blue-500" size={20} />
      default:
        return null
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
          <div className="flex-1 flex flex-col items-start justify-center space-y-8 py-16">
            {/* Emoji with animation */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-8xl mb-4"
            >
              {emailStatus === "success" ? "🎉" : "🙌"}
            </motion.div>

            {/* Text content */}
            <div className="text-left">
              <h1 className="text-2xl font-bold text-[#303030] mb-4">
                {userCountry === "ua" ? "Це все, дякую!" : "All done, thank you!"}
              </h1>
              <p className="text-[#303030] text-base mb-4">
                {userCountry === "ua"
                  ? `Привіт, ${emailDetails.name || "користувач"}! Тим часом, давайте подивимося на ваш профіль.`
                  : `Hello, ${emailDetails.name || "user"}! Meanwhile, let's take a look at your profile.`}
              </p>

              {/* Email status with animation */}
              {emailStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-2 text-sm p-2 rounded-md bg-gray-50"
                >
                  {getStatusIcon()}
                  <span className="text-[#303030]">{getStatusMessage()}</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Button with animation */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="w-full bg-[#D1F26E] hover:bg-[#D1F26E]/90 text-[#303030] font-medium py-3 rounded-lg flex items-center justify-center"
          >
            <span>{userCountry === "ua" ? "Поїхали!" : "Let's go!"}</span>
            <ArrowRight size={18} className="ml-2" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
