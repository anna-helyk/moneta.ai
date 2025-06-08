"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { LiftedCard } from "@/components/ui/lifted-card"

export default function UnderConstructionPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <LiftedCard className="w-full max-w-sm p-6">
        <div className="flex flex-col items-start space-y-6">
          <div className="text-8xl">👋</div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-gray-800">BRB, doing a glow-up.</h1>
            <p className="text-gray-600 mt-3">Working on making this even better for you.</p>
          </div>
          <Button
            onClick={() => router.push("/lessons/1")}
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-3 rounded-lg flex items-center justify-center"
          >
            <Home size={18} className="mr-2" /> Profile
          </Button>
        </div>
      </LiftedCard>
    </div>
  )
}
