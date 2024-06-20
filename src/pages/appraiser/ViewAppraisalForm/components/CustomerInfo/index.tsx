import { Box, Typography } from '@mui/material'

const CustomerInfo = ({ name, email, brand, phone, referenceNumber }) => {
  return (
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
        <Typography variant="body2">
          Email: <strong>{email}</strong>
        </Typography>
        <Typography variant="body2">
          Thương hiệu đồng hồ: <strong>{brand}</strong>
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2">
          Số điện thoại: <strong>{phone}</strong>
        </Typography>
        <Typography variant="body2">
          Số tham chiếu: <strong>{referenceNumber}</strong>
        </Typography>
      </Box>
    </Box>
  )
}

export default CustomerInfo
