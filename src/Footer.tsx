import React from 'react'
import { useQuestion } from './hook/useQuestion'
import { Button } from '@mui/material'
import { useQuestionStore } from './store/question'

export const Footer: React.FC = () => {
  const reset = useQuestionStore(state => state.reset)
  const { incorrect, correct, unanswerd } = useQuestion()

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>correctas {correct}</strong>
      <strong>incorrectas {incorrect}</strong>
      <strong>preguntas {unanswerd}</strong>
      <Button onClick={() => reset()}>Reset</Button>
    </footer>
  )
}
