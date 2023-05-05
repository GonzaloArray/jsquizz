import { Button } from '@mui/material'
import React from 'react'
import { useQuestionStore } from './store/question'

const LIMIT_QUESTIONS = 10

export const Start: React.FC = () => {
  const fetchQuestion = useQuestionStore(state => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestion(LIMIT_QUESTIONS)
  }

  return (
    <Button onClick={handleClick} variant='contained'>
      Empezar
    </Button>
  )
}
