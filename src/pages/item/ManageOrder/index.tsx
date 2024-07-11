import { Container } from '@mui/material'
import ManageOrderTab from './components/ManageOrderTab'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'

const ManageOrder = () => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  const { data, isLoading } = useSWR(AppPath.GET_ORDERS(user?.id))

  return (
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
  )
}

export default ManageOrder
