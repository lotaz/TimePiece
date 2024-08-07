import { Seller } from '@/pages/item/SellerProfile'
import { AppPath } from '@/services/utils'
import { Avatar, Box, Typography, Skeleton } from '@mui/material'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

const SellerInfo = ({ sellerId }) => {
  const [seller, setSeller] = useState<Seller>()

  const { data, isLoading: loadingUser } = useSWR(AppPath.USER_INFO(sellerId))

  useEffect(() => {
    if (data) {
      setSeller(data)
    }
  }, [data])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1vw',
        padding: '2vw',
        paddingX: '4vw',
        backgroundColor: 'white',
        height: 'fit-content',
        width: '64vw',
        borderRadius: '10px',
        marginBottom: '2vw',
        marginTop: '2vw'
      }}
    >
      {loadingUser ? (
        <Skeleton variant="circular" width={70} height={70} />
      ) : (
        <Avatar src={seller?.avatar} sx={{ width: '70px', height: '70px' }} />
      )}
      <Box>
        {loadingUser ? (
          <>
            <Skeleton variant="text" width={140} height={30} />
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={60} height={20} />
          </>
        ) : (
          <>
            <Typography
              sx={{
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              {seller?.name}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              textAlign={'left'}
              marginRight={2}
            >
              <Box component="span" sx={{ color: 'gold' }}>
                {'★'.repeat(Math.floor(seller?.ratingScore || 0)) +
                  '☆'.repeat(5 - Math.floor(seller?.ratingScore || 0))}
              </Box>
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign={'left'}
            >
              {seller?.feedbacks || 0} đánh giá
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}

export default SellerInfo
