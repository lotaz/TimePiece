import { Box } from '@mui/material'
import UserInfo from './components/UserInfo'
import WatchInfo from './components/WatchInfo'
import PaymentMethod from './components/PaymentMethod'
import UserLayout from '@/components/Layout/UserLayout'

const PaymentPage = () => {
  const handleChange = () => {
    console.log('Change address clicked')
  }
  return (
    <UserLayout>
      <Box maxWidth={1200} marginX={'auto'} width={'inherit'}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginTop: '100px'
          }}
        >
          <UserInfo
            name="Nguyễn Việt Thắng"
            phone="0358000951"
            address="Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh"
            onChange={handleChange}
          />
        </Box>
        <Box>
          <WatchInfo
            seller="Hoangnd"
            itemName="Rolex Day Date 36 128235 Ombre Chocolate"
            itemType="Đồng hồ nam"
            itemPrice="1,080,869₫"
            itemLocation="Phường Long Thạnh Mỹ (Quận 9 cũ), Thành phố Thủ Đức, Tp Hồ Chí Minh"
            itemImage="/path/to/item/image.jpg" // Replace with the correct path to the image
          />
        </Box>
        <Box>
          <PaymentMethod price={100} extraPrice={1231231231213} />
        </Box>
      </Box>
    </UserLayout>
  )
}

export default PaymentPage
