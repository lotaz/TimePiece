import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Skeleton
} from '@mui/material'
import CardItem from '../CardItem'
import useSWR from 'swr'
import { AppPath, fetcher } from '@/services/utils'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Item {
  id: number
  imageUrl: string
  name: string
  price: number
  status: string
  userAvatar: string | null
  userId: number
  userName: string
  area: string | null
  createDate: string
}

const ListCards: React.FC = () => {
  const [watches, setWatches] = useState<Item[]>([])
  const { data, isLoading } = useSWR(AppPath.GET_TOP12_WATCHES, fetcher)

  useEffect(() => {
    if (!isLoading) {
      setWatches(data)
    }
  }, [data, isLoading])
  const navigate = useNavigate()
  return (
    <Container component={'div'}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Button
          sx={{
            textTransform: 'none'
          }}
          onClick={() => navigate('/item/product?page=1&size=12')}
        >
          <Typography variant="h6">Xem Tất Cả</Typography>
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, paddingBottom: 10 }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 8, md: 12 }}
        >
          {isLoading
            ? Array.from(new Array(12)).map((_, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </Grid>
              ))
            : watches?.map((item) => (
                <Grid item xs={6} sm={4} md={3} key={item.id}>
                  <CardItem
                    id={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    price={item.price}
                    status={item.status}
                    userAvatar={item.userAvatar}
                    userId={item.userId}
                    sellerName={item.userName}
                    area={item.area}
                    createDate={item.createDate}
                  />
                </Grid>
              ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default ListCards
