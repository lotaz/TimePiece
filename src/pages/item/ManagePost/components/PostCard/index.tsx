import React, { useState } from 'react'
import { Typography, Box, Button, Skeleton } from '@mui/material'
import ArrowCircleUpSharpIcon from '@mui/icons-material/ArrowCircleUpSharp'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import PostMenu from '../PostMenu'
import { changeStatusWatchService } from '@/services/watchService'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import { AppPath } from '@/services/utils'
import { Product } from '../..'

interface PostCardProps {
  postId: number
  imageUrl: string
  name: string
  price: number
  address: string
  typePost: string
  numberDatePost: number
  createDate?: string
  isLoading?: boolean
  mutate?: (key?: string) => void
  product: Product
}

const ProductCard: React.FC<PostCardProps> = ({
  postId,
  imageUrl,
  name,
  price,
  address,
  createDate,
  typePost,
  numberDatePost,
  isLoading,
  product
}) => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null
  const handleEdit = () => {
    console.log('Edit post clicked')
    // Add your edit functionality here
  }

  const handleDelete = async () => {
    setIsSubmitting(true)
    try {
      await changeStatusWatchService(postId, 'DELETED')
      toast.success('Xoá thành công')
      mutate(AppPath.GET_WATCH_BY_USER(user.id))
    } catch (error) {
      toast.error('Xoá thất bại')
    } finally {
      setIsSubmitting(false)
    }
  }

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
        <Box>
          <img src={imageUrl} alt={name} width={80} height={80} />
        </Box>

        <Box textAlign={'left'} paddingX={4}>
          <>
            <Typography
              sx={{
                fontSize: '16px'
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
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
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
          bgcolor: '#F7F7F7',
          textAlign: 'left'
        }}
      >
        <Box
          sx={{
            width: '30%',
            borderRight: '1px solid #c1c1c1',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography
            component={'div'}
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              marginLeft: '30px',
              p: '10px 40px',
              backgroundColor: '#fbdd8a',
              borderRadius: '20px'
            }}
          >
            {typePost}
          </Typography>
        </Box>
        <Box
          sx={{
            width: '30%',
            borderRight: '1px solid #c1c1c1',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography
            component={'div'}
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              p: '10px 40px',
              backgroundColor: '#8ac4fb',
              borderRadius: '20px'
            }}
          >
            Ngày buff {numberDatePost} ngày
          </Typography>
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
          padding: '10px',
          bg: '#FFFFFF',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: '#1BBE00',
            color: '#FFFFFF',
            ':hover': {
              color: '#000',
              bgcolor: '#1BBE00'
            },
            textTransform: 'none',
            marginRight: '10px',
            height: '40px'
          }}
          disabled={isLoading}
          onClick={() => navigate(`/post/renew-package/${postId}`)}
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
            border: '1px solid #c1c1c1',
            height: '40px',
            ':hover': {
              border: '1px solid #c1c1c1',
              bgcolor: '#F7F7F7'
            }
          }}
          disabled={isLoading}
        >
          <PostMenu
            key={postId}
            onEdit={handleEdit}
            onDelete={handleDelete}
            product={product}
          />
        </Button>
      </Box>
    </Box>
  )
}

export default ProductCard
