import React, { useState } from 'react'
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Stack,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { deposit } from '@/services/paymentService'
import { toast } from 'react-toastify'

interface DepositModalProps {
  open: boolean
  onClose: () => void
  userId: number
}

const DepositModal: React.FC<DepositModalProps> = ({
  open,
  onClose,
  userId
}) => {
  const [amount, setAmount] = useState<number | string>('')

  const handleSelectAmount = (value: number) => {
    setAmount(value)
  }

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }

  const handleDeposit = async () => {
    try {
      const data = await deposit(amount, userId)
      if (data) {
        const paymentLink = data.paymentUrl
        window.location.href = paymentLink
        onClose()
      }
    } catch (error) {
      console.error(error)
      toast.error('Nạp tiền thất bại. Vui lòng thử lại sau')
    } finally {
      setAmount('')
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 400,
          maxWidth: '90%'
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
          <Typography variant="h6">Nhập số tiền cần nạp</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Vui lòng sử dụng VN Pay để thanh toán
        </Typography>
        <Stack spacing={2}>
          <TextField
            type="number"
            label="Số tiền cần nạp"
            value={amount}
            onChange={handleChangeAmount}
            fullWidth
            InputProps={{
              endAdornment: <Typography>VND</Typography>
            }}
          />
          <Stack direction="row" spacing={1}>
            {[50000, 100000, 200000].map((value) => (
              <Button
                key={value}
                variant={amount === value ? 'contained' : 'outlined'}
                onClick={() => handleSelectAmount(value)}
              >
                {value.toLocaleString()} VND
              </Button>
            ))}
          </Stack>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeposit}
            disabled={!amount || Number(amount) <= 0}
          >
            Nạp tiền
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default DepositModal
