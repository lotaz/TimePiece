import StyledImage from '@/components/StyledImage'
import { Box, Card, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
interface CardItemProps {
  id: string
  name: string
  image: string
  price: number
}

const CardItem: React.FC<CardItemProps> = ({
  id,
  name,
  price
}: CardItemProps) => {
  const navigate = useNavigate()

  return (
    <Card
      component={'div'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        width: 'fit-content',
        height: 'fit-content',
        ':hover': {
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.5s',
          transform: 'scale(1.05)'
        }
      }}
      onClick={() => navigate(`/item/:${id}`)}
    >
      <Box
        component={'div'}
        sx={{
          width: '200px',
          height: '200px'
        }}
      >
        <StyledImage
          src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6"
          alt="Banner"
          style={{
            borderRadius: '10px'
          }}
        />
      </Box>
      <Box maxWidth={200} component={'div'}>
        <Typography color={'#080808'} marginTop={2} textAlign={'left'}>
          {name}
        </Typography>
      </Box>
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <Box component={'div'} marginLeft={1}>
          <Typography color={'#111111'} marginTop={2} fontWeight={'bold'}>
            {price} đ
          </Typography>
        </Box>
        <Box
          component={'div'}
          bgcolor={'#1AB61A'}
          sx={{
            paddingX: '10px',
            borderRadius: '10px',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px'
          }}
        >
          <Typography color={'#fff'}>Đã thẩm định</Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default CardItem
