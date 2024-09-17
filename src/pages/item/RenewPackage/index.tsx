import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useLoaderData, useNavigate } from 'react-router-dom'
import WatchInfo from './components/WatchInfo'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import { Order } from '../ManageBuyOrder/type'
import PaymentMethod from './components/PaymentMethod'
import RenewPackage, { IRenewPackage } from './components/RenewPackage'
import { paymentPostWatch } from '@/services/paymentService'

const RenewPackagePage = () => {
  const { id } = useLoaderData() as { id: number }
  const navigate = useNavigate()
  const userLocal = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  useEffect(() => {
    if (!userLocal) {
      navigate('/login')
    }
  }, [userLocal, navigate])

  const [order, setOrder] = useState<Order>()
  const [selectedMethod, setSelectedMethod] = useState('')
  const [selectedPackage, setSelectedPackage] = useState<IRenewPackage | null>(
    null
  )
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)

  const { isLoading } = useSWR(AppPath.GET_ORDER(id), {
    onSuccess: (data) => {
      setOrder(data)
    }
  })

  useEffect(() => {
    if (selectedPackage && selectedMethod === 'vnpay') {
      setTotalPrice(
        Number(selectedPackage.price) * 0.05 + Number(selectedPackage.price)
      )
    } else {
      setTotalPrice(Number(selectedPackage?.price || 0))
    }
  }, [selectedMethod, selectedPackage])

  const handlePayment = async () => {
    try {
      setLoading(true)
      const data = await paymentPostWatch({
        watchId: order?.watch.id,
        renewalPackageId: selectedPackage?.id
      })

      if (data) {
        setLoading(false)
        const paymentLink = data.paymentUrl
        window.location.href = paymentLink
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <Box
      component={'div'}
      sx={{
        marginX: 10,
        marginTop: 12,
        marginBottom: 4,
        mx: 'auto',
        gap: '4vw',
        minHeight: 'calc(100vh - 340px)'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: 'calc(100vw - 20vw)',
          paddingX: '40px',
          bgcolor: '#FFFFFF'
        }}
      >
        <Box
          sx={{
            textAlign: 'left',
            padding: '10px 0',
            borderBottom: '1px solid #e0e0e0'
          }}
        >
          <Typography variant={'h6'} sx={{ fontWeight: 600 }}>
            Thanh toán gia hạn tin tăng
          </Typography>
        </Box>
        <WatchInfo
          image={order?.watch.imageUrl}
          name={order?.watch.name}
          price={order?.watch.price}
          address={order?.watch.address}
          loading={isLoading && !order}
        />
        <RenewPackage
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
        />
        <PaymentMethod
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            borderBottom: '1px solid #e0e0e0'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px 0',
              width: '30vw'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                padding: '10px 0',
                flexDirection: 'row'
              }}
            >
              <Typography sx={{ fontSize: '20px', mr: 2, color: '#9A9A9A' }}>
                Tổng tiền:
              </Typography>
              <Typography sx={{ fontSize: '20px' }}>
                {selectedPackage
                  ? Number(selectedPackage.price).toLocaleString()
                  : '0'}
                đ
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                padding: '10px 0',
                flexDirection: 'row'
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  mr: 2,
                  color: '#9A9A9A'
                }}
              >
                Tổng thanh toán:
              </Typography>
              <Typography sx={{ fontSize: '20px' }}>
                {totalPrice.toLocaleString()}đ
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '20px 0'
          }}
        >
          <Button
            variant="outlined"
            sx={{
              px: 2,
              py: 1,
              mr: 2
            }}
          >
            Huỷ
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handlePayment}
            disabled={!selectedPackage || !selectedMethod || loading}
            startIcon={loading && <CircularProgress size={14} />}
            sx={{
              px: 4,
              py: 1
            }}
          >
            Thanh toán
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default RenewPackagePage
