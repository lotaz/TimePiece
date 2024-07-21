import React, { useState } from 'react'
import { Box, Paper } from '@mui/material'

interface ItemImageListProps {
  images: string[]
}

const ItemImageList: React.FC<ItemImageListProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <Box display="flex" flexDirection="row" marginTop={4}>
      <Box display="flex" flexDirection="column" mr={2}>
        {images.map((image, index) => (
          <Paper
            key={index}
            onClick={() => setMainImage(image)}
            elevation={3}
            square
            sx={{
              cursor: 'pointer',
              boxShadow: mainImage === image ? '0 0 0 2px #1976d2' : 'none'
            }}
          >
            <img src={image} style={{ width: '100px', height: '75px' }} />
          </Paper>
        ))}
      </Box>
      <Box>
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
      </Box>
    </Box>
  )
}

export default ItemImageList
