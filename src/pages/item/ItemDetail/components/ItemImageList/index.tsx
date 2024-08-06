import React, { useEffect, useState } from 'react'
import { Box, Paper, Skeleton } from '@mui/material'

interface ItemImageListProps {
  images: string[]
  loading?: boolean
}

const ItemImageList: React.FC<ItemImageListProps> = ({ images, loading }) => {
  const [mainImage, setMainImage] = useState(images[0])

  useEffect(() => {
    setMainImage(images[0])
  }, [images])
  return (
    <Box display="flex" flexDirection="row" marginTop={4} marginLeft={10}>
      <Box display="flex" flexDirection="column" mr={2}>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={100}
                height={75}
                sx={{ marginBottom: 1 }}
              />
            ))
          : images.map((image, index) => (
              <Paper
                key={index}
                onClick={() => setMainImage(image)}
                elevation={3}
                square
                sx={{
                  cursor: 'pointer',
                  boxShadow: mainImage === image ? '0 0 0 2px #1976d2' : 'none',
                  marginBottom: 1
                }}
              >
                <img src={image} style={{ width: '100px', height: '75px' }} />
              </Paper>
            ))}
      </Box>
      <Box>
        {loading ? (
          <Skeleton variant="rectangular" width={300} height={300} />
        ) : (
          <Paper
            elevation={3}
            square
            sx={{
              boxShadow: 'none'
            }}
          >
            <img
              src={mainImage}
              alt="Main"
              style={{ width: '300px', height: '300px' }}
            />
          </Paper>
        )}
      </Box>
    </Box>
  )
}

export default ItemImageList
