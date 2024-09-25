import AppraiserLayout from '@/components/Layout/AppraiserLayout'
import { AppPath } from '@/services/utils'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import useSWR from 'swr'
import HistoryTab from './components/HistoryTab'
import Content from './components/Content'

const contentData = [
  {
    request: 'Yêu cầu thẩm định đồng hồ ngày 01-09-2020',
    code: '098765432',
    brand: 'Rolex',
    date: '01-09-2020',
    status: 'Đã nhận'
  },
  {
    request: 'Yêu cầu thẩm định đồng hồ ngày 02-09-2020',
    code: '098765433',
    brand: 'Omega',
    date: '02-09-2020',
    status: 'Đã nhận'
  }
  // More items...
]

const HistoryAppraisal = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [page, setPage] = useState(0)
  const [appraisal, setAppraisal] = useState([])
  const [status, setStatus] = useState<
    'all' | 'processing' | 'wait' | 'complete'
  >('all')

  const { isLoading } = useSWR(
    AppPath.GET_APPRAISAL_REQUESTS_BY_USER({
      userId: user.id,
      page: page,
      size: 100
    }),
    {
      onSuccess: (data) => {
        console.log('data', data)
      }
    }
  )
  return (
    <AppraiserLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '1200px'
        }}
        marginTop={20}
        marginX={'auto'}
        marginBottom={10}
      >
        <Box>
          <Typography
            variant="h5"
            align="center"
            sx={{ padding: '20px 0', fontWeight: 'bold' }}
          >
            Danh sách lịch sử thẩm định đồng hồ
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#fff'
        }}
      >
        <HistoryTab status={status} setStatus={setStatus} />
        <Content
          content={contentData}
          page={page}
          setPage={setPage}
          totalPages={10}
        />
      </Box>
    </AppraiserLayout>
  )
}

export default HistoryAppraisal
