import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavascriptLogo } from './JavascriptLogo'
import { Start } from './Start'
import { useQuestionStore } from './store/question'
import { Game } from './Game'

function App () {
  const question = useQuestionStore(state => state.questions)
  console.log(question)
  return (
    <main>
      <Container>
        <Typography variant='h4' component='h1'>
          <Stack direction='row' gap={2} alignItems='center'>
            <JavascriptLogo />
            <h2>Javascript Quizz</h2>
          </Stack>
        </Typography>

        {question.length === 0 && <Start />}
        {question.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
