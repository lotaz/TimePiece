import { Box } from '@mui/material'
import FindRequestAppraiser from './components/FindRequestAppraiser'
import ListRequest from './components/ListRequest'
import { useState, useEffect } from 'react'
import AppraiserLayout from '@/components/Layout/AppraiserLayout'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import { RequestAppraisal } from './type'

const PAGE_SIZE = 6

const RequestAppraiserPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0) // Start page from 0
  const [loadedPages, setLoadedPages] = useState<RequestAppraisal[]>([]) // Stores all fetched appraisal data
  const [totalPages, setTotalPages] = useState(1) // Total number of pages for pagination
  const [isPageLoading, setIsPageLoading] = useState(true) // Loading state for the first page load

  // Fetch data using SWR based on the current page
  const { data, isValidating } = useSWR(
    `${AppPath.GET_APPRAISAL_REQUESTS}?page=${Math.ceil(loadedPages.length / PAGE_SIZE)}&size=${PAGE_SIZE}`,
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        setTotalPages(data.totalPages)
        setLoadedPages((prevAppraisals) => [...prevAppraisals, ...data.content])
        setIsPageLoading(false) // Turn off loading after the first page is loaded
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

  // Load the next page in the background when the user changes the page
  useEffect(() => {
    if (currentPage * PAGE_SIZE >= loadedPages.length && !isValidating) {
      // If user requests a page that's not loaded, load the next set
      setIsPageLoading(true)
    }
  }, [currentPage, loadedPages.length, isValidating])

  // Calculate the items to display based on the current page
  const displayedAppraisals = loadedPages.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE
  )

  return (
    <AppraiserLayout>
      <Box sx={{ marginTop: '80px', display: 'flex', flexDirection: 'column' }}>
        <FindRequestAppraiser />
        <ListRequest
          requests={displayedAppraisals} // Display items for the current page
          currentPage={currentPage} // Pagination UI is 1-based
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isPageLoading} // Pass the loading state
        />
      </Box>
    </AppraiserLayout>
  )
}

export default RequestAppraiserPage
