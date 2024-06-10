import Footer from '@/components/Footer'
import { styled } from '@mui/material'
import CommonLayout from '../CommonLayout'
import AppraiserNavbar from '@/components/AppraiserNavbar'

interface AppraiserLayoutProps {
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

const AppraiserLayout: React.FC<AppraiserLayoutProps> = ({
  children
}: AppraiserLayoutProps) => {
  return (
    <CommonLayout>
      <AppraiserNavbar />
      <StyledLayout>{children}</StyledLayout>
    </CommonLayout>
  )
}

export default AppraiserLayout
