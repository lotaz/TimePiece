import { Container } from '@mui/material'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { User } from '../ManageBuyOrder/type'
import { AppPath } from '@/services/utils'
import useSWR from 'swr'

const SellerProfilePage = () => {
  const { id } = useLoaderData() as { id: number }
  const [seller, setSeller] = useState<User>()

  const { data: user, isLoading: loadingUser } = useSWR(AppPath.USER_INFO(id))
  const { data: watchs, isLoading: loadingWatchs } = useSWR(
    AppPath.GET_WATCH_BY_USER(id)
  )
  return (
    <Container
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
    ></Container>
  )
}

export default SellerProfilePage
