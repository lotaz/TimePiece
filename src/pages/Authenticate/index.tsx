import { Box } from '@mui/material'
import LoginForm from './components/LoginForm'
import { useState } from 'react'
import RegistrationForm from './components/RegistrationForm'

interface AuthenticatePageProps {}

const AuthenticatePage = (props: AuthenticatePageProps) => {
  const [authenticateType, setAuthenticateType] = useState('login')
  return (
    <Box component={'div'}>
      {authenticateType === 'login' ? (
        <LoginForm
          handleChangeFormType={() => setAuthenticateType('register')}
        />
      ) : (
        <RegistrationForm
          handleChangeFormType={() => setAuthenticateType('login')}
        />
      )}
    </Box>
  )
}

export default AuthenticatePage
