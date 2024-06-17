import { CheckCircle } from '@mui/icons-material'
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'
import ImageUpload from './components/UploadFile'
import UserLayout from '@/components/Layout/UserLayout'
import { useFormik } from 'formik'

interface CreateExpertisePageProps {}

const names = ['10', '20', '30']

const CreateExpertisePage = (props: CreateExpertisePageProps) => {
  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      brand: '',
      reference: '',
      age: '',
      price: '',
      note: ''
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })
  return (
    <UserLayout>
      <Box
        component={'div'}
        sx={{
          marginTop: '120px',
          marginBottom: '40px',
          padding: '40px',
          backgroundColor: '#fff',
          maxWidth: '1200px',
          marginX: 'auto'
        }}
      >
        <Grid container spacing={4} paddingX={5}>
          <Grid item xs={12} md={12}>
            <Typography variant="h4" fontWeight="bold" textAlign="center">
              Thẩm định đồng hồ
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography
              component={'div'}
              sx={{
                padding: '16px',
                width: 'fit-content',
                backgroundColor: '#434343',
                paddingRight: '100px',
                marginLeft: '40px',
                color: '#fff',
                fontWeight: '600'
              }}
            >
              Thông tin của bạn
            </Typography>
            <Box
              sx={{
                marginTop: '20px',
                paddingX: '50px'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    placeholder="Họ và tên"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField placeholder="Email" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    placeholder="Số điện thoại"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    placeholder="THương hiệu đồng hồ"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    placeholder="Số tham chiếu"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} marginLeft={'40px'}>
            <Box>
              <Typography
                component={'div'}
                sx={{
                  padding: '16px',
                  width: 'fit-content',
                  backgroundColor: '#434343',

                  color: '#fff',
                  fontWeight: '600',
                  paddingRight: '50px'
                }}
              >
                Thông tin đồng hồ
              </Typography>
              <Typography
                component={'div'}
                color={'#434343'}
                fontSize={'12px'}
                textAlign={'left'}
              >
                Nhấp vào tùy chọn bên dưới
              </Typography>
              <Box component={'div'} marginTop={'10px'}>
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
                      select
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
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
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box>
              <Box marginLeft={'40px'}>
                <Typography
                  component={'div'}
                  sx={{
                    padding: '16px',
                    width: 'fit-content',
                    backgroundColor: '#434343',
                    paddingRight: '100px',

                    color: '#fff',
                    fontWeight: '600'
                  }}
                >
                  Hình ảnh đồng hồ
                </Typography>
                <Typography
                  component={'div'}
                  color={'#434343'}
                  fontSize={'18px'}
                  textAlign={'left'}
                  marginLeft={'20px'}
                  fontWeight={'600'}
                >
                  Chọn ít nhất 5 tấm ảnh chụp các góc của đồng hồ. Kich thước
                  ảnh không quá 5MB
                </Typography>
              </Box>
              <Box
                component={'div'}
                marginTop={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <ImageUpload />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            sx={{
              paddingX: '40px',
              color: '#fff',
              backgroundColor: '#434343',
              borderColor: '#434343',
              marginTop: '30px',
              marginLeft: '40px',
              ':hover': {
                backgroundColor: '#434343'
              }
            }}
            size="large"
            variant="outlined"
          >
            Gởi yêu cầu
          </Button>
        </Grid>
      </Box>
    </UserLayout>
  )
}

export default CreateExpertisePage
