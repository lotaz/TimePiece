import React, { FC, useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Card,
  CardMedia,
  CardActions
} from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import DeleteIcon from '@mui/icons-material/Delete'

interface ImageSideProps {
  initialImages?: string[]
  onImageUpload: (urls: string[]) => void
}

const ImageList: FC<{
  images: string[]
  handleRemoveImage: (index: number) => void
}> = ({ images, handleRemoveImage }) => {
  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      {images.map((image, index) => (
        <Grid item xs={6} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt={`Image ${index}`}
            />
            <CardActions>
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.preventDefault()
                  handleRemoveImage(index)
                }}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

const ImageSide: FC<ImageSideProps> = ({
  initialImages = [],
  onImageUpload
}) => {
  const [images, setImages] = useState<string[]>(initialImages)

  useEffect(() => {
    onImageUpload(images)
  }, [images, onImageUpload])

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (files) {
      const newImages = await Promise.all(
        Array.from(files).map(async (file) => {
          const reader = new FileReader()
          return new Promise<string>((resolve) => {
            reader.onload = () => resolve(reader.result as string)
            reader.readAsDataURL(file)
          })
        })
      )
      setImages((prevImages) => [...prevImages, ...newImages])
    }
  }

  const handleRemoveImage = (index: number) => {
    console.log(index)
    setImages((prevImages) => [
      ...prevImages.slice(0, index),
      ...prevImages.slice(index + 1)
    ])
  }

  return (
    <Box>
      <Typography variant="h6" component="label" gutterBottom>
        Images
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {images.length < 6 && (
            <Box
              sx={{
                border: '2px dashed #D9D9D9',
                borderRadius: 2,
                padding: 3,
                textAlign: 'center',
                bgcolor: '#f5f5f5',
                cursor: 'pointer',
                marginX: 20,
                position: 'relative'
              }}
            >
              <input
                accept="image/*"
                type="file"
                multiple
                style={{
                  opacity: 0,
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }}
                onChange={handleImageChange}
              />
              <AddAPhotoIcon sx={{ fontSize: 50 }} />
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                Upload 1 to 6 images
              </Typography>
            </Box>
          )}
          <ImageList images={images} handleRemoveImage={handleRemoveImage} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ImageSide
