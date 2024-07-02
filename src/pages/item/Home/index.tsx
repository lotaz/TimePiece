import ListCards from './components/ListCards'
import { Box } from '@mui/material'
import Banner from './components/Banner'
import UserLayout from '@/components/Layout/UserLayout'
import Brands from './components/Brands'

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
        <Brands />
        <ListCards />
      </Box>
    </UserLayout>
  )
}

export default HomePage
