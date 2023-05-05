import { useQuestionStore } from '../store/question'

export const useQuestion = () => {
  const questions = useQuestionStore(state => state.questions)

  let correct = 0
  let incorrect = 0
  let unanswerd = 0

  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question

    if (userSelectedAnswer == null) unanswerd++
    else if (userSelectedAnswer === correctAnswer) correct++
    else incorrect++
  })

  return {
    correct,
    incorrect,
    unanswerd
  }
}
