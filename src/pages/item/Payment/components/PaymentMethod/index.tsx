import { Box, Button, Divider, Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Zalo from '@/assets/logoZalo.png'
import Momo from '@/assets/logoMomo.png'

const method = [
  { name: 'ZaloPay', image: Zalo },
  { name: 'Momo', image: Momo }
]

interface PaymentMethodProps {
  price: number
  extraPrice: number
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ price, extraPrice }) => {
  const total = price + extraPrice
  const navigate = useNavigate()

  const handleSubmit = () => {
    toast.success('Đặt hàng thành công', {
      onClose(props) {
        navigate('/')
      }
    })
  }
  return (
    <Box
      border={1}
      borderColor="grey.300"
      borderRadius={2}
      m={2}
      component={'div'}
      bgcolor={'#FFFFFF'}
    >
      <Box
        component={'div'}
        borderBottom={'1px solid #D0D0D0'}
        textAlign={'left'}
      >
        <Typography
          component={'div'}
          variant="h6"
          gutterBottom
          margin={2}
          color={'#000000'}
        >
          Phương thức thanh toán
        </Typography>

        <Box
          display={'flex'}
          justifyContent={'flex-start'}
          padding={2}
          flexDirection={'row'}
        >
          {method.map((item, index) => (
            <Box
              key={index}
              display={'flex'}
              alignItems={'center'}
              padding={4}
              width={160}
              height={100}
              marginX={2}
              border={'1px solid #D7D7D7'}
              borderRadius={2}
            >
              <img
                style={{
                  margin: '0 auto'
                }}
                src={item.image}
                alt={item.name}
              />
            </Box>
          ))}
        </Box>
        <Divider />
        <Box
          width={'full'}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Box
            width={360}
            display={'flex'}
            justifyContent="flex-end"
            flexDirection={'column'}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              flexDirection={'row'}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#9A9A9A'
                }}
              >
                Tổng tiền
              </Typography>
              <Typography marginRight={2} fontWeight={'bold'}>
                {price}₫
              </Typography>
            </Box>
            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#9A9A9A'
                }}
              >
                Chi phí khác
              </Typography>
              <Typography marginRight={2} fontWeight={'bold'}>
                {extraPrice}₫
              </Typography>
            </Box>
            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#9A9A9A'
                }}
              >
                Tổng thanh toán
              </Typography>
              <Typography marginRight={2} fontWeight={'bold'}>
                {total}₫
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mx: 2 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 2
          }}
        >
          <Typography component={'div'} display={'flex'} marginTop={2}>
            Nhấn “Đặt hàng” đồng nghĩa với việc bạn đồng ý
            <Link marginLeft={1}>điều khoản Timepiece</Link>
          </Typography>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              padding: '10px 60px'
            }}
          >
            Đặt hàng
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PaymentMethod
