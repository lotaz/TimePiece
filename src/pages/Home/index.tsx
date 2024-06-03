import Banner from '@/pages/Home/components/Banner'
import Layout from '@/components/Layout'
import ListCards from './components/ListCards'
import { Box } from '@mui/material'

const HomePage = () => {
  return (
    <Layout>
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
    </Layout>
  )
}

export default HomePage
