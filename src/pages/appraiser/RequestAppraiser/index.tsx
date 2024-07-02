import { Box } from '@mui/material'
import FindRequestAppraiser from './components/FindRequestAppraiser'
import ListRequest from './components/ListRequest'
import { useEffect, useState } from 'react'
import AppraiserLayout from '@/components/Layout/AppraiserLayout'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'

const PAGE_SZIE = 5

const RequestAppraiserPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const {
    data: data,

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
