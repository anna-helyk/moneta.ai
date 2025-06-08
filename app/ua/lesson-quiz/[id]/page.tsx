"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import PlaceholderScreen from "@/components/placeholder-screen"

// Ukrainian translation
const quizContentUA = {
  "1": {
    title: "Чому потрібно інвестувати?",
    classNumber: 1,
    questions: [
      {
        id: 1,
        question: "Які очікування маєте до вашого вкладу?",
        options: [
          {
            letter: "A",
            value: "preserve",
            label: "Найважливіше для мене зберегти вартість капіталу",
            score: 0,
          },
          {
            letter: "B",
            value: "market",
            label: "Я хочу отримати ринкові відсотки на мій вкладений капітал",
            score: 10,
          },
          {
            letter: "C",
            value: "high",
            label: "Я хочу більш високу дохідність, ніж на ринку і готовий ризикувати",
            score: 15,
          },
        ],
      },
      {
        id: 2,
        question: "Як ви ставитесь до коливань інвестиційного ринку?",
        options: [
          {
            letter: "A",
            value: "avoid",
            label: "Я хочу уникнути коливань і можливих проміжних втрат під час інвестиційного періоду",
            score: 0,
          },
          {
            letter: "B",
            value: "minor",
            label: "Під час інвестиційного періоду незначні коливання є сприятливими для мене",
            score: 15,
          },
          {
            letter: "C",
            value: "high",
            label: "Високі коливання протягом інвестиційного періоду є сприятливими для досягнення мети",
            score: 20,
          },
          {
            letter: "D",
            value: "losses",
            label: "Я сприймаю тимчасові втрати, навіть якщо досягнення мети інвестицій буде малоймовірним",
            score: 30,
          },
        ],
      },
      {
        id: 3,
        question: "Як ви ставитесь до коливань на завершенні планового терміну вкладу?",
        options: [
          {
            letter: "A",
            value: "none",
            label: "Я не хочу відчувати будь-яких можливих збитків наприкінці інвестиційного періоду",
            score: 0,
          },
          {
            letter: "B",
            value: "minor",
            label: "Незначні втрати в кінці інвестиційного періоду прийнятні для мене",
            score: 10,
          },
          {
            letter: "C",
            value: "high",
            label:
              "Високі втрати в кінці інвестиційного періоду прийнятні для мене, тому що свідомо приймаю такий ризик",
            score: 20,
          },
          {
            letter: "D",
            value: "extend",
            label:
              "Якщо будуть відчутні втрати в кінці інвестиційного періоду, я можу залишити вкладені гроші на довше, тому що вони мені не потрібні",
            score: 25,
          },
        ],
      },
      {
        id: 4,
        question: "Як би ви описали вашу суму інвестицій?",
        options: [
          {
            letter: "A",
            value: "savings",
            label: "Це мій запас, буду інвестувати з подушки",
            score: -15,
          },
          {
            letter: "B",
            value: "growth",
            label: "Я хочу створити відповідне зростання капіталу, яке необхіне для досягнення цілі",
            score: 15,
          },
          {
            letter: "C",
            value: "play",
            label: "Це мої «ігрові гроші», шукаю спекулятивні та ризикові інвестиції",
            score: 20,
          },
        ],
      },
      {
        id: 5,
        question: "Який настрій у вас, якщо Bitcoin в один день зросте на 5%?",
        options: [
          {
            letter: "A",
            value: "indifferent",
            label: "Мені всеодно, бо я вибрав захист грошей",
            score: 0,
          },
          {
            letter: "B",
            value: "positive",
            label: "Я задоволений позитивною динамікою і знаю, що завтра може бути інакше",
            score: 10,
          },
          {
            letter: "C",
            value: "great",
            label: "Я почуваю себе добре, тому що мій капітал зростає",
            score: 20,
          },
        ],
      },
    ],
  },
}

export default function LessonQuizPageUA({ params }: { params: { id: string } }) {
  const router = useRouter()
  const lessonId = params.id
  const quiz = quizContentUA[lessonId as keyof typeof quizContentUA]
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, { value: string; score: number }>>({})
  const [totalScore, setTotalScore] = useState(0)

  // If quiz doesn't exist, show under-maintenance screen
  if (!quiz) {
    return <PlaceholderScreen />
  }

  const question = quiz.questions[currentQuestion]

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      router.push(`/ua/lesson/${lessonId}`)
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
      router.push(`/ua/lesson-quiz-result/${lessonId}?score=${score}`)
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
              Урок #{quiz.classNumber}
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
