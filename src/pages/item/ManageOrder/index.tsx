import { Container } from '@mui/material'
import ManageOrderTab from './components/ManageOrderTab'

const ManageOrder = () => {
  return (
    <Container
      disableGutters
      component={'div'}
      sx={{
        paddingY: '40px',
        marginTop: '20px'
      }}
    >
      <ManageOrderTab />
    </Container>
  )
}

export default ManageOrder
