import { Container } from '@mui/material'
import ManageAppraisalTab from './components/ManageAppraisalTab'

const ManageAppraisal = () => {
  return (
    <Container
      disableGutters
      component={'div'}
      sx={{
        marginTop: 12,
        marginBottom: 4,
        minHeight: 'calc(100vh - 340px)',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <ManageAppraisalTab />
    </Container>
  )
}

export default ManageAppraisal
