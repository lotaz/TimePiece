import '@/App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App