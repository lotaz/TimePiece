import {
  Box,
  Button,
  Modal,
  Skeleton,
  TextField,
  Typography,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import UserInfo from './components/UserInfo'
import WatchInfo from './components/WatchInfo'
import PaymentMethod from './components/PaymentMethod'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'

const PaymentPage = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState(user?.address)
  const [paymentMethod, setPaymentMethod] = useState('ZaloPay')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }
  const handleAddressSubmit = () => {
    // Logic to save the new address
    handleClose()
  }

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [navigate, user])

  const { data, isLoading } = useSWR(AppPath.USER_INFO(user?.id))
  console.log(data)

  const handleChange = () => {
    handleOpen()
  }

  return (
    <Box maxWidth={1200} marginX={'auto'} width={'inherit'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          marginTop: '100px'
        }}
      >
        {isLoading ? (
          <Skeleton variant="rectangular" height={118} />
        ) : (
          <UserInfo
            name={data?.name}
            phone={data?.phone}
            address={data?.address || address}
            onChange={handleChange}
          />
        )}
      </Box>
      <Box>
        {isLoading ? (
          <Skeleton variant="rectangular" height={118} />
        ) : (
          <WatchInfo
            seller="Hoangnd"
            itemName="Rolex Day Date 36 128235 Ombre Chocolate"
            itemType="Đồng hồ nam"
            itemPrice="1,080,869₫"
            itemLocation="Phường Long Thạnh Mỹ (Quận 9 cũ), Thành phố Thủ Đức, Tp Hồ Chí Minh"
            itemImage="/path/to/item/image.jpg" // Replace with the correct path to the image
          />
        )}
      </Box>
      <Box>
        {isLoading ? (
          <Skeleton variant="rectangular" height={118} />
        ) : (
          <PaymentMethod
            price={100}
            extraPrice={1231231231213}
            paymentMethod={paymentMethod}
            handleChangeMethod={setPaymentMethod}
          />
        )}
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
