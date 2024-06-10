import ListCards from './components/ListCards'
import { Box } from '@mui/material'
import Banner from './components/Banner'
import UserLayout from '@/components/Layout/UserLayout'

const HomePage = () => {
  return (
    <UserLayout>
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '40px',
          marginTop: '60px'
        }}
      >
        <Banner />
        <ListCards />
      </Box>
    </UserLayout>
  )
}

export default HomePage
