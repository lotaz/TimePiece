import { Box } from '@mui/material'
import LoginForm from './components/LoginForm'
import { useState } from 'react'
import RegistrationForm from './components/RegistrationForm'
import { useLoaderData } from 'react-router-dom'
import { AuthenticateType } from './type'

const AuthenticatePage = () => {
  const data = useLoaderData()
  const { type } = data as { type: AuthenticateType }
  const [authenticateType, setAuthenticateType] = useState(type || 'login')

  return (
    <Box component={'div'}>
      {authenticateType === 'login' ? (
        <LoginForm
          handleChangeFormType={() =>
            setAuthenticateType(AuthenticateType.Register)
          }
        />
      ) : (
        <RegistrationForm
          handleChangeFormType={() =>
            setAuthenticateType(AuthenticateType.Login)
          }
        />
      )}
    </Box>
  )
}

export default AuthenticatePage
