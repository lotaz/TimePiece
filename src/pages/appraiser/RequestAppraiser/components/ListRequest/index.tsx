import React from 'react'
import { Box, Typography, Paper, Grid, Pagination } from '@mui/material'

interface Request {
  date: string
  code: string
  brand: string
  status: string
}

interface ListRequestProps {
  requests: Request[]
  currentPage: number
  totalPages: number
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void
}

const ListRequest: React.FC<ListRequestProps> = ({
  requests,
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <Box p={2}>
      {requests.map((request, index) => (
        <Paper
          key={index}
          elevation={1}
          style={{ padding: '16px', marginBottom: '16px' }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={8}
              style={{ textAlign: 'left' }}
              component={'div'}
            >
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontWeight: 'bold'
                }}
              >
                Yêu cầu thẩm định đồng hồ ngày {request.date}
              </Typography>
              <Typography variant="body2">
                Mã yêu cầu: <strong>{request.code}</strong> | Thương hiệu đồng
                hồ: <strong>{request.brand}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} style={{ textAlign: 'right' }}>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  fontWeight: 'bold'
                }}
              >
                {request.status}
              </Typography>
              <Typography variant="body2">{request.date}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  )
}

export default ListRequest
