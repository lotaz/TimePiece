import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { AppPath } from '@/services/utils'
import useSWR from 'swr'
import InfoTab from './components/InfoTab'
import ContentTab from './components/ContentTab'

interface Seller {
  id: number
  name: string
  address: string
  avatar: string
  phoneNumber: string
  dateCreate: string
}

const SellerProfilePage = () => {
  const { id } = useLoaderData() as { id: number }
  const [seller, setSeller] = useState<Seller>()

  const { data, isLoading: loadingUser } = useSWR(AppPath.USER_INFO(id))

  useEffect(() => {
    if (data) {
      setSeller(data)
    }
  }, [data])

  return (
    <Box
      component={'div'}
      sx={{
        marginX: 16,
        marginTop: 12,
        marginBottom: 4,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        minHeight: 'calc(100vh - 340px)'
      }}
    >
      <InfoTab
        sellerId={seller?.id}
        name={seller?.name}
        image={seller?.avatar}
        phone={seller?.phoneNumber}
        address={seller?.address}
        joinedAt={seller?.dateCreate}
        isLoading={loadingUser}
      />
      <ContentTab sellerId={id} />
    </Box>
  )
}

export default SellerProfilePage
