import { Container, Grid } from '@mui/material'
import ItemDetail from './components/ItemDetail'
import ItemDetailUser from './components/ItemDetailUser'
import { AppPath } from '@/services/utils'
import useSWR from 'swr'
import { useLoaderData } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { WatchDetail } from './type'

const ItemDetailPage = () => {
  const { id } = useLoaderData() as { id: number }
  const [watch, setWatch] = useState<WatchDetail | null>(null)
  const [listImage, setListImage] = useState<string[]>([])

  const { data, isLoading } = useSWR(AppPath.GET_WATCH_BY_ID(id))

  useEffect(() => {
    if (data) {
      setWatch(data)
      setListImage([...data.watchImages, data.appraisalCertificateUrl])
    }
  }, [data])

  return (
    <Container
      component={'div'}
      sx={{
        backgroundColor: '#fff',
        padding: '40px',
        marginTop: '100px',
        marginBottom: '40px'
      }}
    >
      <Grid container>
        <Grid item xs={12} md={8}>
          <ItemDetail
            watch={data}
            images={listImage}
            isLoading={isLoading}
            appraisalCertificateUrl={watch?.appraisalCertificateUrl}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ItemDetailUser
            watchId={watch?.id}
            loading={isLoading}
            sellerId={watch?.userId}
            sellerName={watch?.userName}
            sellerPhone={watch?.userPhoneNumber}
            sellerAvatar={watch?.userAvatar}
            feedbacks={10}
            rating={watch?.userRatingScore ?? 0}
            hasAppraisalCertificate={watch?.hasAppraisalCertificate}
            status={watch?.status}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default ItemDetailPage
