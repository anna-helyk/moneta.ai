"use client"

import { useState, useEffect } from "react"
import { testEmailConfiguration, sendQuizResultEmail } from "@/lib/email-service"

export default function EmailTestPage() {
  const [configStatus, setConfigStatus] = useState<any>(null)
  const [testEmailStatus, setTestEmailStatus] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkConfiguration()
  }, [])

  const checkConfiguration = async () => {
    setIsLoading(true)
    const status = await testEmailConfiguration()
    setConfigStatus(status)
    setIsLoading(false)
  }

  const sendTestEmail = async () => {
    setTestEmailStatus("Sending test email...")
    
    try {
      const success = await sendQuizResultEmail({
        userEmail: "test@example.com", // Replace with your email
        userName: "Test User",
        userAge: "25",
        quizScore: 11, // This will trigger the high score template
        resultType: "test",
        resultTitle: "Test Result",
        resultDescription: "This is a test email to verify the email configuration.",
        language: "en"
      })

      setTestEmailStatus(success ? "Test email sent successfully!" : "Failed to send test email")
    } catch (error) {
      setTestEmailStatus(`Error sending test email: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Email Configuration Test</h1>

      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold">Configuration Status:</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-2">
            <div>Public Key:</div>
            <div className={configStatus?.publicKeyPresent ? "text-green-600" : "text-red-600"}>
              {configStatus?.publicKeyPresent ? "✓ Present" : "✗ Missing"}
            </div>

            <div>Service ID:</div>
            <div className={configStatus?.serviceIdPresent ? "text-green-600" : "text-red-600"}>
              {configStatus?.serviceIdPresent ? "✓ Present" : "✗ Missing"}
            </div>

            <div>Script Loaded:</div>
            <div className={configStatus?.scriptLoaded ? "text-green-600" : "text-red-600"}>
              {configStatus?.scriptLoaded ? "✓ Success" : "✗ Failed"}
            </div>

            <div>Initialized:</div>
            <div className={configStatus?.initialized ? "text-green-600" : "text-red-600"}>
              {configStatus?.initialized ? "✓ Success" : "✗ Failed"}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Details:</h3>
            <ul className="list-disc list-inside">
              {configStatus?.details.map((detail: string, index: number) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={sendTestEmail}
          disabled={!configStatus?.isConfigured}
          className={`px-4 py-2 rounded ${
            configStatus?.isConfigured
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Send Test Email
        </button>

        {testEmailStatus && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p>{testEmailStatus}</p>
          </div>
        )}
      </div>
    </div>
  )
} 