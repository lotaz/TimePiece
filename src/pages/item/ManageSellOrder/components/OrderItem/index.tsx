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
import { updateOrder } from '@/services/orderService'
import { toast } from 'react-toastify'
import { OrderStatus } from '@/common/type'
import { Order } from '@/pages/item/ManageBuyOrder/type'
import { displayOrderStatus } from '@/pages/item/ManageBuyOrder/components/OrderItem'
import { mutate } from 'swr'
import { AppPath } from '@/services/utils'

interface OrderProps {
  data: Order[]
  isLoading: boolean
  userId: number
}

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  minWidth: '70px',
  textTransform: 'none'
}))

const ITEMS_PER_PAGE = 4

const OrderItem: FC<OrderProps> = ({ data, isLoading, userId }) => {
  const [openDialog, setOpenDialog] = useState<{
    type: string
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
        status === OrderStatus.COMPLETE
          ? 'Đã hoàn thành đơn hàng'
          : 'Thực hiện thành công'
      )
      setOpenDialog({ type: '', orderId: null })
      mutate(AppPath.GET_SELLER_ORDERS(userId))
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
                  alignItems: 'flex-start',
                  padding: 2,
                  justifyContent: 'space-between',
                  marginBottom: 1,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100, borderRadius: 1, ml: 2 }}
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
                      display: 'flex',
                      textAlign: 'left',
                      flexDirection: 'row',
                      width: 'fit-content'
                    }}
                  >
                    <Box>
                      <Typography component="div" sx={{ fontWeight: 'bold' }}>
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
                        Người mua: {item.buyer.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="div"
                      >
                        {item.seller.address}
                      </Typography>
                    </Box>
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
                      fontSize: '14px',
                      textAlign: 'right',
                      marginBottom: 1
                    }}
                  >
                    {displayOrderStatus(item.status as OrderStatus)}
                  </Typography>
                  {item.status === OrderStatus.WAIT && (
                    <Box>
                      <StyledButton
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          setOpenDialog({ type: 'cancel', orderId: item.id })
                        }
                        disabled={submitting}
                      >
                        Từ chối
                      </StyledButton>
                      <StyledButton
                        variant="contained"
                        color="success"
                        onClick={() =>
                          setOpenDialog({ type: 'approve', orderId: item.id })
                        }
                        disabled={submitting}
                      >
                        Duyệt
                      </StyledButton>
                    </Box>
                  )}
                  {item.status === OrderStatus.DIRECT_PAYMENT ||
                    (item.status === OrderStatus.PAYMENT_SUCCESS && (
                      <StyledButton
                        variant="contained"
                        color="success"
                        onClick={() =>
                          setOpenDialog({ type: 'delivered', orderId: item.id })
                        }
                        disabled={submitting}
                      >
                        Đã giao hàng
                      </StyledButton>
                    ))}
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
        open={openDialog.type === 'approve'}
        onClose={() => setOpenDialog({ type: '', orderId: null })}
        onConfirm={() =>
          handleOrderAction(openDialog.orderId!, OrderStatus.APPROVED)
        }
        title="Xác nhận duyệt đơn"
        description="Bạn có chắc chắn muốn duyệt đơn mua này?"
        isLoading={submitting}
      />
      <ConfirmDialog
        open={openDialog.type === 'cancel'}
        onClose={() => setOpenDialog({ type: '', orderId: null })}
        onConfirm={() =>
          handleOrderAction(openDialog.orderId!, OrderStatus.CANCELED)
        }
        title="Xác nhận huỷ đơn"
        description="Bạn có muốn hủy đơn này?"
        isLoading={submitting}
      />
      <ConfirmDialog
        open={openDialog.type === 'complete'}
        onClose={() => setOpenDialog({ type: '', orderId: null })}
        onConfirm={() =>
          handleOrderAction(openDialog.orderId!, OrderStatus.COMPLETE)
        }
        title="Xác nhận hoàn thành đơn"
        description="Bạn có muốn hoàn thành đơn này?"
        isLoading={submitting}
      />
      <ConfirmDialog
        open={openDialog.type === 'delivered'}
        onClose={() => setOpenDialog({ type: '', orderId: null })}
        onConfirm={() =>
          handleOrderAction(openDialog.orderId!, OrderStatus.DELIVERED)
        }
        title="Xác nhận gởi hàng thành công"
        description="Bạn có muốn xác nhận gởi đơn hàng này?"
        isLoading={submitting}
      />
    </Box>
  )
}

export default OrderItem
