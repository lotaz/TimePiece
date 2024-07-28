import React, { useEffect, useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Divider,
  Grid,
  Skeleton,
  Card,
  CardContent
} from '@mui/material'
import CardItem from '@/pages/item/Home/components/CardItem'
import { AppPath } from '@/services/utils'
import useSWR from 'swr'

interface ContentTabProps {
  sellerId: number
}

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

const ContentTab: React.FC<ContentTabProps> = ({ sellerId }) => {
  const [tabValue, setTabValue] = useState(0)
  const [displayedProducts, setDisplayedProducts] = useState<Item[]>([])
  const [watches, setWatches] = useState<Item[]>([])
  const { data: watchs, isLoading: loadingWatchs } = useSWR(
    AppPath.GET_WATCH_BY_USER(sellerId)
  )

  useEffect(() => {
    if (watchs) {
      setWatches(watchs)
    }
  }, [watchs])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  //handle changle tab
  useEffect(() => {
    if (tabValue === 0) {
      setDisplayedProducts(watches)
    } else {
      setDisplayedProducts([])
    }
  }, [tabValue, watches])

  return (
    <Box
      sx={{
        width: '50vw',
        height: '60vh',
        bgcolor: 'white',
        borderRadius: '8px'
      }}
    >
      <Tabs value={tabValue} onChange={handleChange} centered>
        <Tab
          label={`Đang hiển thị (${watches.filter((watch) => watch.status === 'SHOW').length})`}
        />
        <Tab
          label={`Đã bán  (${watches.filter((watch) => watch.status === 'SOLD').length})`}
        />
      </Tabs>
      <Divider />
      <Box p={2} m={2}>
        <Grid container spacing={2}>
          {loadingWatchs
            ? Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={4} key={index}>
                  <Card>
                    <Skeleton variant="rectangular" width="100%" height={140} />
                    <CardContent>
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width="60%" />
                      <Box display="flex" alignItems="center" marginTop={2}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton
                          variant="text"
                          width="80%"
                          style={{ marginLeft: 8 }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : displayedProducts.map((item) => (
                <Grid item xs={4} key={item.id}>
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
    </Box>
  )
}

export default ContentTab
