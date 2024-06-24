import React, { useState } from 'react'
import {
  ImageList,
  ImageListItem,
  Dialog,
  DialogContent,
  Box
} from '@mui/material'

interface WatchImagesProps {
  images: string[]
}

const WatchImages: React.FC<WatchImagesProps> = ({ images }) => {
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  )

  const handleClickOpen = (image: string) => {
    setSelectedImage(image)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedImage(undefined)
  }

  return (
    <Box marginTop={4} marginLeft={10}>
      <ImageList cols={4} variant="masonry" gap={8}>
        {images.map((image, index) => (
          <ImageListItem key={index}>
            <img
              src={image}
              alt={`Watch Image ${index + 1}`}
              loading="lazy"
              onClick={() => handleClickOpen(image)}
              style={{
                cursor: 'pointer',
                margin: '10px'
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Selected Watch"
            style={{ width: '100%' }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default WatchImages
