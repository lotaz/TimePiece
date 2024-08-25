import React from 'react'
import {
  Box,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup
} from '@mui/material'
import vnpay from '@/assets/vnpaylogo.png'

interface PaymentMethodProps {
  selectedMethod: string
  setSelectedMethod: (method: string) => void
}

const PaymentMethod = ({
  selectedMethod,
  setSelectedMethod
}: PaymentMethodProps) => {
  const paymentMethods = [{ value: 'vnpay', label: 'VNPay', logo: vnpay }]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px 0',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: 18, textAlign: 'left' }}>
        Phương thức thanh toán
      </Typography>
      <RadioGroup
        value={selectedMethod}
        onChange={(e) => setSelectedMethod(e.target.value)}
        sx={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        {paymentMethods.map((method) => (
          <FormControlLabel
            key={method.value}
            value={method.value}
            control={
              <Radio
                sx={{
                  visibility: 'hidden'
                }}
              />
            }
            label={
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px 40px',
                  width: '12vw',
                  height: '12vh',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor:
                    selectedMethod === method.value
                      ? 'primary.main'
                      : 'rgba(0, 0, 0, 0.23)',

                  cursor: 'pointer'
                }}
              >
                <img
                  src={method.logo}
                  alt={method.label}
                  style={{ width: '80px', height: 'auto', marginBottom: 8 }}
                />
              </Box>
            }
          />
        ))}
      </RadioGroup>
    </Box>
  )
}

export default PaymentMethod
