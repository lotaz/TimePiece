import { Box } from '@mui/material'
import ProductCard from '../PostCard'

interface ManagerPostContentProps {}

const ManagerPostContent: React.FC<ManagerPostContentProps> = () => {
  return (
    <Box marginTop={2} marginBottom={8}>
      <ProductCard
        imageSrc={''}
        title={'Rolex Day Date 36 128235 Ombre Chocolate'}
        price={1002990}
        address="Phường Long Thạnh Mỹ (Quận 9 cũ), Thành phố Thủ Đức, Tp Hồ Chí Minh"
        typePost={'Đăng tin thường(Miễn phí)'}
        numberDayPost={60}
        timePost={'16/05/2024 đến 15/07/2024'}
      />
    </Box>
  )
}

export default ManagerPostContent
