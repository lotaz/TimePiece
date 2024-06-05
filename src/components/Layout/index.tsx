import { Container, styled } from '@mui/material'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { AuthProvider } from '@/contexts/AuthContext'

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
  return (
    <AuthProvider>
      <Navbar />
      <StyledLayout>
        <Container>{children}</Container>
      </StyledLayout>
      <Footer />
    </AuthProvider>
  )
}

export default Layout