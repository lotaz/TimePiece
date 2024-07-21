import { Box, Container, Pagination, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import FilterComponent from './components/FilterComponent'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import ListWatches from './components/ListWatches'

const SearchPage = () => {
  const { query, brand, type } = useLoaderData() as {
    query: string
    brand: string
    type: string
  }

  const [watches, setWatches] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(12)
  const [filters, setFilters] = useState({
    area: '',
    brand,
    maxPrice: undefined,
    minPrice: undefined,
    status: '',
    type,
    condition: ''
  })

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }))
  }

  const { data, isLoading } = useSWR(
    AppPath.SEARCH_WATCH({
      keyword: query,
      page: currentPage,
      size: 12,
      ...filters
    })
  )

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages)
      setCurrentPage(data.pageable.pageNumber + 1)
    }
  }, [currentPage, data])

  useEffect(() => {
    if (!isLoading) {
      setWatches(data?.content)
    }
  }, [data?.content, isLoading])

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
        {query.trim() && (
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
        <FilterComponent
          area={filters.area}
          brand={filters.brand}
          maxPrice={filters.maxPrice}
          minPrice={filters.minPrice}
          status={filters.status}
          type={filters.type}
          condition={filters.condition}
          isLoading={isLoading}
          onFilterChange={handleFilterChange}
        />
      </Box>
      <Box>
        <ListWatches watch={watches} isLoading={isLoading} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          marginY: '20px'
        }}
      >
        {totalPages > 1 && !isLoading && (
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
