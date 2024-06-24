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

const ListCards: React.FC = () => {
  const { data, isLoading } = useSWR(AppPath.GET_TOP12_WATCHES, fetcher)

  return (
    <Container component={'div'}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Tin đăng dành cho bạn
        </Typography>
        <Button
          sx={{
            textTransform: 'none'
          }}
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
            : data?.map((item) => (
                <Grid item xs={6} sm={4} md={3} key={item.id}>
                  <CardItem
                    name={item?.name}
                    price={item?.price}
                    image={item?.imageUrl}
                    id={item.id}
                  />
                </Grid>
              ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default ListCards
