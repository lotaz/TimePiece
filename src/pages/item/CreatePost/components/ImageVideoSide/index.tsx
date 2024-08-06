import React, { FC, useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Card,
  CardMedia,
  CardActions,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import DeleteIcon from '@mui/icons-material/Delete'

interface ImageSideProps {
  handleUploadFile: (files: Blob[]) => void
  handleUploadAppraisalFile: (file: Blob) => void
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
  handleUploadFile,
  handleUploadAppraisalFile
}) => {
  const [images, setImages] = useState<string[]>([])
  const [appraisalImage, setAppraisalImages] = useState<string>()
  const [hasAppraisal, setHasAppraisal] = useState<boolean>(false)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      setImages((prevImages) => [...prevImages, ...newImages])
      handleUploadFile(Array.from(files))
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => [
      ...prevImages.slice(0, index),
      ...prevImages.slice(index + 1)
    ])
  }

  const handleAddAppraisal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      setAppraisalImages(newImages[0])
      handleUploadAppraisalFile(files[0])
    }
  }

  const handleRemoveAppraisal = () => {
    setAppraisalImages('')
  }

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image))
    }
  }, [images])

  useEffect(() => {
    if (!hasAppraisal) {
      setAppraisalImages('')
    }
  }, [appraisalImage, hasAppraisal])

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          component={'div'}
          sx={{
            textAlign: 'left',
            marginLeft: 10
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: 26
            }}
            variant="h6"
          >
            Hình ảnh sản phẩm
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {images.length < 6 && (
            <Box
              sx={{
                border: '2px dashed #D9D9D9',
                borderRadius: 2,
                padding: 8,
                textAlign: 'center',
                bgcolor: '#f5f5f5',
                cursor: 'pointer',
                marginX: 16,
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
                Đăng từ 01 đến 06 ảnh
              </Typography>
            </Box>
          )}
          <ImageList images={images} handleRemoveImage={handleRemoveImage} />
        </Grid>
        <Grid
          item
          xs={12}
          component={'div'}
          sx={{
            textAlign: 'left',
            marginLeft: 10
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: 26
            }}
            variant="h6"
          >
            Giấy thẩm định
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          component={'div'}
          sx={{
            textAlign: 'center'
          }}
        >
          <RadioGroup
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
            value={hasAppraisal}
            onChange={(e) => setHasAppraisal(e.target.value === 'true')}
          >
            <FormControlLabel
              value={'true'}
              control={<Radio />}
              label="Có giấy thẩm định"
            />
            <FormControlLabel
              value={'false'}
              control={<Radio />}
              label="Không có giấy thẩm định"
            />
          </RadioGroup>
        </Grid>
        {hasAppraisal && (
          <Grid item xs={12}>
            {!appraisalImage && (
              <Box
                sx={{
                  border: '2px dashed #D9D9D9',
                  borderRadius: 2,
                  padding: 8,
                  textAlign: 'center',
                  bgcolor: '#f5f5f5',
                  cursor: 'pointer',
                  marginX: 16,
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
                  onChange={handleAddAppraisal}
                />
                <AddAPhotoIcon sx={{ fontSize: 50 }} />
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Giấy thẩm định
                </Typography>
              </Box>
            )}
            <ImageList
              images={appraisalImage ? [appraisalImage] : []}
              handleRemoveImage={handleRemoveAppraisal}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default ImageSide
