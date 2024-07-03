import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia
} from '@mui/material'
import { styled } from '@mui/material/styles'
import ConfirmDialog from '@/components/ConfirmDiaglog'

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  minWidth: '80px'
}))

const OrderItem = ({ item }) => {
  const [open, setOpen] = useState(false)
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        marginBottom: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 1
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, borderRadius: 1 }}
        image={item.image}
        alt={item.title}
      />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, ml: 2 }}
      >
        <CardContent
          sx={{ flex: '1 0 auto', padding: '0 !important', textAlign: 'left' }}
        >
          <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
            {item.title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ fontWeight: 'bold', color: 'red' }}
          >
            {item.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            {item.address}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',

          gap: 4,
          mr: 2
        }}
      >
        <Box component={'div'}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              mr: 2,
              fontWeight: 'bold',
              fontSize: '16px',
              textAlign: 'right'
            }}
          >
            Đợi duyệt
          </Typography>
        </Box>
        <Box component={'div'}>
          <StyledButton variant="outlined" color="error">
            Từ chối
          </StyledButton>
          <StyledButton
            variant="contained"
            color="success"
            onClick={() => setOpen(true)}
          >
            Duyệt
          </StyledButton>
        </Box>
        <ConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={function (): void {
            throw new Error('Function not implemented.')
          }}
          title={'Xác nhận duyệt đơn'}
          description={'Bạn có chắc chắn muốn duyệt đơn mua này ?'}
        />
      </Box>
    </Card>
  )
}

export default OrderItem
