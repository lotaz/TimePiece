import { Box, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import ManagerPostTab from './components/ManagerPostTab'
import ManagerPostContent from './components/ManagerPostContent'
import { AppPath } from '@/services/utils'
import useSWR from 'swr'

export interface Product {
  id: number
  address: string
  createDate: string
  imageUrl: string
  name: string
  price: number
  size: string
  status: 'SHOW' | 'HIDDEN' | 'SOLD'
  typePost: string
  numberDatePost: number
}

const ManagePostPage = () => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  const [tab, setTab] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoaded, setIsLoaded] = useState(false) // State to track loading completion
  const {
    data: posts,
    mutate,
    isLoading
  } = useSWR(
    user ? AppPath.GET_WATCH_BY_USER(user.id) : null, // Fetch data conditionally
    { refreshInterval: 30000 }
  )

  useEffect(() => {
    if (posts) {
      setProducts(posts)
      setIsLoaded(false) // Set loading completion state
    }
  }, [posts])

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 200px)'
      }}
    >
      <Container
        disableGutters
        component={'div'}
        sx={{
          backgroundColor: '#fff',
          paddingY: '10px',
          marginTop: '100px'
        }}
      >
        <ManagerPostTab
          name={user.name}
          isLoading={isLoading || isLoaded}
          currentTab={tab}
          setTab={setTab}
          showTotal={
            products.filter((product) => product.status === 'SHOW').length ||
            products.length
          }
          hiddenTotal={
            products.filter(
              (product) =>
                product.status === 'HIDDEN' || product.status === 'SOLD'
            ).length
          }
        />
      </Container>
      <Container
        disableGutters
        component={'div'}
        sx={{
          marginTop: '10px',
          minHeight: '50vh'
        }}
      >
        {tab === 0 && (
          <ManagerPostContent
            products={products.filter((product) => {
              return product
            })}
            isLoading={isLoaded}
            mutate={mutate}
          />
        )}
        {tab === 1 && (
          <ManagerPostContent
            products={products.filter((product) => {
              return product.status === 'HIDDEN' || product.status === 'SOLD'
            })}
            isLoading={isLoaded}
            mutate={mutate}
          />
        )}
      </Container>
    </Box>
  )
}

export default ManagePostPage
