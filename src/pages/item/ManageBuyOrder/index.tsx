import { Container } from '@mui/material'
import ManageOrderTab from './components/ManageOrderTab'

const ManageBuyOrder = () => {
  return (
    <Container
      disableGutters
      component={'div'}
      sx={{
        marginTop: 12,
        marginBottom: 4,
        minHeight: 'calc(100vh - 340px)',
        display: 'flex'
      }}
    >
      <ManageOrderTab />
    </Container>
  )
}

export default ManageBuyOrder
