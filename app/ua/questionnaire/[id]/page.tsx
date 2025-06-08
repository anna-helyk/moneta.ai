"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { use } from "react"

// Ukrainian translations - 12 questions
const questionsUA = [
  {
    id: 1,
    title: "Який підхід до бюджету призначає кожній гривні конкретне завдання?",
    type: "radio",
    options: [
      { value: "a", label: "Нульова база" },
      { value: "b", label: "50/30/20" },
      { value: "c", label: "Витрачай менше" },
      { value: "d", label: "За категоріями" },
    ],
    correct: "a",
  },
  {
    id: 2,
    title: "Що включає фінансове планування?",
    type: "radio",
    options: [
      { value: "a", label: "Список покупок" },
      { value: "b", label: "Лише витрати" },
      { value: "c", label: "Будь-які інвестиції" },
      { value: "d", label: "Цілі, ризики" },
    ],
    correct: "d",
  },
  {
    id: 3,
    title: 'Витрати ростуть, дохід не змінюється. Причина "зниклих грошей"?',
    type: "radio",
    options: [
      { value: "a", label: "Інфляція, мікротранзакції" },
      { value: "b", label: "Зміна банку" },
      { value: "c", label: "Погана звітність" },
      { value: "d", label: "Високий ліміт" },
    ],
    correct: "a",
  },
  {
    id: 4,
    title: "Перевага депозиту над поточним рахунком?",
    type: "radio",
    options: [
      { value: "a", label: "Доступ ринків" },
      { value: "b", label: "Щоденне зняття" },
      { value: "c", label: "Вища ліквідність" },
      { value: "d", label: "Гарантований прибуток" },
    ],
    correct: "d",
  },
  {
    id: 5,
    title: "Найважливіше про кредитні картки?",
    type: "radio",
    options: [
      { value: "a", label: "Для інвестицій" },
      { value: "b", label: "Високі відсотки" },
      { value: "c", label: "Обов'язкові завжди" },
      { value: "d", label: "Безкоштовний кредит" },
    ],
    correct: "b",
  },
  {
    id: 6,
    title: "Що перевірити перше при позиці?",
    type: "radio",
    options: [
      { value: "a", label: "Ефективну ставку" },
      { value: "b", label: "Назву банку" },
      { value: "c", label: "Рекламу онлайн" },
      { value: "d", label: "Офіс поруч" },
    ],
    correct: "a",
  },
  {
    id: 7,
    title: "Що показує інфляція?",
    type: "radio",
    options: [
      { value: "a", label: "Зростання цін" },
      { value: "b", label: "Рівень безробіття" },
      { value: "c", label: "Прибуток акцій" },
      { value: "d", label: "Зміни ринку" },
    ],
    correct: "a",
  },
  {
    id: 8,
    title: "Що таке ребалансування портфеля?",
    type: "radio",
    options: [
      { value: "a", label: "Продаж всього" },
      { value: "b", label: "Щомісячний прибуток" },
      { value: "c", label: "Перерозподіл активів" },
      { value: "d", label: "Готівка тільки" },
    ],
    correct: "c",
  },
  {
    id: 9,
    title: "Що впливає на дохідність державних облігацій?",
    type: "radio",
    options: [
      { value: "a", label: "Курс валют" },
      { value: "b", label: "Кредитна історія" },
      { value: "c", label: "Ризик ліквідності" },
      { value: "d", label: "Інфляція, ставки" },
    ],
    correct: "d",
  },
  {
    id: 10,
    title: "Як працює складний відсоток?",
    type: "radio",
    options: [
      { value: "a", label: "Тільки основна" },
      { value: "b", label: "Щомісячні виплати" },
      { value: "c", label: "Відсотки на відсотки" },
      { value: "d", label: "Банківська комісія" },
    ],
    correct: "c",
  },
  {
    id: 11,
    title: "Що правильно про ETF?",
    type: "radio",
    options: [
      { value: "a", label: "Фіксований прибуток" },
      { value: "b", label: "Дешевий портфель" },
      { value: "c", label: "Державний інструмент" },
      { value: "d", label: "Без коливань" },
    ],
    correct: "b",
  },
  {
    id: 12,
    title: "Найвищий ризик та прибуток?",
    type: "radio",
    options: [
      { value: "a", label: "Стартап акції" },
      { value: "b", label: "Банківський депозит" },
      { value: "c", label: "Державні облігації" },
      { value: "d", label: "Пенсійні рахунки" },
    ],
    correct: "a",
  },
]

export default function QuestionnairePageUA({ params }: { params: { id: string } }) {
  const router = useRouter()
  const questionId = Number.parseInt(params.id)
  const question = questionsUA.find((q) => q.id === questionId)

  const [answer, setAnswer] = useState<string>("")
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [animatingButton, setAnimatingButton] = useState<string>("")

  useEffect(() => {
    // Load previous answers from localStorage
    const savedAnswers = localStorage.getItem("userAnswersUA")
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers)
      setUserAnswers(parsedAnswers)
    }

    // Reset answer state when navigating to a question (don't show previous selection)
    setAnswer("")
  }, [questionId])

  if (!question) {
    return <div>Питання не знайдено</div>
  }

  const handleOptionClick = (optionValue: string) => {
    // Trigger tap animation
    setAnimatingButton(optionValue)

    // Remove animation after 250ms
    setTimeout(() => {
      setAnimatingButton("")
    }, 250)

    // Save answer and navigate
    const updatedAnswers = { ...userAnswers, [questionId]: optionValue }
    localStorage.setItem("userAnswersUA", JSON.stringify(updatedAnswers))

    if (questionId < questionsUA.length) {
      router.push(`/ua/questionnaire/${questionId + 1}`)
    } else {
      router.push("/ua/thank-you")
    }
  }

  const handleBack = () => {
    if (questionId > 1) {
      router.push(`/ua/questionnaire/${questionId - 1}`)
    } else {
      router.push("/ua")
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
          <div className="flex justify-between items-start mb-6">
            <button
              onClick={handleBack}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-[#303030]"
            >
              <ArrowLeft size={20} />
            </button>
            {/* Updated stepper format */}
            <div className="text-sm font-medium text-[#303030]">{questionId} / 12</div>
          </div>

          <div className="flex-1 space-y-6 mb-6">
            <h1 className="text-xl font-bold text-[#303030] text-left">{question.title}</h1>

            <div className="space-y-3">
              {question.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={`w-full p-3 rounded-lg border text-left transition-all duration-250 text-[#303030] ${
                    animatingButton === option.value
                      ? "border-gray-400 border-2 bg-gray-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{
                    transform: animatingButton === option.value ? "scale(0.98)" : "scale(1)",
                  }}
                >
                  {option.value.toUpperCase()}. {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
