import AppraiserLayout from '@/components/Layout/AppraiserLayout'
import { Box, Button, Typography } from '@mui/material'
import CustomerInfo from '../ViewAppraisalForm/components/CustomerInfo'
import WatchInfo from '../ViewAppraisalForm/components/WatchInfo'
import { useNavigate, useParams } from 'react-router-dom'

const AppraisalFormDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <AppraiserLayout>
      <Box
        component={'div'}
        marginTop={20}
        bgcolor={'#fff'}
        marginX={20}
        marginBottom={10}
        paddingY={5}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: '600'
          }}
        >
          Yêu cầu thẩm định
        </Typography>
        <Box marginTop={2} bgcolor={'#fff'} padding={8}>
          <Box>
            <Typography
              component={'div'}
              sx={{
                padding: '16px',
                width: '300px',
                backgroundColor: '#434343',
                textAlign: 'left',
                marginLeft: '40px',
                color: '#fff',
                fontWeight: '600'
              }}
            >
              Thông tin của khách hàng
            </Typography>
            <CustomerInfo
              name={'Thắng Nguyễn'}
              email={'ruacon130@gmail.com'}
              brand={'Rolex'}
              phone={'012312312321'}
              referenceNumber={'1231232321'}
            />
          </Box>
          <Box>
            <Typography
              component={'div'}
              sx={{
                padding: '16px',
                width: '300px',
                backgroundColor: '#434343',
                textAlign: 'left',
                marginLeft: '40px',
                color: '#fff',
                fontWeight: '600',
                marginTop: '40px'
              }}
            >
              Thông tin đồng hồ
            </Typography>
            <WatchInfo />
          </Box>
          <Box>
            <Typography
              component={'div'}
              sx={{
                padding: '16px',
                width: '300px',
                backgroundColor: '#434343',
                textAlign: 'left',
                marginLeft: '40px',
                color: '#fff',
                fontWeight: '600',
                marginTop: '40px'
              }}
            >
              Hình ảnh đồng hồ
            </Typography>
          </Box>
        </Box>
        <Button
          sx={{
            bgcolor: '#434343',
            color: '#fff',
            padding: '10px 20px',
            ':hover': {
              bgcolor: '#434343',
              opacity: 0.8,
              cursor: 'pointer'
            }
          }}
          onClick={() => {
            navigate(`/appraiser/${id}/view-appraisal-form`)
          }}
        >
          NHẬN YÊU CẦU
        </Button>
      </Box>
    </AppraiserLayout>
  )
}

export default AppraisalFormDetailPage
