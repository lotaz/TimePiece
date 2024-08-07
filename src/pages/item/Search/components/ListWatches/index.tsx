import CardItem from '@/pages/item/Home/components/CardItem'
import { Box, Grid, Skeleton } from '@mui/material'

interface Watch {
  accessories: string
  area: string | null
  createDate: string
  id: number
  imageUrl: string
  name: string
  price: number
  sellerId: number
  sellerImage: string | null
  sellerName: string
  status: string
  watchImage: string | null
  watchstatus: string | null
  hasAppraisalCertificate: boolean
}

interface ListWatchesProps {
  watch: Watch[] | undefined
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
                  id={item.id}
                  name={item?.name}
                  isAppraisal={item.hasAppraisalCertificate}
                  price={item.price}
                  imageUrl={
                    item.imageUrl
                      ? item.imageUrl
                      : 'https://res.cloudinary.com/dtxbcgpot/image/upload/v1719167161/scndrdzsuky8d6ti0r2b.jpg'
                  }
                  status={item.status}
                  sellerName={item?.sellerName}
                  area={item.area}
                  createDate={item.createDate}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  )
}

export default ListWatches
