import ListCards from './components/ListCards'
import { Box } from '@mui/material'
import Banner from './components/Banner'
import Brands from './components/Brands'

const HomePage = () => {
  return (
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
  )
}

export default HomePage
