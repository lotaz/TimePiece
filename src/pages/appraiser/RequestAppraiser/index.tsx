import { Box, CircularProgress } from '@mui/material'
import FindRequestAppraiser from './components/FindRequestAppraiser'
import ListRequest from './components/ListRequest'
import { useEffect, useState } from 'react'
import AppraiserLayout from '@/components/Layout/AppraiserLayout'
import useSWR from 'swr'
import { AppPath, fetcher } from '@/services/utils'

// interface RequestAppraiserProps {}

const mockrequests = [
  {
    id: 1,
    date: '01-09-2020',
    code: '098765432',
    brand: 'Rolex',
    status: 'Đợi duyệt'
  },
  {
    id: 2,
    date: '01-09-2020',
    code: '098765432',
    brand: 'Rolex',
    status: 'Đợi duyệt'
  },
  {
    id: 3,
    date: '01-09-2020',
    code: '098765432',
    brand: 'Rolex',
    status: 'Đợi duyệt'
  },
  {
    id: 4,
    date: '01-09-2020',
    code: '098765432',
    brand: 'Rolex',
    status: 'Đợi duyệt'
  },
  {
    id: 5,
    date: '01-09-2020',
    code: '098765432',
    brand: 'Rolex',
    status: 'Đợi duyệt'
  }
]

const PAGE_SZIE = 5

const RequestAppraiserPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const {
    data: data,
    error,
    isLoading
  } = useSWR(
    `${AppPath.GET_APPRAISAL_REQUESTS}?page=${currentPage}&size=${PAGE_SZIE}`
  )

  useEffect(() => {
    if (data) setTotalPages(data.totalPages)
  }, [data, totalPages])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
  }

  return (
    <AppraiserLayout>
      <Box sx={{ marginTop: '80px', display: 'flex', flexDirection: 'column' }}>
        <FindRequestAppraiser />

        <ListRequest
          requests={data?.content}
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </Box>
    </AppraiserLayout>
  )
}

export default RequestAppraiserPage
