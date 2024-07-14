import CardItem from '@/pages/item/Home/components/CardItem'
import { Box, Grid, Skeleton } from '@mui/material'

interface Watch {
  id: string
  name: string
  watchstatus?: string | null
  price: number
  imageUrl?: string | null
  accessories?: string
  status: string
}

interface ListWatchesProps {
  watch: Watch[]
  isLoading?: boolean
}

const ListWatches = ({ watch, isLoading }: ListWatchesProps) => {
  return (
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
          : watch?.map((item) => (
              <Grid item xs={6} sm={4} md={3} key={item.id}>
                <CardItem
                  name={item?.name}
                  price={item?.price}
                  image={
                    item?.imageUrl
                      ? item.imageUrl
                      : 'https://res.cloudinary.com/dtxbcgpot/image/upload/v1719167161/scndrdzsuky8d6ti0r2b.jpg'
                  }
                  id={item.id}
                  sellerName={'Seller Name'}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  )
}

export default ListWatches
