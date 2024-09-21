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
          paddingY: 1,
          textAlign: 'left',
          borderRadius: 1
        }}
      >
        <Box>
          <Typography>
            <strong>Người yêu cầu</strong>: {name}
          </Typography>
          <Typography marginTop={2}>
            <strong>Email</strong>: {email}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ marginRight: 20 }}>
            <strong>Số điện thoại</strong>: {phone}
          </Typography>
        </Box>
      </Box>
      {/* <Box>
        <Typography>
          <strong>Địa chỉ</strong>: {address}
        </Typography>
      </Box> */}
    </Box>
  )
}

export default CustomerInfo
