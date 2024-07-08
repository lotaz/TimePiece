import UserLayout from '@/components/Layout/UserLayout'
import { Box, Container, Pagination, Typography } from '@mui/material'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import FilterComponent from './components/FilterComponent'
import ListCards from '../Home/components/ListCards'
import useSWR from 'swr'
import { AppPath, fetcher } from '@/services/utils'

const SearchPage = () => {
  const { query } = useLoaderData() as { query: string }
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const { data, isLoading } = useSWR(
    AppPath.SEARCH_BY_KEYWORD({ keyword: query, page: currentPage, size: 12 })
  )

  console.log(data, isLoading)

  return (
    <UserLayout>
      <Container
        sx={{
          marginTop: '80px',
          minHeight: 'calc(100vh - 80px)'
        }}
      >
        <Box
          sx={{
            textAlign: 'left'
          }}
        >
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'medium'
            }}
          >
            Kết quả tìm kiếm cho: {query}
          </Typography>
        </Box>
        <Box>
          <FilterComponent />
        </Box>
        <Box>
          <ListCards />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            marginY: '20px'
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Container>
    </UserLayout>
  )
}

export default SearchPage
