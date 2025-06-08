"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import React from "react"

// Financial Literacy Quiz - 12 questions
const questions = [
  {
    id: 1,
    title: "Which budgeting approach assigns every dollar a specific job?",
    type: "radio",
    options: [
      { value: "a", label: "Zero base" },
      { value: "b", label: "50/30/20" },
      { value: "c", label: "Spend less" },
      { value: "d", label: "By categories" },
    ],
    correct: "a",
  },
  {
    id: 2,
    title: "What includes financial planning?",
    type: "radio",
    options: [
      { value: "a", label: "Shopping list" },
      { value: "b", label: "Only expenses" },
      { value: "c", label: "Any investments" },
      { value: "d", label: "Goals, risks" },
    ],
    correct: "d",
  },
  {
    id: 3,
    title: 'Expenses grow, income unchanged. Reason for "vanishing money"?',
    type: "radio",
    options: [
      { value: "a", label: "Inflation, microtransactions" },
      { value: "b", label: "Bank change" },
      { value: "c", label: "Poor reporting" },
      { value: "d", label: "High limit" },
    ],
    correct: "a",
  },
  {
    id: 4,
    title: "Advantage of deposit over checking account?",
    type: "radio",
    options: [
      { value: "a", label: "Market access" },
      { value: "b", label: "Daily withdrawal" },
      { value: "c", label: "Higher liquidity" },
      { value: "d", label: "Guaranteed profit" },
    ],
    correct: "d",
  },
  {
    id: 5,
    title: "Most important about credit cards?",
    type: "radio",
    options: [
      { value: "a", label: "For investments" },
      { value: "b", label: "High interest" },
      { value: "c", label: "Always mandatory" },
      { value: "d", label: "Free credit" },
    ],
    correct: "b",
  },
  {
    id: 6,
    title: "What to check first for loan?",
    type: "radio",
    options: [
      { value: "a", label: "Effective rate" },
      { value: "b", label: "Bank name" },
      { value: "c", label: "Online ads" },
      { value: "d", label: "Office nearby" },
    ],
    correct: "a",
  },
  {
    id: 7,
    title: "What shows inflation?",
    type: "radio",
    options: [
      { value: "a", label: "Price growth" },
      { value: "b", label: "Unemployment level" },
      { value: "c", label: "Stock profit" },
      { value: "d", label: "Market changes" },
    ],
    correct: "a",
  },
  {
    id: 8,
    title: "What is portfolio rebalancing?",
    type: "radio",
    options: [
      { value: "a", label: "Sell everything" },
      { value: "b", label: "Monthly profit" },
      { value: "c", label: "Asset redistribution" },
      { value: "d", label: "Cash only" },
    ],
    correct: "c",
  },
  {
    id: 9,
    title: "What affects government bond yields?",
    type: "radio",
    options: [
      { value: "a", label: "Currency rates" },
      { value: "b", label: "Credit history" },
      { value: "c", label: "Liquidity risk" },
      { value: "d", label: "Inflation, rates" },
    ],
    correct: "d",
  },
  {
    id: 10,
    title: "How does compound interest work?",
    type: "radio",
    options: [
      { value: "a", label: "Principal only" },
      { value: "b", label: "Monthly payments" },
      { value: "c", label: "Interest on interest" },
      { value: "d", label: "Bank commission" },
    ],
    correct: "c",
  },
  {
    id: 11,
    title: "What's correct about ETF?",
    type: "radio",
    options: [
      { value: "a", label: "Fixed income" },
      { value: "b", label: "Cheap portfolio" },
      { value: "c", label: "Government instrument" },
      { value: "d", label: "No fluctuations" },
    ],
    correct: "b",
  },
  {
    id: 12,
    title: "Highest risk and return?",
    type: "radio",
    options: [
      { value: "a", label: "Startup stocks" },
      { value: "b", label: "Bank deposit" },
      { value: "c", label: "Government bonds" },
      { value: "d", label: "Retirement accounts" },
    ],
    correct: "a",
  },
]

// Ukrainian translations
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

export default function QuestionnairePage({ params }: { params: { id: string } }) {
  const searchParams = React.use(params)
  const questionId = Number.parseInt(searchParams.id)
  const router = useRouter()
  const question = questions.find((q) => q.id === questionId)

  const [answer, setAnswer] = useState<string>("")
  const [selectedLanguage] = useLocalStorage("selectedLanguage", "en")
  const [userAnswers, setUserAnswers] = useLocalStorage<Record<number, string>>("userAnswers", {})
  const userCountry = selectedLanguage === "ua" ? "ua" : "us"
  const [animatingButton, setAnimatingButton] = useState<string>("")

  useEffect(() => {
    // Reset answer state when navigating to a question (don't show previous selection)
    setAnswer("")
  }, [questionId])

  if (!question) {
    return <div>Question not found</div>
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
    setUserAnswers(updatedAnswers)

    if (questionId < questions.length) {
      router.push(`/questionnaire/${questionId + 1}`)
    } else {
      router.push("/thank-you")
    }
  }

  const handleBack = () => {
    if (questionId > 1) {
      router.push(`/questionnaire/${questionId - 1}`)
    } else {
      router.push("/")
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
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#303030] text-white"
            >
              <ArrowLeft size={20} />
            </button>
            {/* Updated stepper format */}
            <div className="text-sm font-medium text-[#303030]">
              <span className="font-bold">{questionId}</span> / 12
            </div>
          </div>

          <div className="flex-1 space-y-6 mb-6">
            <h1 className="text-xl font-bold text-[#303030] text-left">
              {userCountry === "ua" && questionId <= questionsUA.length
                ? questionsUA[questionId - 1].title
                : question.title}
            </h1>

            <div className="space-y-3">
              {(userCountry === "ua" && questionId <= questionsUA.length
                ? questionsUA[questionId - 1].options
                : question.options
              )?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={`w-full p-3 rounded-lg border text-left transition-all duration-250 ${
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
