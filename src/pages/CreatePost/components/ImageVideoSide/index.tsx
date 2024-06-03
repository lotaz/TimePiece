import { FC } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import VideoCallIcon from '@mui/icons-material/VideoCall'

interface ImageVideoSideProps {}

const ImageVideoSide: FC<ImageVideoSideProps> = () => {
  return (
    <Box>
      <Typography variant="h6" component="label" gutterBottom>
        Image/Video
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              border: '2px dashed #000',
              borderRadius: 2,
              padding: 3,
              textAlign: 'center',
              bgcolor: '#f5f5f5',
              cursor: 'pointer'
            }}
          >
            <AddAPhotoIcon sx={{ fontSize: 50 }} />
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Đăng từ 01 đến 06 ảnh
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              border: '2px dashed #000',
              borderRadius: 2,
              padding: 3,
              textAlign: 'center',
              bgcolor: '#f5f5f5',
              cursor: 'pointer'
            }}
          >
            <VideoCallIcon sx={{ fontSize: 50 }} />
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Đăng tối đa 01 video
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ImageVideoSide
