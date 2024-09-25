import React from 'react'
import { Box, Pagination, PaginationItem, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

interface ContentProps {
  content: any[]
  page: number
  setPage: (page: number) => void
  totalPages: number
}

const StyledPagination = styled(Pagination)({
  '& .MuiPaginationItem-root': {
    borderRadius: '50%',
    '&.Mui-selected': {
      backgroundColor: '#333', // Selected page color
      color: '#fff'
    }
  }
})

const Content: React.FC<ContentProps> = ({
  content,
  page,
  setPage,
  totalPages
}) => {
  // Handler for pagination change
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage)
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* List of requests */}
      {content.length > 0 ? (
        content.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 2,
              marginBottom: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #ccc'
            }}
          >
            <Box>
              <Typography variant="body1" fontWeight="bold">
                {item.request}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Mã yêu cầu: {item.code}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Thương hiệu đồng hồ: {item.brand}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2">{item.date}</Typography>
              <Typography variant="body2" color="textSecondary">
                {item.status}
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography>Không có dữ liệu.</Typography>
      )}

      {/* Custom Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <StyledPagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                borderRadius: '50%',
                minWidth: '40px',
                height: '40px',
                fontSize: '16px'
              }}
            />
          )}
        />
      </Box>
    </Box>
  )
}

export default Content
