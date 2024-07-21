import React from 'react'
import { Box } from '@mui/material'
import ProductCard from '../PostCard'

interface Product {
  imageUrl: string
  name: string
  price: number
  address: string
  typePost: string
  numberDatePost: number
  createDate: string
}

interface ManagerPostContentProps {
  products: Product[]
  isLoading: boolean
  mutate?: (key?: string) => void
}

const ManagerPostContent: React.FC<ManagerPostContentProps> = ({
  products,
  isLoading,
  mutate
}) => {
  return (
    <Box marginTop={2} marginBottom={8}>
      {!isLoading &&
        products?.map((product, index) => (
          <ProductCard
            key={index}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            address={product.address}
            typePost={product.typePost}
            numberDatePost={product.numberDatePost}
            createDate={product.createDate}
            isLoading={isLoading}
            mutate={mutate}
          />
        ))}
    </Box>
  )
}

export default ManagerPostContent
