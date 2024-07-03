import { Container } from '@mui/material'
import ManageOrderTab from './components/ManageOrderTab'
import UserLayout from '@/components/Layout/UserLayout'

const ManageOrder = () => {
  return (
    <UserLayout>
      <Container
        disableGutters
        component={'div'}
        sx={{
          paddingY: '40px',
          marginTop: '60px'
        }}
      >
        <ManageOrderTab />
      </Container>
    </UserLayout>
  )
}

export default ManageOrder
