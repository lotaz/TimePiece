import React, { FC, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Pagination
} from '@mui/material'
import { styled } from '@mui/material/styles'
import ConfirmDialog from '@/components/ConfirmDiaglog'
import { useNavigate } from 'react-router-dom'
import { Order } from '../ManageOrderTab'
import { updateOrder } from '@/services/orderService'
import { toast } from 'react-toastify'
import { OrderStatus, Role } from '@/common/type'

interface OrderProps {
  data: Order[]
  isLoading: boolean
}

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  minWidth: '80px'
}))

const ITEMS_PER_PAGE = 4

const OrderItem: FC<OrderProps> = ({ data, isLoading }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [cancel, setCancel] = useState(false)
  const [page, setPage] = useState(1)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  const paginatedData = data.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {Array.from(new Array(ITEMS_PER_PAGE)).map((_, index) => (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                marginBottom: 1,
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

  const handleOrderAction = async (orderId: number, status) => {
    const data = await updateOrder(orderId, status)
    if (data) {
      toast.success('Duyệt đơn thành công')
      setOpen(false)
    }
  }

  console.log(data)

  return (
    <Box>
      <Grid container spacing={1}>
        {paginatedData.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                marginBottom: 1,
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
                    {}
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
                {item.role === Role.SELLER &&
                  item.status === OrderStatus.WAIT && (
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
                  )}
                {item.role === Role.BUYER &&
                  item.status === OrderStatus.APPROVED && (
                    <Box component={'div'}>
                      <StyledButton
                        variant="contained"
                        color="success"
                        onClick={() => {
                          navigate(`/item/${item.id}/payment`)
                        }}
                      >
                        Tiến hành thanh toán
                      </StyledButton>
                    </Box>
                  )}
                <ConfirmDialog
                  open={open}
                  onClose={() => setOpen(false)}
                  onConfirm={() =>
                    handleOrderAction(item.id, OrderStatus.APPROVED)
                  } // Replace with actual approve logic
                  title={'Xác nhận duyệt đơn'}
                  description={'Bạn có chắc chắn muốn duyệt đơn mua này ?'}
                />
                <ConfirmDialog
                  open={cancel}
                  onClose={() => setCancel(false)}
                  onConfirm={() =>
                    handleOrderAction(item.id, OrderStatus.CANCELED)
                  } // Replace with actual cancel logic
                  title={'Xác nhận huỷ đơn'}
                  description={'Bạn có muốn hủy đơn này ?'}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 2
        }}
      >
        <Pagination
          count={Math.ceil(data.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  )
}

export default OrderItem
