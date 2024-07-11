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
import YesNoSelection from '@/components/Controls/YesNoSelection'
import { ChangeEvent } from 'react'
import { createAppraisalRequest } from '@/services/appraisalRequestService'

const names = ['10', '20', '30']

const location = ['Bắc', 'Trung', 'Nam']

const CreateExpertisePage = () => {
  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      brand: '',
      reference: '',
      hasBox: '',
      hasWarranty: '',
      hasInvoice: '',
      hasLabel: '',
      age: '',
      wanaPrice: '',
      note: '',
      images: [],
      address: ''
    },
    onSubmit: async (values) => {
      console.log(values)
      await createAppraisalRequest(form.values)
    }
  })
  return (
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
                  value={form.values.name}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  name="name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  placeholder="Email"
                  variant="outlined"
                  fullWidth
                  value={form.values.email}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  name="email"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  placeholder="Số điện thoại"
                  variant="outlined"
                  value={form.values.phone}
                  onChange={form.handleChange}
                  name="phone"
                  onBlur={form.handleBlur}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  placeholder="Địa chỉ"
                  variant="outlined"
                  value={form.values.address}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  name="address"
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
                  <YesNoSelection
                    value={form.values.hasBox}
                    name={'hasBox'}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      form.setFieldValue('hasBox', e.target.value)
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={6} gap={1} marginTop={1}>
                <Grid item xs={12} md={6}>
                  <Typography textAlign={'left'} fontSize={18} marginLeft={4}>
                    Bạn có giấy tờ gốc của đồng hồ hoặc thẻ bảo hành không?
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                  <YesNoSelection
                    value={form.values.hasWarranty}
                    name={'hasWarranty'}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      form.setFieldValue('hasWarranty', e.target.value)
                    }}
                  />
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
                  <YesNoSelection
                    value={form.values.hasInvoice}
                    name={'hasInvoice'}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      form.setFieldValue('hasInvoice', e.target.value)
                    }}
                  />
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
                  <YesNoSelection
                    value={form.values.hasLabel}
                    name={'hasLabel'}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      form.setFieldValue('hasLabel', e.target.value)
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4} marginTop={1}>
                <Grid item xs={12} md={6}>
                  <Typography
                    textAlign={'left'}
                    fontSize={18}
                    marginTop={4}
                    marginLeft={4}
                  >
                    Đồng hồ của bạn bao nhiêu tuổi
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    marginLeft: '50px'
                  }}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="age"
                    label="Tuổi của đồng hồ"
                    name="age"
                    select
                    value={form.values.age}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
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
                    Thương hiệu đồng hồ
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    variant="outlined"
                    sx={{
                      marginLeft: '50px'
                    }}
                    fullWidth
                    name="brand"
                    value={form.values.brand}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
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
                    Số tham chiếu
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    variant="outlined"
                    sx={{
                      marginLeft: '50px'
                    }}
                    fullWidth
                    name="reference"
                    value={form.values.reference}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
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
                    Giá bán mong muốn của bạn là bao nhiêu?
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    variant="outlined"
                    sx={{
                      marginLeft: '50px'
                    }}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Typography sx={{ marginRight: 1, fontSize: 15 }}>
                          VND
                        </Typography>
                      )
                    }}
                    name="wanaPrice"
                    value={form.values.wanaPrice}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
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
                    sx={{
                      marginLeft: '50px'
                    }}
                    name="note"
                    value={form.values.note}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
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
                fontSize={'14px'}
                textAlign={'left'}
                fontWeight={'600'}
              >
                Chọn ít nhất 5 tấm ảnh chụp các góc của đồng hồ. Kich thước ảnh
                không quá 5MB
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
              <ImageUpload
                onFileChange={(files) => {
                  form.setFieldValue('images', files)
                }}
                files={[]}
              />
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
          onClick={() => {
            form.handleSubmit()
          }}
        >
          Gởi yêu cầu
        </Button>
      </Grid>
    </Box>
  )
}

export default CreateExpertisePage
