"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { VideoCard } from "@/components/ui/video-card"
import { LiftedCard } from "@/components/ui/lifted-card"

// Mock lesson content
const videoLessons = {
  "1": {
    title: "Why do you need to invest?",
    subtitle: "Understanding the importance of investing",
    classNumber: 3,
    description:
      "This video explains why investing is crucial for your financial future and how it can help you achieve your long-term goals.",
  },
}

export default function LessonVideoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const lessonId = params.id
  const lesson = videoLessons[lessonId as keyof typeof videoLessons]

  const [videoStarted, setVideoStarted] = useState(false)

  if (!lesson) {
    return <div>Lesson not found</div>
  }

  const handleBack = () => {
    router.push("/lessons/1")
  }

  const handlePlay = () => {
    setVideoStarted(true)
  }

  const handleContinue = () => {
    router.push(`/lesson/${lessonId}`)
  }

  return (
    <div className="flex flex-col min-h-screen p-6 space-y-4">
      {!videoStarted ? (
        <>
          <div className="flex items-center space-x-3 mb-2">
            <button
              onClick={handleBack}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white"
            >
              <ArrowLeft size={18} />
            </button>
          </div>

          <VideoCard
            title={lesson.title}
            subtitle={lesson.subtitle}
            classNumber={lesson.classNumber}
            onPlay={handlePlay}
          />

          <LiftedCard className="w-full">
            <h3 className="font-bold mb-2">About this lesson</h3>
            <p className="text-gray-600 text-sm">{lesson.description}</p>
          </LiftedCard>
        </>
      ) : (
        <>
          <div className="flex items-center space-x-3 mb-2">
            <button
              onClick={() => setVideoStarted(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="text-sm text-gray-500">Class #{lesson.classNumber}</div>
              <h1 className="text-xl font-bold text-gray-800">{lesson.title}</h1>
            </div>
          </div>

          <div className="relative w-full bg-black rounded-[20px] aspect-video mb-4">
            <div className="absolute inset-0 rounded-[20px] translate-x-[3px] translate-y-[3px] bg-gray-800"></div>
            <div className="relative w-full h-full rounded-[20px] flex items-center justify-center bg-orange-500">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">💰</div>
                <p className="font-medium">Video would play here</p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full bg-primary hover:bg-primary/90 text-gray-800 font-semibold py-3 rounded-lg flex items-center justify-center"
          >
            Continue to quiz <span className="ml-2">→</span>
          </Button>
        </>
      )}
    </div>
  )
}
