import { Container, styled } from '@mui/material'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { AuthProvider, User } from '@/contexts/AuthContext'
import AppraiserNavbar from '../AppraiserNavbar'
import { useEffect, useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const StyledLayout = styled(`div`)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
`

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  return (
    <AuthProvider>
      <>
        {user?.role === 'appraiser' ? <AppraiserNavbar /> : <Navbar />}
        <StyledLayout>
          <Container>{children}</Container>
        </StyledLayout>
        <Footer />
      </>
    </AuthProvider>
  )
}

export default Layout