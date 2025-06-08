"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

// Function to calculate quiz score and determine result
const calculateQuizResult = (answers: Record<number, string>) => {
  const correctAnswers = ["a", "d", "a", "d", "b", "a", "a", "c", "d", "c", "b", "a"]
  let score = 0

  for (let i = 1; i <= 12; i++) {
    if (answers[i] === correctAnswers[i - 1]) {
      score++
    }
  }

  if (score >= 10) {
    return {
      type: "rockstar",
      emoji: "🎸",
      title: "Financial Rock Star",
      titleUA: "Фінансова рок-зірка",
      description:
        "Your knowledge is at the top level — you already understand finances well and have confidence in your knowledge! By the way, if you've read this far, it means money is no longer just about \"surviving\" for you. And that's awesome.",
      descriptionUA:
        'Твої знання на топовому рівні — ти вже добре розбираєшся у фінансах і маєш впевненість у своїх знаннях! До речі, якщо ти дочитав до цього моменту — значить, для тебе гроші давно вже не просто про "вижити". І це круто.',
      score,
    }
  } else if (score >= 6) {
    return {
      type: "ninja",
      emoji: "🥷",
      title: "Money Ninja in Training",
      titleUA: "Грошовий ніндзя-стажер",
      description:
        "Your basic knowledge is solid and you've already mastered many financial techniques. There's room for growth to become a master. You understand the fundamentals, but some investment and financial planning nuances still need study.",
      descriptionUA:
        "Твої базові знання солідні і ти вже освоїв багато фінансових прийомів. Є простір для зростання, щоб стати майстром. Ти розумієш основи, але деякі нюанси інвестування та фінансового планування ще потребують вивчення.",
      score,
    }
  } else {
    return {
      type: "rookie",
      emoji: "⭐",
      title: "Money Rookie",
      titleUA: "Грошовий новачок",
      description:
        "Don't worry — we all started at level 1! Your results show it's time to begin an epic adventure in the world of finance. Good news: every learning step unlocks new achievements and opportunities for your financial future.",
      descriptionUA:
        "Не переживай — усі ми починали з рівня 1! Твої результати показують, що настав час почати епічну пригоду у світі фінансів. Хороша новина: кожен крок у навчанні відкриває нові досягнення та можливості для твого фінансового майбутнього.",
      score,
    }
  }
}

export default function QuizResultPageUA() {
  const router = useRouter()
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    // Load quiz answers and calculate result
    const savedAnswers = localStorage.getItem("userAnswersUA")
    if (savedAnswers) {
      const answers = JSON.parse(savedAnswers)
      const quizResult = calculateQuizResult(answers)
      setResult(quizResult)

      // Store result for email delivery
      localStorage.setItem("quizResult", JSON.stringify(quizResult))
    }
  }, [])

  const handleGetResult = () => {
    router.push("/ua/personal-data/email")
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5]">
        <div className="text-[#303030]">Завантаження...</div>
      </div>
    )
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
            {/* Emoji */}
            <div className="text-8xl">{result.emoji}</div>

            {/* Text content */}
            <div className="text-left">
              <h1 className="text-2xl font-bold text-[#303030] mb-4">
                Вау! Ти справжній<span className="bg-[#D1F26E] px-1">{result.titleUA}</span>!
              </h1>
              <p className="text-sm text-gray-600 mb-4">({result.score} з 12 правильних)</p>
              <p className="text-[#303030] text-base leading-relaxed">{result.descriptionUA}</p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleGetResult}
            className="w-full bg-[#D1F26E] hover:bg-[#D1F26E]/90 text-[#303030] font-medium py-3 rounded-lg flex items-center justify-center"
          >
            <span>Отримати результати</span>
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}
