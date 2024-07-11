import { Box, Container, Pagination, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import FilterComponent from './components/FilterComponent'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import ListWatches from './components/ListWatches'

const SearchPage = () => {
  const { query } = useLoaderData() as { query: string }
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const { data, isLoading } = useSWR(
    AppPath.SEARCH_BY_KEYWORD({
      keyword: query,
      page: currentPage - 1,
      size: 8
    })
  )

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages)
    }
  }, [currentPage, data])

  return (
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
        {query && (
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'medium'
            }}
          >
            Kết quả tìm kiếm cho: {query}
          </Typography>
        )}
      </Box>
      <Box>
        <FilterComponent />
      </Box>
      <Box>
        <ListWatches watch={data?.content} isLoading={isLoading} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          marginY: '20px'
        }}
      >
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            variant="outlined"
            shape="rounded"
          />
        )}
      </Box>
    </Container>
  )
}

export default SearchPage
