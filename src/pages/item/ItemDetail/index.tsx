import { Container, Grid } from '@mui/material'
import ItemDetail from './components/ItemDetail'
import ItemDetailUser from './components/ItemDetailUser'
import { AppPath } from '@/services/utils'
import useSWR from 'swr'
import { useLoaderData } from 'react-router-dom'

const ItemDetailPage = () => {
  const { id } = useLoaderData() as { id: string }

  const { data, isLoading } = useSWR(AppPath.GET_WATCH_BY_ID(id))

  return (
    <Container
      component={'div'}
      sx={{
        backgroundColor: '#fff',
        padding: '40px',
        marginTop: '60px'
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <ItemDetail
            watch={data}
            images={data?.watchImages}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ItemDetailUser
            loading={isLoading}
            sellerId={data?.userId}
            sellerName={data?.userName}
            sellerPhone={data?.userPhoneNumber}
            sellerAvatar={data?.userAvatar}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default ItemDetailPage
