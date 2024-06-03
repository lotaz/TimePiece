import Layout from '@/components/Layout'
import { Box, Grid, Typography } from '@mui/material'
import ImageVideoSide from './components/ImageVideoSide'
import InformationSide from './components/InformationSide'

const CreatePostPage = () => {
  return (
    <Layout>
      <Box
        component={'div'}
        sx={{
          marginTop: '60px',
          marginBottom: '40px',
          padding: '40px',
          backgroundColor: '#fff'
        }}
      >
        <Typography
          fontSize={'26px'}
          fontWeight={'bold'}
          gutterBottom
          textAlign={'left'}
        >
          Hình ảnh và video sản phầm
        </Typography>
        <Grid container spacing={6} justifyContent={'center'}>
          <Grid item xs={12} md={5}>
            <ImageVideoSide />
          </Grid>
          <Grid item xs={12} md={5}>
            <InformationSide />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default CreatePostPage
