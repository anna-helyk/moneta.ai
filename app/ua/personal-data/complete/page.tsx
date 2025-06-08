"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, CheckCircle, XCircle, Info, Loader2 } from "lucide-react"
import { sendQuizResultEmail, isEmailJSConfigured } from "@/lib/email-service"
import { motion } from "framer-motion"

export default function PersonalDataCompletePageUA() {
  const router = useRouter()
  const [emailStatus, setEmailStatus] = useState<"sending" | "success" | "error" | "not-configured" | null>(null)
  const [emailDetails, setEmailDetails] = useState<{
    email: string | null
    name: string | null
  }>({ email: null, name: null })
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  useEffect(() => {
    // Get user details for display
    const email = localStorage.getItem("userEmail")
    const name = localStorage.getItem("userName")
    setEmailDetails({ email, name })

    const sendEmail = async () => {
      try {
        // Check if EmailJS is configured first
        if (!isEmailJSConfigured()) {
          console.log("EmailJS not configured, skipping email send")
          setEmailStatus("not-configured")
          setErrorDetails("Email service is not configured. Please check your environment variables.")
          return
        }

        setEmailStatus("sending")
        
        const email = localStorage.getItem("userEmail")
        const name = localStorage.getItem("userName")
        const age = localStorage.getItem("userAge")
        const quizResult = localStorage.getItem("quizResult")

        if (!email || !quizResult) {
          throw new Error("Missing required data: " + (!email ? "email" : "quiz result"))
        }

        const result = JSON.parse(quizResult)

        const emailData = {
          userEmail: email,
          userName: name || "Користувач",
          userAge: age || "Не вказано",
          quizScore: result.score,
          resultType: result.type,
          resultTitle: result.titleUA,
          resultDescription: result.descriptionUA,
          language: "ua",
        }

        // Use retry logic (up to 2 retries)
        const success = await sendQuizResultEmail(emailData, 2)
        
        if (success) {
          setEmailStatus("success")
          setErrorDetails(null)
        } else {
          throw new Error("Failed to send email after retries")
        }
      } catch (error) {
        console.error("Error in email sending process:", error)
        setEmailStatus("error")
        setErrorDetails(error instanceof Error ? error.message : "Unknown error occurred")
      }
    }

    // Start the email sending process
    sendEmail()
  }, [])

  const handleContinue = () => {
    router.push("/ua/lessons/1")
  }

  const getStatusMessage = () => {
    switch (emailStatus) {
      case "sending":
        return "Надсилаємо результати на вашу пошту..."
      case "success":
        return `Результати успішно надіслано на ${emailDetails.email}!`
      case "error":
        return `Не вдалося надіслати результати: ${errorDetails || "Невідома помилка"}. Ви можете продовжити навчання.`
      case "not-configured":
        return "Функція надсилання електронної пошти ще не налаштована."
      default:
        return "Готуємо ваші результати..."
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
              <h1 className="text-2xl font-bold text-[#303030] mb-4">Це все, дякую!</h1>
              <p className="text-[#303030] text-base mb-4">
                Привіт, {emailDetails.name || "користувач"}! Тим часом, давайте подивимося на ваш профіль.
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
            <span>Поїхали!</span>
            <ArrowRight size={18} className="ml-2" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
