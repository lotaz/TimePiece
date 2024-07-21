import React from 'react'
import { Typography, Box, Button, Skeleton } from '@mui/material'
import ReplaySharpIcon from '@mui/icons-material/ReplaySharp'
import ArrowCircleUpSharpIcon from '@mui/icons-material/ArrowCircleUpSharp'
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp'
import moment from 'moment'

interface PostCardProps {
  imageUrl: string
  name: string
  price: number
  address: string
  typePost: string
  numberDatePost: number
  createDate?: string
  isLoading?: boolean
  mutate?: (key?: string) => void
}

const ProductCard: React.FC<PostCardProps> = ({
  imageUrl,
  name,
  price,
  address,
  createDate,
  typePost,
  numberDatePost,
  isLoading
}) => {
  return (
    <Box bgcolor={'#FFFFFF'} border={'1px solid #D8D8D8'} marginBottom={2}>
      {/* <Box
        component={'div'}
        sx={{
          display: 'flex',
          backgroundColor: `${AlertPostMessage.sucess.color}`,
          padding: '10px 20px'
        }}
      >
        <CheckCircleSharpIcon
          sx={{
            color: '#3CCC04'
          }}
        />
        <Typography
          marginLeft={2}
          sx={{
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          {AlertPostMessage.sucess.message}
        </Typography>
      </Box> */}
      <Box
        display={'flex'}
        sx={{
          padding: '20px'
        }}
      >
        {isLoading ? (
          <Skeleton variant="rectangular" width={100} height={100} />
        ) : (
          <Box>
            <img src={imageUrl} alt={name} width={100} height={100} />
          </Box>
        )}
        <Box textAlign={'left'} paddingX={4}>
          {isLoading ? (
            <>
              <Skeleton width="80%" />
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </>
          ) : (
            <>
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 600
                }}
              >
                {name}
              </Typography>
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#CA2C2C'
                }}
              >
                {price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                })}
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px'
                }}
              >
                {address}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          bgcolor: '#F7F7F7',
          textAlign: 'left',
          paddingX: '40px'
        }}
      >
        <Box
          sx={{
            width: '30%',
            borderRight: '1px solid #c1c1c1'
          }}
        >
          <Typography>Phương thức đăng tin</Typography>
          {isLoading ? (
            <Skeleton width="80%" />
          ) : (
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              {typePost}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: '30%',
            borderRight: '1px solid #c1c1c1'
          }}
        >
          <Typography>Số ngày đăng tin</Typography>
          {isLoading ? (
            <Skeleton width="80%" />
          ) : (
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              {numberDatePost} ngày
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: '33%'
          }}
        >
          <Typography>Thời gian đăng tin</Typography>
          {isLoading ? (
            <Skeleton width="80%" />
          ) : (
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              {moment(createDate).format('DD/MM/YYYY')}
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          padding: '20px',
          bg: '#FFFFFF',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          sx={{
            border: '1px solid #c1c1c1',
            fontWeight: 600,
            color: '#000',
            marginRight: '10px',
            textTransform: 'none',
            ':hover': {
              color: '#000',
              bgcolor: 'transparent'
            }
          }}
          disabled={isLoading}
        >
          <ReplaySharpIcon sx={{ marginRight: '5px' }} /> Gia Hạn Tin
        </Button>
        <Button
          sx={{
            bgcolor: '#1BBE00',
            color: '#FFFFFF',
            ':hover': {
              color: '#000',
              bgcolor: '#1BBE00'
            },
            textTransform: 'none',
            marginRight: '10px'
          }}
          disabled={isLoading}
        >
          <ArrowCircleUpSharpIcon
            sx={{
              marginRight: '5px'
            }}
          />
          Đẩy tin
        </Button>
        <Button
          sx={{
            border: '1px solid #c1c1c1'
          }}
          disabled={isLoading}
        >
          <MoreHorizSharpIcon />
        </Button>
      </Box>
    </Box>
  )
}

export default ProductCard
