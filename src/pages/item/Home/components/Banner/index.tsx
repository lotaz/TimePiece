import BannerImage from '@/assets/banner.png'
import StyledImage from '@/components/StyledImage'
import { Container } from '@mui/material'

const Banner = () => {
  return (
    <Container component={'div'}>
      <StyledImage src={BannerImage} alt="Banner" />
    </Container>
  )
}

export default Banner
