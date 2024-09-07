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
import { updateOrder } from '@/services/orderService'
import { toast } from 'react-toastify'
import { OrderStatus } from '@/common/type'
import { Order } from '../../type'
import { AppPath } from '@/services/utils'
import { mutate } from 'swr'

interface OrderProps {
  data: Order[]
  isLoading: boolean
  userId: number
}

export const displayOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.WAIT:
      return 'Đợi duyệt'
    case OrderStatus.APPROVED:
      return 'Đã duyệt'
    case OrderStatus.CANCELED:
      return 'Đã huỷ'
    case OrderStatus.DIRECT_PAYMENT:
      return 'Thanh toán trực tiếp'
    case OrderStatus.PAYMENT_SUCCESS:
      return 'Thanh toán thành công'
    case OrderStatus.COMPLETE:
      return 'Hoàn thành'
    default:
      return ''
  }
}


const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  minWidth: '80px'
}))

const ITEMS_PER_PAGE = 4

const OrderItem: FC<OrderProps> = ({ data, isLoading, userId }) => {
  const navigate = useNavigate()
  const [dialogState, setDialogState] = useState<{
    type: 'approve' | 'cancel' | ''
    orderId: number | null
  }>({ type: '', orderId: null })

  const [page, setPage] = useState(1)
  const [submitting, setSubmitting] = useState(false)

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

  const handleOrderAction = async (orderId: number, status: OrderStatus) => {
    setSubmitting(true)
    try {
      await updateOrder(orderId, status)
      toast.success(
        status === OrderStatus.CANCELED
          ? 'Huỷ đơn thành công'
          : 'Duyệt đơn thành công'
      )
      setDialogState({ type: '', orderId: null })
      mutate(AppPath.GET_BUYER_ORDERS(userId))
    } catch (error) {
      toast.error('Thực hiện thất bại')
    } finally {
      setSubmitting(false)
    }
  }

  const renderSkeletons = () => (
    <Grid container spacing={2}>
      {Array.from(new Array(ITEMS_PER_PAGE)).map((_, index) => (
        <Grid item xs={12} key={`skeleton-${index}`}>
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

  return (
    <Box>
      {isLoading ? (
        renderSkeletons()
      ) : (
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
                  onClick={() => navigate(`/item/${item.watch.id}`)}
                  image={item.watch.imageUrl}
                  alt={item.watch.name}
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
                      {item.watch.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ fontWeight: 'bold', color: 'red' }}
                    >
                      {item.totalPrice.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      })}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="div"
                    >
                      {item.seller.address}
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
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      textAlign: 'right'
                    }}
                  >
                    {displayOrderStatus(item.status as OrderStatus)}
                  </Typography>
                  {item.status === OrderStatus.APPROVED && (
                    <StyledButton
                      variant="contained"
                      color="success"
                      onClick={() => navigate(`/item/${item.id}/payment`)}
                    >
                      Tiến hành thanh toán
                    </StyledButton>
                  )}
                  {item.status === OrderStatus.WAIT && (
                    <Box>
                      <StyledButton
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          setDialogState({ type: 'cancel', orderId: item.id })
                        }
                        disabled={submitting}
                      >
                        Từ chối
                      </StyledButton>
                      <StyledButton
                        variant="contained"
                        color="success"
                        onClick={() =>
                          setDialogState({ type: 'approve', orderId: item.id })
                        }
                        disabled={submitting}
                      >
                        Duyệt
                      </StyledButton>
                    </Box>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={Math.ceil(data.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <ConfirmDialog
        open={dialogState.type === 'approve'}
        onClose={() => setDialogState({ type: '', orderId: null })}
        onConfirm={() =>
          handleOrderAction(dialogState.orderId!, OrderStatus.APPROVED)
        }
        title="Xác nhận duyệt đơn"
        description="Bạn có chắc chắn muốn duyệt đơn mua này?"
        isLoading={submitting}
      />
      <ConfirmDialog
        open={dialogState.type === 'cancel'}
        onClose={() => setDialogState({ type: '', orderId: null })}
        onConfirm={() =>
          handleOrderAction(dialogState.orderId!, OrderStatus.CANCELED)
        }
        title="Xác nhận huỷ đơn"
        description="Bạn có muốn hủy đơn này?"
        isLoading={submitting}
      />
    </Box>
  )
}

export default OrderItem
