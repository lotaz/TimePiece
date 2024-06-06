import React from 'react'
import { Box, Typography, Link, Avatar } from '@mui/material'

interface WatchInfoProps {
  seller: string
  itemName: string
  itemType: string
  itemPrice: string
  itemLocation: string
  itemImage: string
}

const WatchInfo: React.FC<WatchInfoProps> = ({
  seller,
  itemName,
  itemType,
  itemPrice,
  itemLocation,
  itemImage
}) => {
  return (
    <Box border={1} borderColor="grey.300" borderRadius={2} p={2} m={2}>
      <Typography variant="h6" gutterBottom>
        Sản phẩm
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" style={{ marginRight: 8 }}>
          Người bán: {seller}
        </Typography>
        <Link
          href="#"
          style={{
            marginLeft: 'auto',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="body1" style={{ marginRight: 4 }}>
            Chat ngay
          </Typography>
        </Link>
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <Avatar
          src={itemImage}
          variant="square"
          style={{ width: 60, height: 60, marginRight: 16 }}
        />
        <Box flex={1}>
          <Typography variant="h6">{itemName}</Typography>
          <Typography variant="body2" color="textSecondary">
            {itemLocation}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Typography variant="body2" color="textSecondary">
            Loại
          </Typography>
          <Typography variant="body1">{itemType}</Typography>
          <Typography variant="body2" color="textSecondary" mt={2}>
            Đơn giá
          </Typography>
          <Typography variant="body1">{itemPrice}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default WatchInfo
