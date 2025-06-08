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

// Load EmailJS script dynamically with improved error handling
const loadEmailJSScript = async (): Promise<boolean> => {
  if (!isBrowser) return false
  
  try {
    // If EmailJS is already loaded and initialized, return true
    if (window.emailjs?.init) {
      return true
    }

    return new Promise((resolve) => {
      // Check if the script is already in the process of loading
      const existingScript = document.querySelector('script[src*="emailjs"]')
      if (existingScript) {
        // If script exists but not loaded, wait for it
        existingScript.addEventListener('load', () => {
          initializeEmailJS(resolve)
        })
        existingScript.addEventListener('error', () => {
          console.error("Failed to load existing EmailJS script")
          resolve(false)
        })
        return
      }

      // Create and load the script
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
      script.async = true
      script.defer = true

      script.onload = () => initializeEmailJS(resolve)
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

// Initialize EmailJS with the public key
const initializeEmailJS = (resolve: (value: boolean) => void) => {
  try {
    if (window.emailjs && process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      window.emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
      resolve(true)
    } else {
      resolve(false)
    }
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error)
    resolve(false)
  }
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

// Send quiz result email with improved retry logic
export const sendQuizResultEmail = async (emailData: EmailData, maxRetries = 2): Promise<boolean> => {
  if (!isBrowser) return false
  
  let retries = 0
  const retryDelay = 1000 // Base delay in milliseconds

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
        throw new Error("Failed to load or initialize EmailJS")
      }

      // Get the appropriate template ID based on quiz score
      const templateId = getTemplateIdByScore(emailData.quizScore)

      // Prepare template parameters
      const templateParams = {
        to_email: emailData.userEmail,
        user_name: emailData.userName || "User",
        user_age: emailData.userAge || "Not specified",
        quiz_score: `${emailData.quizScore}/12`,
        result_title: emailData.resultTitle,
        result_description: emailData.resultDescription,
        language: emailData.language,
      }

      // Log email attempt details
      console.log("Sending email with params:", {
        to: emailData.userEmail,
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId,
        score: emailData.quizScore
      })

      // Send the email
      const response = await window.emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // Include public key for additional security
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

  // Retry logic with exponential backoff
  while (!success && retries < maxRetries) {
    retries++
    // Wait with exponential backoff (1s, 2s, 4s, etc.)
    await new Promise((resolve) => setTimeout(resolve, retryDelay * Math.pow(2, retries - 1)))
    success = await attemptSend()
  }

  return success
}

// Test email configuration
export const testEmailConfiguration = async (): Promise<{
  isConfigured: boolean
  publicKeyPresent: boolean
  serviceIdPresent: boolean
  scriptLoaded: boolean
  initialized: boolean
  details: string[]
}> => {
  const details: string[] = []
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID

  const publicKeyPresent = !!publicKey
  const serviceIdPresent = !!serviceId
  details.push(`Public Key: ${publicKeyPresent ? "Present" : "Missing"}`)
  details.push(`Service ID: ${serviceIdPresent ? "Present" : "Missing"}`)

  let scriptLoaded = false
  let initialized = false

  if (isBrowser) {
    try {
      scriptLoaded = await loadEmailJSScript()
      details.push(`Script Loading: ${scriptLoaded ? "Success" : "Failed"}`)
      
      if (scriptLoaded) {
        initialized = !!window.emailjs?.init
        details.push(`Initialization: ${initialized ? "Success" : "Failed"}`)
      }
    } catch (error) {
      details.push(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  } else {
    details.push("Not in browser environment")
  }

  const isConfigured = publicKeyPresent && serviceIdPresent && scriptLoaded && initialized

  return {
    isConfigured,
    publicKeyPresent,
    serviceIdPresent,
    scriptLoaded,
    initialized,
    details
  }
}
