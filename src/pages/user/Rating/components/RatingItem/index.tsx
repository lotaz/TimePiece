import React from 'react'
import { Box, Typography, Avatar, Rating, Grid, Skeleton } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import moment from 'moment'

interface RatingItemProps {
  name?: string
  rating?: number
  reviewDate?: string | null
  reviewText?: string
  productImage?: string
  productName?: string
  productPrice?: number
  loading?: boolean
}

const RatingItem: React.FC<RatingItemProps> = ({
  name,
  rating,
  reviewDate,
  reviewText,
  productImage,
  productName,
  productPrice,
  loading = false
}) => {
  const getRelativeDate = (date: string | null | undefined) => {
    if (!date) return ''
    const daysAgo = moment().diff(moment(date), 'days')
    if (daysAgo === 0) return 'Hôm nay'
    if (daysAgo === 1) return '1 ngày trước'
    return `${daysAgo} ngày trước`
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: 2,
        padding: 2,
        textAlign: 'left',
        width: '60vw',
        border: '1px solid #e0e0e0'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          flexDirection: 'column'
        }}
      >
        <Box>
          {loading ? (
            <Skeleton variant="text" width={100} height={28} sx={{ mr: 1 }} />
          ) : (
            <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 1 }}>
              {name}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          {loading ? (
            <Skeleton variant="rectangular" width={100} height={28} />
          ) : (
            <Rating
              name="read-only"
              value={rating}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          )}
          {loading ? (
            <Skeleton variant="text" width={80} height={20} sx={{ ml: 1 }} />
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
              {getRelativeDate(reviewDate)}
            </Typography>
          )}
        </Box>
      </Box>
      {loading ? (
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
      ) : (
        <Typography variant="body2" sx={{ mb: 1 }}>
          {reviewText}
        </Typography>
      )}
      <Grid container alignItems="center">
        <Grid item>
          {loading ? (
            <Skeleton
              variant="rectangular"
              width={60}
              height={60}
              sx={{ mr: 2 }}
            />
          ) : (
            <Avatar
              variant="square"
              src={productImage}
              sx={{ width: 60, height: 60, mr: 2 }}
            />
          )}
        </Grid>
        <Grid item>
          {loading ? (
            <Skeleton variant="text" width={100} height={20} />
          ) : (
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {productName}
            </Typography>
          )}
          {loading ? (
            <Skeleton variant="text" width={80} height={20} sx={{ mt: 1 }} />
          ) : (
            <Typography
              variant="body1"
              color="error"
              sx={{ fontWeight: 'bold' }}
            >
              {productPrice}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default RatingItem
