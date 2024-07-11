import { Box, Typography, Grid, Button, Avatar, Link } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import ChatIcon from '@mui/icons-material/Chat'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Role } from '@/common/type'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { createOrder } from '@/services/orderService'
import { useState } from 'react'
import ConfirmDialog from '@/components/ConfirmDiaglog'
import { toast } from 'react-toastify'

interface ItemDetailUserProps {
  role?: string
}

const ItemDetailUser = ({ role = Role.BUYER }: ItemDetailUserProps) => {
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  const [isOpen, setIsOpen] = useState(false)
  const data = useLoaderData()
  const { id } = data as { id: string }

  const handleCreateOrder = async () => {
    const res = await createOrder({ watchId: Number(id), userId: user.id })
    if (res) {
      setIsOpen(false)
      toast.success('Đặt hàng thành công', {
        onClose() {
          navigate('/')
        }
      })
    }
  }
  return (
    <Box sx={{ padding: 2 }} component={'div'} id={`${id}`}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Avatar
            alt="Thắng Nguyễn Store"
            src="https://via.placeholder.com/100" // Replace with actual image URL
            sx={{ width: 80, height: 80 }}
          />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h6" fontWeight="bold">
            Thắng Nguyễn Store
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <Box component="span" sx={{ color: 'gold' }}>
              ★★★★☆
            </Box>
            4.7 (
            <Link href="#" underline="hover">
              10 đánh giá
            </Link>
            )
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Button variant="outlined" fullWidth startIcon={<PhoneIcon />}>
            0987654321
          </Button>
        </Grid>
        <Grid item xs={7}>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              textTransform: 'none',
              fontSize: '14px',
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
            startIcon={<ChatIcon />}
          >
            Chat với người bán
          </Button>
        </Grid>
        <Grid item xs={12}>
          {role === Role.BUYER ? (
            <>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setIsOpen(true)}
                sx={{
                  textTransform: 'none',
                  fontSize: '14px',
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}
              >
                Đặt hàng
              </Button>
              <ConfirmDialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={handleCreateOrder}
                title={'Xác nhận đặt hàng'}
                description={
                  'Bạn có chắc chắn muốn đặt hàng sản phẩm này không?'
                }
              />
            </>
          ) : (
            <Button
              variant="outlined"
              fullWidth
              sx={{
                textTransform: 'none',
                fontSize: '14px',
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              <VisibilityOffIcon sx={{ marginRight: 1 }} />
              Đã bán/ Ẩn tin
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ItemDetailUser
