"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import PlaceholderScreen from "@/components/placeholder-screen"

// Mock lesson content
const lessonContent = {
  "1": {
    title: "Financial plan",
    subtitle: "What type of investor are You?",
    classNumber: 1,
    content: [
      {
        type: "intro",
        content:
          "In this lesson, we'll explore why investing is important and help you discover your investor profile.",
      },
      {
        type: "test",
        questions: [
          {
            id: 1,
            question: "What are your expectations for your investment?",
            options: [
              {
                letter: "A",
                value: "preserve",
                label: "The most important thing for me is to preserve the value of my capital.",
                score: 0,
              },
              {
                letter: "B",
                value: "market",
                label: "I want to receive market returns on my invested capital.",
                score: 10,
              },
              {
                letter: "C",
                value: "high",
                label: "I want higher returns than the market and I am willing to take risks.",
                score: 15,
              },
            ],
          },
          {
            id: 2,
            question: "How do you feel about market fluctuations?",
            options: [
              {
                letter: "A",
                value: "avoid",
                label: "I want to avoid fluctuations",
                score: 0,
              },
              {
                letter: "B",
                value: "minor",
                label: "Minor fluctuations are acceptable",
                score: 15,
              },
              {
                letter: "C",
                value: "high",
                label: "High fluctuations are fine for my goals",
                score: 20,
              },
              {
                letter: "D",
                value: "losses",
                label: "I accept temporary losses",
                score: 30,
              },
            ],
          },
        ],
      },
    ],
  },
}

export default function LessonPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const lessonId = params.id
  const lesson = lessonContent[lessonId as keyof typeof lessonContent]

  // If lesson doesn't exist, show under-maintenance screen
  if (!lesson) {
    return <PlaceholderScreen />
  }

  const handleBack = () => {
    router.push("/lessons/1")
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
        <div className="relative bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <button
              onClick={handleBack}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-[#303030]"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm font-medium border border-gray-200 shadow-sm text-[#303030]">
              Class #{lesson.classNumber}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-xl font-bold text-[#303030]">{lesson.title}</h1>

            {lesson.content.map((section, index) => {
              if (section.type === "intro") {
                return (
                  <div key={index} className="text-gray-600">
                    {section.content}
                  </div>
                )
              }
              return null
            })}

            {/* Video Section */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-2xl translate-x-[8px] translate-y-[8px]"
                style={{ backgroundColor: "#303030" }}
              ></div>
              <div className="relative rounded-2xl border border-gray-100 overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/4cszZ8fgO2A"
                  title="Why do you need to invest?"
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ border: "none" }}
                />
              </div>
            </div>

            {/* Quiz Introduction */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-2xl translate-x-[8px] translate-y-[8px]"
                style={{ backgroundColor: "#303030" }}
              ></div>
              <div className="relative bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-[#303030] mb-2">{lesson.subtitle}</h2>
                <p className="text-gray-600">below ↓</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-6 mb-6">
            <button
              onClick={() => router.push(`/lesson-quiz/${lessonId}`)}
              className="w-full bg-[#D1F26E] hover:bg-[#D1F26E]/90 text-[#303030] font-medium py-3 rounded-lg flex items-center justify-center"
            >
              Start test
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
