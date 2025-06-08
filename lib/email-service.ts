declare global {
  interface Window {
    emailjs: any
  }
}

export interface EmailData {
  userEmail: string
  userName: string
  userAge: string
  quizScore: number
  resultType: string
  resultTitle: string
  resultDescription: string
  language: string
}

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Check if EmailJS is properly configured
export const isEmailJSConfigured = () => {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  
  if (!publicKey || !serviceId) {
    console.warn("EmailJS configuration is missing. Required environment variables:", {
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: publicKey ? "✓" : "✗",
      NEXT_PUBLIC_EMAILJS_SERVICE_ID: serviceId ? "✓" : "✗"
    })
    return false
  }
  
  return true
}

// Load EmailJS script dynamically
const loadEmailJSScript = async (): Promise<boolean> => {
  if (!isBrowser) return false
  
  try {
    if (window.emailjs) {
      return true
    }

    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
      script.async = true

      script.onload = () => {
        if (window.emailjs && process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
          try {
            window.emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
            resolve(true)
          } catch (error) {
            console.error("Failed to initialize EmailJS:", error)
            resolve(false)
          }
        } else {
          resolve(false)
        }
      }

      script.onerror = () => {
        console.error("Failed to load EmailJS script")
        resolve(false)
      }

      document.head.appendChild(script)
    })
  } catch (error) {
    console.error("Error in loadEmailJSScript:", error)
    return false
  }
}

// Send quiz result email with retry logic
export const sendQuizResultEmail = async (emailData: EmailData, maxRetries = 2): Promise<boolean> => {
  if (!isBrowser) return false
  
  let retries = 0

  const attemptSend = async (): Promise<boolean> => {
    try {
      console.log(`Email send attempt ${retries + 1}/${maxRetries + 1}...`)

      // Check if EmailJS is properly configured
      if (!isEmailJSConfigured()) {
        console.warn("EmailJS not configured. Skipping email send.")
        return false
      }

      // Load EmailJS if not already loaded
      const isLoaded = await loadEmailJSScript()
      if (!isLoaded) {
        console.error("Failed to load EmailJS")
        return false
      }

      // Get the appropriate template ID based on quiz score
      const templateId = getTemplateIdByScore(emailData.quizScore)

      const templateParams = {
        to_email: emailData.userEmail,
        user_name: emailData.userName || "User",
        user_age: emailData.userAge || "Not specified",
        quiz_score: `${emailData.quizScore}/12`,
        result_title: emailData.resultTitle,
        result_description: emailData.resultDescription,
        language: emailData.language,
      }

      console.log("Sending email with params:", {
        to: emailData.userEmail,
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId,
        score: emailData.quizScore
      })

      const response = await window.emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId,
        templateParams
      )

      console.log("EmailJS response:", response)
      return response.status === 200
    } catch (error) {
      console.error(`Email send error (attempt ${retries + 1}):`, error)
      return false
    }
  }

  // First attempt
  let success = await attemptSend()

  // Retry logic
  while (!success && retries < maxRetries) {
    retries++
    // Wait before retrying (exponential backoff)
    await new Promise((resolve) => setTimeout(resolve, 1000 * retries))
    success = await attemptSend()
  }

  return success
}

// Get template ID based on quiz score
const getTemplateIdByScore = (score: number): string => {
  // Return special template for 10-12 correct answers
  if (score >= 10 && score <= 12) {
    return "template_t362qfd"
  }
  // Default template for all other scores
  return "template_xh6ad1b"
}
