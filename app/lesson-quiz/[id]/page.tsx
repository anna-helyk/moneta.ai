"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import PlaceholderScreen from "@/components/placeholder-screen"

// Mock quiz content with scoring system
const quizContent = {
  "1": {
    title: "Why do you need to invest?",
    classNumber: 1,
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
            label: "I want to avoid fluctuations and possible interim losses during the investment period.",
            score: 0,
          },
          {
            letter: "B",
            value: "minor",
            label: "Minor fluctuations during the investment period are acceptable for me.",
            score: 15,
          },
          {
            letter: "C",
            value: "high",
            label: "High fluctuations during the investment period are favorable for achieving my goal.",
            score: 20,
          },
          {
            letter: "D",
            value: "losses",
            label: "I accept temporary losses, even if achieving the investment goal becomes unlikely.",
            score: 30,
          },
        ],
      },
      {
        id: 3,
        question: "How do you feel about fluctuations at the end of your planned investment term?",
        options: [
          {
            letter: "A",
            value: "none",
            label: "I don't want to experience any possible losses at the end of the investment period.",
            score: 0,
          },
          {
            letter: "B",
            value: "minor",
            label: "Minor losses at the end of the investment period are acceptable for me.",
            score: 10,
          },
          {
            letter: "C",
            value: "high",
            label:
              "High losses at the end of the investment period are acceptable for me because I consciously accept such risk.",
            score: 20,
          },
          {
            letter: "D",
            value: "extend",
            label:
              "If there are significant losses at the end of the investment period, I can leave the invested money for longer because I don't need it.",
            score: 25,
          },
        ],
      },
      {
        id: 4,
        question: "How would you describe your investment amount?",
        options: [
          {
            letter: "A",
            value: "savings",
            label: "This is my safety cushion, I'll be investing from my savings.",
            score: -15,
          },
          {
            letter: "B",
            value: "growth",
            label: "I want to create appropriate capital growth needed to achieve my goal.",
            score: 15,
          },
          {
            letter: "C",
            value: "play",
            label: "This is my 'play money', I'm looking for speculative and risky investments.",
            score: 20,
          },
        ],
      },
      {
        id: 5,
        question: "How do you feel when Bitcoin rises 5% in one day?",
        options: [
          {
            letter: "A",
            value: "indifferent",
            label: "I don't care because I chose money protection.",
            score: 0,
          },
          {
            letter: "B",
            value: "positive",
            label: "I'm happy about the positive trend and know tomorrow could be different.",
            score: 10,
          },
          {
            letter: "C",
            value: "great",
            label: "I feel good because my capital is growing.",
            score: 20,
          },
        ],
      },
    ],
  },
}

export default function LessonQuizPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const lessonId = params.id
  const [userCountry, setUserCountry] = useState<string>("us")
  const [quiz, setQuiz] = useState(quizContent[lessonId as keyof typeof quizContent])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, { value: string; score: number }>>({})
  const [totalScore, setTotalScore] = useState(0)

  useEffect(() => {
    // Check user's country preference from localStorage
    const savedAnswers = localStorage.getItem("userAnswers")
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers)
      if (parsedAnswers[1] === "ua") {
        setUserCountry("ua")
      }
    }
  }, [lessonId])

  // If quiz doesn't exist, show under-maintenance screen
  if (!quiz) {
    return <PlaceholderScreen />
  }

  const question = quiz.questions[currentQuestion]

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      router.push(`/lesson/${lessonId}`)
    }
  }

  const handleSelectOption = (option: { value: string; score: number }) => {
    // Save answer and score
    const updatedAnswers = { ...answers, [question.id]: option }
    setAnswers(updatedAnswers)

    // Calculate total score
    const score = Object.values(updatedAnswers).reduce((sum, answer) => sum + answer.score, 0)
    setTotalScore(score)

    // Go to next question or finish
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completed - navigate to results
      router.push(`/lesson-quiz-result/${lessonId}?score=${score}`)
    }
  }

  // Calculate progress
  const progress = quiz.questions.map((_, index) => {
    if (index < currentQuestion) return "completed"
    if (index === currentQuestion) return "current"
    return "upcoming"
  })

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
          <div className="flex justify-between items-start mb-6">
            <button
              onClick={handleBack}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#303030] text-white"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm font-medium border border-gray-200 shadow-sm">
              Class #{quiz.classNumber}
            </div>
          </div>

          <div className="flex-1 space-y-6 mb-6">
            <h2 className="text-xl font-bold text-[#303030]">
              {currentQuestion + 1}. {question.question}
            </h2>

            <div className="space-y-4">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelectOption({ value: option.value, score: option.score })}
                  className="w-full p-4 rounded-lg border border-gray-300 text-left flex items-start hover:border-[#D1F26E] hover:bg-[#D1F26E]/5"
                >
                  <div className="mr-3 font-bold">{option.letter}.</div>
                  <div>{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex justify-center space-x-2">
              {progress.map((status, index) => (
                <div
                  key={index}
                  className={`h-1 w-6 rounded-full ${
                    status === "completed" ? "bg-[#303030]" : status === "current" ? "bg-[#303030]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
