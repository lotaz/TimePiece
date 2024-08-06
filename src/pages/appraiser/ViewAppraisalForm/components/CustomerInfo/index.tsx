import { Box, Typography } from '@mui/material'

const CustomerInfo = ({ name, email, phone, address }) => {
  return (
    <Box
      sx={{
        textAlign: 'left',
        marginLeft: 6
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
          <Typography>
            Người yêu cầu: <strong>{name}</strong>
          </Typography>
          <Typography marginTop={2}>
            Email: <strong>{email}</strong>
          </Typography>
        </Box>
        <Box>
          <Typography>
            Số điện thoại: <strong>{phone}</strong>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginLeft: 2 }}>
        <Typography sx={{ marginLeft: 6 }}>
          Địa chỉ: <strong>{address}</strong>
        </Typography>
      </Box>
    </Box>
  )
}

export default CustomerInfo
