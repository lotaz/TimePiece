import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Pagination,
  Skeleton
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getVietnameseStatus } from '@/common/utils'

interface Request {
  date: string
  code: string
  brand: string
  status: string
  id: number
}

interface ListRequestProps {
  requests: Request[]
  currentPage: number
  totalPages: number
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void
  isLoading: boolean
}

const ListRequest: React.FC<ListRequestProps> = ({
  requests,
  currentPage,
  totalPages,
  onPageChange,
  isLoading
}) => {
  const navigate = useNavigate()

  return (
    <Box p={4}>
      {isLoading
        ? Array.from(new Array(5)).map((_, index) => (
            <Paper
              key={index}
              elevation={1}
              style={{ padding: '16px', marginBottom: '16px' }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8} style={{ textAlign: 'left' }}>
                  <Skeleton variant="text" width="80%" height={30} />
                  <Skeleton variant="text" width="60%" height={20} />
                </Grid>
                <Grid item xs={12} sm={4} style={{ textAlign: 'right' }}>
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton variant="text" width="30%" height={20} />
                </Grid>
              </Grid>
            </Paper>
          ))
        : requests.map((request, index) => (
            <Paper
              key={index}
              elevation={1}
              style={{ padding: '16px', marginBottom: '16px' }}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transition: '0.3s',
                  scale: { x: 1.05, y: 1.05 }
                }
              }}
              component={'div'}
              onClick={() => navigate(`/appraiser/${request.id}`)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8} style={{ textAlign: 'left' }}>
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
                    Mã yêu cầu: <strong>{request.code}</strong> | Thương hiệu
                    đồng hồ: <strong>{request.brand}</strong>
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
                    {getVietnameseStatus(request?.status)}
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
