import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { styled } from '@mui/material'
import CommonLayout from '../CommonLayout'
import { PropsWithChildren } from 'react'

interface UserLayoutProps extends PropsWithChildren {}

const StyledLayout = styled(`div`)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
`

const UserLayout: React.FC<UserLayoutProps> = ({
  children
}: UserLayoutProps) => {
  return (
    <CommonLayout>
      <Navbar />
      <StyledLayout>{children}</StyledLayout>
      <Footer />
    </CommonLayout>
  )
}

export default UserLayout
