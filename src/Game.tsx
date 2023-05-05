import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { useQuestionStore } from './store/question'
import { type Question as QuestionType } from './type/type'
import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { ArrowBackIosNew } from './components/ArrowBackIosNew'
import { Footer } from './Footer'

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info

  if (userSelectedAnswer == null) return 'transparent'
  if (index === correctAnswer) return 'green'
  if (index === userSelectedAnswer) return 'red'

  return 'transparent'
}

const Questions = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionStore(state => state.selectAnswer)

  const handleClick = (answerIndex: number) => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left' }}>
      <Typography variant='h5'>
        {info.question}
      </Typography>

      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgColor: '#333' }} disablePadding>
        {
          info.answers.map((answer, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: getBackgroundColor(info, index)
                }}
                onClick={() => handleClick(index)}
                disabled={info.userSelectedAnswer != null}
              >
                <ListItemText primary={answer} sx={{ fontWeight: '600', textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    </Card>
  )
}

export const Game: React.FC = () => {
  const questions = useQuestionStore(state => state.questions)
  const currentQuestion = useQuestionStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionStore(state => state.goNextQuestion)
  const goPrevQuestion = useQuestionStore(state => state.goPrevQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <Questions info={questionInfo} />
        <Footer />
      </Stack>
    </>
  )
}
