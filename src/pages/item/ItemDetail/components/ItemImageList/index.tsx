import React, { useState } from 'react'
import { Box, Paper } from '@mui/material'

interface Image {
  src: string
  alt: string
}

interface ItemImageListProps {
  images: Image[]
}

const ItemImageList: React.FC<ItemImageListProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0].src)

  return (
    <Box display="flex" flexDirection="row" marginTop={4}>
      <Box display="flex" flexDirection="column" mr={2}>
        {images.map((image, index) => (
          <Paper
            key={index}
            onClick={() => setMainImage(image.src)}
            elevation={3}
            square
            style={{ cursor: 'pointer' }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{ width: '175px', height: '125px' }}
            />
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
