import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'

interface UserInfoProps {
  name: string
  phone: string
  address: string
  onChange: () => void
}

const UserInfo: React.FC<UserInfoProps> = ({
  name,
  phone,
  address,
  onChange
}) => {
  return (
    <Box
      border={1}
      borderColor="grey.300"
      borderRadius={2}
      m={2}
      component={'div'}
    >
      <Box
        component={'div'}
        borderBottom={'1px solid #D0D0D0'}
        textAlign={'left'}
      >
        <Typography
          variant="h6"
          gutterBottom
          margin={2}
          fontWeight={'600'}
          fontSize={'24px'}
          color={'#444444'}
        >
          Thanh toán
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" margin={2}>
        <LocationOnIcon />
        <Typography
          variant="subtitle1"
          color="#000000"
          style={{ marginLeft: 8, fontSize: '22px' }}
        >
          Địa chỉ nhận hàng
        </Typography>
        <Link
          href="#"
          onClick={onChange}
          style={{
            marginLeft: 'auto',
            marginRight: 8,
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          Thay đổi
        </Link>
      </Box>
      <Box display="flex" alignItems="center" m={2}>
        <Typography variant="h6" style={{ marginRight: 8 }}>
          {name}
        </Typography>
        <Typography margin={2} variant="h6">
          {phone}
        </Typography>
        <Typography margin={2} variant="body1">
          {address}
        </Typography>
      </Box>
    </Box>
  )
}

export default UserInfo
