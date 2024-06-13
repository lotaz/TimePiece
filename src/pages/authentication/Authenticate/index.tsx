import { Box, Container } from '@mui/material'
import LoginForm from './components/LoginForm'
import { useState } from 'react'
import RegistrationForm from './components/RegistrationForm'
import { useLoaderData } from 'react-router-dom'
import { AuthenticateType } from './type'
import CommonLayout from '@/components/Layout/CommonLayout'
import bg from '@/assets/authenBg.png'

const AuthenticatePage = () => {
  const data = useLoaderData()
  const { type } = data as { type: AuthenticateType }
  const [authenticateType, setAuthenticateType] = useState(type || 'login')

  return (
    <CommonLayout>
      <Container
        component={'div'}
        maxWidth={false}
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100vh',
          display: 'flex'
        }}
      >
        <Box
          sx={{
            bgcolor: 'white',
            maxWidth: '500px',
            margin: ' auto',
            padding: '30px 40px',
            borderRadius: '20px',
            position: 'relative'
          }}
        >
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
      </Container>
    </CommonLayout>
  )
}

export default AuthenticatePage
