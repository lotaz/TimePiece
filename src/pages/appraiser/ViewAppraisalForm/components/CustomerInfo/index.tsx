import { Box, Typography } from '@mui/material'

const CustomerInfo = ({ name, email, phone, address }) => {
  return (
    <Box
      sx={{
        textAlign: 'left'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 2,
          marginX: 6,
          textAlign: 'left',
          borderRadius: 1
        }}
      >
        <Box>
          <Typography variant="body2">
            Người yêu cầu: <strong>{name}</strong>
          </Typography>
          <Typography variant="body2" marginTop={2}>
            Email: <strong>{email}</strong>
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">
            Số điện thoại:{' '}
            <strong>{phone ? phone : '1123123123232132123'}</strong>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginLeft: 2 }}>
        <Typography variant="body2" sx={{ marginLeft: 6 }}>
          Địa chỉ: <strong>{address}</strong>
        </Typography>
      </Box>
    </Box>
  )
}

export default CustomerInfo
