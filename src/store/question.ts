import { create } from 'zustand'
import { type Question } from '../type/type'
import { persist } from 'zustand/middleware'
import { getQuestions } from '../service/getQuestions'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
  reset: () => void
}

/* const logger = (config) => (set, get, api) => {
  return config(
    (...args) => {
      console.log('antes del cambio')
      set(...args)
      console.log('después del cambio')
    }
  )
} */

export const useQuestionStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      const questions = await getQuestions(limit)

      set({ questions })
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()

      const newQuestions: Question[] = structuredClone(questions)

      const questionIndex = newQuestions.findIndex(q => q.id === questionId)

      const questionInfo = newQuestions[questionIndex]
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }

      set({ questions: newQuestions })
    },
    goNextQuestion: () => {
      const { questions, currentQuestion } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },
    goPrevQuestion: () => {
      const { questions, currentQuestion } = get()

      const nextQuestion = currentQuestion - 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },
    reset: () => {
      set({ questions: [], currentQuestion: 0 })
    }
  }
}, {
  name: 'questions'
}))
