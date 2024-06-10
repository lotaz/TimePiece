import { Box, Grid, Typography, Button, TextField } from '@mui/material'

interface WatchInfoProps {}

const WatchInfo: React.FC<WatchInfoProps> = () => {
  return (
    <Box component={'div'} marginTop={'10px'} marginLeft={20}>
      <Grid container spacing={6} gap={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={18}
            marginTop={1}
            marginLeft={4}
          >
            Đồng hồ còn nguyên hộp không?
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={12}>
            <Grid item xs={3}>
              <Button
                sx={{
                  paddingX: '35px',
                  color: '#434343',
                  borderColor: '#434343'
                }}
                size="large"
                variant="outlined"
              >
                Có
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                sx={{
                  paddingX: '20px',
                  color: '#434343',
                  borderColor: '#434343'
                }}
                size="large"
                variant="outlined"
              >
                Không
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={6} gap={1} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography textAlign={'left'} fontSize={18} marginLeft={4}>
            Bạn có giấy tờ gốc của đồng hồ hoặc thẻ bảo hành không?
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={12}>
            <Grid item xs={3}>
              <Button
                sx={{
                  paddingX: '35px',
                  color: '#434343',
                  borderColor: '#434343'
                }}
                size="large"
                variant="outlined"
              >
                Có
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                sx={{
                  paddingX: '20px',
                  color: '#434343',
                  borderColor: '#434343'
                }}
                size="large"
                variant="outlined"
              >
                Không
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={6} gap={1} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={18}
            marginTop={1}
            marginLeft={4}
          >
            Bạn có hóa đơn mua hàng không?
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={12}>
            <Grid item xs={3}>
              <Button
                sx={{
                  paddingX: '35px',
                  color: '#434343',
                  borderColor: '#434343'
                }}
                size="large"
                variant="outlined"
              >
                Có
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                sx={{
                  paddingX: '20px',
                  color: '#434343',
                  borderColor: '#434343'
                }}
                size="large"
                variant="outlined"
              >
                Không
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={6} gap={1} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={18}
            marginTop={1}
            marginLeft={4}
          >
            Đồng hồ của bạn còn nhãn dán không?
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={12}>
            <Grid item xs={3}>
              <Button
                sx={{
                  paddingX: '35px',
                  color: '#434343',
                  borderColor: '#434343'
                }}
                size="large"
                variant="outlined"
              >
                Có
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                sx={{
                  paddingX: '20px',
                  color: '#434343',
                  borderColor: '#434343'
                }}
                size="large"
                variant="outlined"
              >
                Không
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={4} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={18}
            marginTop={1}
            marginLeft={4}
          >
            Đồng hồ của bạn bao nhiêu tuổi
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="gender"
            label="Tuổi của đồng hồ"
            name="gender"
            value={'2 năm'}
          >
            10
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={4} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={18}
            marginTop={1}
            marginLeft={4}
          >
            Giá bán mong muốn của bạn là bao nhiêu?
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            variant="outlined"
            fullWidth
            value={1000000}
            InputProps={{
              startAdornment: (
                <Typography sx={{ marginRight: 1, fontSize: 15 }}>
                  VND
                </Typography>
              )
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={18}
            marginTop={1}
            marginLeft={4}
          >
            Thông tin thêm (nếu có)
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            variant="outlined"
            rows={4}
            fullWidth
            multiline
            value={'hihi'}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default WatchInfo
