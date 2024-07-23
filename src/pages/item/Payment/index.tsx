import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import UserInfo from './components/UserInfo'
import WatchInfo from './components/WatchInfo'
import PaymentMethod from './components/PaymentMethod'
import { useLoaderData, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import { Order } from '../ManageBuyOrder/type'

interface User {
  address: string | null
  avatar: string | null
  birthday: string | null
  citizenID: string | null
  dateCreate: string
  gender: 'male' | 'female' | 'other'
  name: string | null
  phoneNumber: string | null
  status: 'true' | 'false'
}

const PaymentPage = () => {
  const { id } = useLoaderData() as { id: number }
  const navigate = useNavigate()
  const userLocal = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState(userLocal?.address)
  const [paymentMethod, setPaymentMethod] = useState('ZaloPay')
  const [user, setUser] = useState<User>()
  const [order, setOrder] = useState<Order>()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }
  const handleAddressSubmit = () => {
    handleClose()
  }

  useEffect(() => {
    if (!userLocal) {
      navigate('/')
    }
  }, [navigate, userLocal])

  const { data: userInfo, isLoading: isUserInfoLoading } = useSWR(
    userLocal ? AppPath.USER_INFO(userLocal?.id) : null
  )
  const { data: orderInfo, isLoading: isOrderInfoLoading } = useSWR(
    AppPath.GET_ORDER(id)
  )

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo)
    }

    if (orderInfo) {
      setOrder(orderInfo)
    }
  }, [orderInfo, userInfo])

  const handleChange = () => {
    handleOpen()
  }

  const isLoading = isUserInfoLoading || isOrderInfoLoading

  console.log('order', order)

  return (
    <Box maxWidth={1200} marginX={'auto'} width={'inherit'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          marginTop: '80px'
        }}
      >
        <UserInfo
          name={user?.name ?? ''}
          phone={user?.phoneNumber ?? ''}
          address={user?.address ?? address}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <WatchInfo
          seller={order?.seller.name}
          itemName={order?.watch.name}
          itemType={order?.watch.type ?? ''}
          itemPrice={order?.watch?.price?.toString()}
          itemLocation={order?.watch.address}
          itemImage={order?.watch.imageUrl}
          isLoading={isLoading}
        />
      </Box>
      <Box>
        <PaymentMethod
          price={100}
          extraPrice={1231231231213}
          paymentMethod={paymentMethod}
          handleChangeMethod={setPaymentMethod}
        />
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Typography variant="h6" component="h2">
              Thay đổi địa chỉ
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            fullWidth
            margin="normal"
            label="Địa chỉ mới"
            value={address}
            onChange={handleAddressChange}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '16px'
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddressSubmit}
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default PaymentPage
