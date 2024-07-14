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
            style={{ cursor: 'pointer' }}
          >
            <img src={image} style={{ width: '175px', height: '125px' }} />
          </Paper>
        ))}
      </Box>
      <Box>
        <Paper elevation={3} square>
          <img
            src={mainImage}
            alt="Main"
            style={{ width: '400px', height: '400px' }}
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default ItemImageList
