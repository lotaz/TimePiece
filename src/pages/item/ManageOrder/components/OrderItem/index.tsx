import React, { FC, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Skeleton
} from '@mui/material'
import { styled } from '@mui/material/styles'
import ConfirmDialog from '@/components/ConfirmDiaglog'
import { useNavigate } from 'react-router-dom'
import { Order } from '../ManageOrderTab'

interface OrderProps {
  data: Order[]
  isLoading: boolean
}

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  minWidth: '80px'
}))

const OrderItem: FC<OrderProps> = ({ data, isLoading }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [cancel, setCancel] = useState(false)

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {Array.from(new Array(5)).map((_, index) => (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                marginBottom: 2,
                backgroundColor: '#f5f5f5',
                borderRadius: 1
              }}
            >
              <Skeleton variant="rectangular" width={100} height={100} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  ml: 2
                }}
              >
                <CardContent
                  sx={{
                    flex: '1 0 auto',
                    padding: '0 !important',
                    textAlign: 'left'
                  }}
                >
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                  <Skeleton width="80%" />
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} key={item.id}>
          <Card
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 2,
              marginBottom: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 1
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 100, height: 100, borderRadius: 1 }}
              image={item?.watchImages[0] ?? ''}
              alt={item.watchName}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                ml: 2
              }}
            >
              <CardContent
                sx={{
                  flex: '1 0 auto',
                  padding: '0 !important',
                  textAlign: 'left'
                }}
              >
                <Typography
                  component="div"
                  variant="h6"
                  sx={{ fontWeight: 'bold' }}
                >
                  {item.watchName}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ fontWeight: 'bold', color: 'red' }}
                >
                  {item.totalPrice}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="div"
                >
                  {item.orderDate}
                </Typography>
              </CardContent>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                mr: 2
              }}
            >
              <Box component={'div'}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    mr: 2,
                    fontWeight: 'bold',
                    fontSize: '16px',
                    textAlign: 'right'
                  }}
                >
                  {item.status === 'wait' ? 'Đợi duyệt' : 'Đã duyệt'}
                </Typography>
              </Box>
              <Box component={'div'}>
                <StyledButton
                  variant="outlined"
                  color="error"
                  onClick={() => setCancel(true)}
                >
                  Từ chối
                </StyledButton>
                <StyledButton
                  variant="contained"
                  color="success"
                  onClick={() => setOpen(true)}
                >
                  Duyệt
                </StyledButton>
              </Box>
              <ConfirmDialog
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={() => navigate('/item/payment')}
                title={'Xác nhận duyệt đơn'}
                description={'Bạn có chắc chắn muốn duyệt đơn mua này ?'}
              />
              <ConfirmDialog
                open={cancel}
                onClose={() => setCancel(false)}
                onConfirm={() => console.log('Order cancelled')} // Replace with actual cancel logic
                title={'Xác nhận huỷ đơn'}
                description={'Bạn có muốn hủy đơn này ?'}
              />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default OrderItem
