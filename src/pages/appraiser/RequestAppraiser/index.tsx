import { Box } from '@mui/material'
import FindRequestAppraiser from './components/FindRequestAppraiser'
import ListRequest from './components/ListRequest'
import { useState } from 'react'
import AppraiserLayout from '@/components/Layout/AppraiserLayout'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import { RequestAppraisal } from './type'

const PAGE_SIZE = 6

const RequestAppraiserPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1) // Track current display page (starts at 1)
  const [loadedPages, setLoadedPages] = useState<RequestAppraisal[]>([]) // Stores all fetched appraisal data
  const [totalPages, setTotalPages] = useState(1) // Total number of pages for pagination

  // Fetch data using SWR based on the current page
  const { isLoading } = useSWR(
    `${AppPath.GET_APPRAISAL_REQUESTS}?page=${Math.ceil(loadedPages.length / PAGE_SIZE) + 1}&size=${PAGE_SIZE}`,
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        setTotalPages(data.totalPages)
        setLoadedPages((prevAppraisals) => [...prevAppraisals, ...data.content])
      }
    }
  )

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
  }

  // Calculate the items to display based on the current page
  const displayedAppraisals = loadedPages.slice(
    (currentPage - 1) * 5,
    currentPage * 5
  )

  return (
    <AppraiserLayout>
      <Box sx={{ marginTop: '80px', display: 'flex', flexDirection: 'column' }}>
        <FindRequestAppraiser />
        <ListRequest
          requests={displayedAppraisals} // Display items for the current page
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isLoading} // Pass the loading state
        />
      </Box>
    </AppraiserLayout>
  )
}

export default RequestAppraiserPage
