import '@/App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createTheme } from '@mui/material/styles'
import { SWRConfig } from 'swr'
import { fetcher } from './services/utils'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const theme = createTheme()

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SWRConfig
        value={{
          fetcher,
          refreshInterval: 5000,
          refreshWhenHidden: false,
          revalidateOnFocus: false,
          fallback: <div>Loading...</div>,
          dedupingInterval: 5000,
          revalidateOnMount: true,
          revalidateOnReconnect: true
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            closeOnClick
            rtl={false}
            hideProgressBar
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <RouterProvider router={router} />
        </ThemeProvider>
      </SWRConfig>
    </LocalizationProvider>
  )
}

export default App
