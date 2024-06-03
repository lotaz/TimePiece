import { Box, Grid, Typography } from '@mui/material'
import Logo from '@/assets/app-logo.png'
import { FacebookSharp } from '@mui/icons-material'
import StyledImage from '../StyledImage'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? '#4E4E4E' : theme.palette.grey[800]
      }}
    >
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box
              width={400}
              height={100}
              sx={{
                flex: 1,
                justifyContent: 'center',
                margin: 'auto',
                marginTop: 4
              }}
            >
              <StyledImage
                src={Logo}
                alt="App Logo"
                style={{ width: '300px', height: '100%', objectFit: 'fill' }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography
              variant="h6"
              color="white"
              fontWeight={700}
              marginBottom={1}
            >
              Về Timepiece
            </Typography>
            <Typography color="white">Giới thiệu</Typography>
            <Typography color="white">Liên hệ hỗ trợ</Typography>
            <Typography color="white">Câu hỏi thường gặp</Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography
              variant="h6"
              color="white"
              fontWeight={700}
              marginBottom={1}
            >
              Chính sách
            </Typography>
            <Typography color="white">Chính sách bảo mật</Typography>
            <Typography color="white">Giải quyết tranh chấp </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography
              variant="h6"
              color="white"
              fontWeight={700}
              marginBottom={1}
            >
              Đồng hồ
            </Typography>
            <Typography color="white">Đồng hồ</Typography>
            <Typography color="white">Mua đồng hồ</Typography>
            <Typography color="white">Bán đồng hồ</Typography>
            <Typography color="white">Thẩm định đồng hồ </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="h6" color="white">
              Về Timepiece
            </Typography>
            <FacebookSharp
              fontSize="large"
              sx={{
                color: '#4979D1'
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={2}>
        <Typography variant="body2" color="white">
          © 2024 Timepiece.com · Điều khoản · Chính sách bảo mật
        </Typography>
        <Typography variant="body2" color="white">
          CÔNG TY TNHH CHỢ TỐT - Người đại diện theo pháp luật: Nguyễn Việt
          Thắng
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer
