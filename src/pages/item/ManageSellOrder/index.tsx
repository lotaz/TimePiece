import { Container } from '@mui/material'
import ManageOrderTab from './components/ManageOrderTab'

const ManageSellOrder = () => {
  return (
    <Container
      disableGutters
      component={'div'}
      sx={{
        paddingY: '40px',
        marginTop: '30px',
        minHeight: 'calc(100vh - 340px)',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <ManageOrderTab />
    </Container>
  )
}

export default ManageSellOrder
