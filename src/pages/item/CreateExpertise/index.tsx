import { ChangeEvent, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Skeleton
} from '@mui/material'
import ImageUpload from './components/UploadFile'
import { useFormik } from 'formik'
import YesNoSelection from '@/components/Controls/YesNoSelection'
import { createAppraisalRequest } from '@/services/appraisalRequestService'
import { AppPath } from '@/services/utils'
import useSWR from 'swr'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers'

interface User {
  id: number
  name: string
  address: string | null
  avatar: string | null
  phoneNumber: string
  status: string | null
  birthday: string
  citizenID: string | null
  dateCreate: string
  email: string | null
}

const names = ['10', '20', '30']

const CreateExpertisePage = () => {
  const naviage = useNavigate()
  const [userInformation, setUserInformation] = useState<User | null>(null)
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([])
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  const { data, isLoading } = useSWR(AppPath.USER_INFO(user?.id))
  const { data: brandsData, isLoading: isLoadingBrands } = useSWR(
    AppPath.GET_BRANDS
  )

  useEffect(() => {
    if (data) {
      setUserInformation(data)
    }

    if (brandsData) {
      //map data to brands
      const mapBrand = brandsData.map((brand) => brand.brandName || '')
      setBrands(mapBrand)
    }
  }, [data, brandsData])

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
        .then((res) => {
          console.log(res)
          toast.success('Gởi yêu cầu thành công')
          naviage('/appraisal/manage-appraisal')
        })
        .catch((err) => {
          console.log(err)
          toast.error('Gởi yêu cầu thất bại. Vui lòng thử lại sau ít phút')
          naviage('/')
        })
    }
  })

  useEffect(() => {
    if (userInformation) {
      form.setValues({
        ...form.values,
        name: userInformation.name ?? '',
        email: userInformation.email ?? '',
        phone: userInformation.phoneNumber ?? '',
        address: userInformation.address ?? ''
      })
    }
  }, [userInformation])

  return (
    <Box
      component={'div'}
      sx={{
        marginTop: '100px',
        marginBottom: '20px',
        paddingX: '40px',
        paddingY: '60px',
        backgroundColor: '#fff',
        maxWidth: '1200px',
        marginX: 'auto'
      }}
    >
      <Grid container spacing={4} paddingX={10}>
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight="bold" textAlign="center">
            Thẩm định đồng hồ
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component={'div'}
            sx={{
              padding: '10px',
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
              marginTop: '10px',
              paddingX: '60px'
            }}
          >
            <Grid container spacing={3}>
              {[
                { name: 'name', label: 'Họ và tên' },
                { name: 'email', label: 'Email' },
                { name: 'phone', label: 'Số điện thoại' },
                { name: 'address', label: 'Địa chỉ', fullWidth: true }
              ].map((field) => (
                <Grid
                  item
                  xs={12}
                  md={field.fullWidth ? 12 : 4}
                  key={field.name}
                >
                  {isLoading ? (
                    <Skeleton variant="rectangular" width="100%" height={56} />
                  ) : (
                    <TextField
                      placeholder={field.label}
                      variant="outlined"
                      fullWidth
                      value={form.values[field.name]}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      name={field.name}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component={'div'}
            sx={{
              padding: '10px',
              width: 'fit-content',
              backgroundColor: '#434343',
              paddingRight: '100px',
              marginLeft: '40px',
              color: '#fff',
              fontWeight: '600'
            }}
          >
            Lịch hẹn thẩm định
          </Typography>
          <Box>
            <Typography
              sx={{
                textAlign: 'left',
                fontSize: '16px',
                marginLeft: '50px',
                fontWeight: '600'
              }}
            >
              Ngày hẹn - Giờ hẹn
            </Typography>
            <Typography
              sx={{
                textAlign: 'left',
                fontSize: '12px',
                marginLeft: '60px',
                color: '#6F6F6F'
              }}
            >
              Thời gian mở cửa (không nghỉ trưa) <br />- Thứ 2 - thứ 6: 8h30 -
              20h00 <br />- Thứ 7 và CN: 8h30 - 18h00 <br /> ****Vui lòng chọn
              và xác nhận thời gian thẩm định.
            </Typography>
            <Box
              sx={{
                marginTop: '10px',
                paddingX: '50px',
                display: 'flex',
                justifyContent: 'left'
              }}
            >
              <DateTimePicker
                label="Chọn ngày và giờ"
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock
                }}
                disablePast
                sx={{
                  width: '400px'
                }}
              />
            </Box>
          </Box>
          <Box marginTop={2}>
            <Typography
              sx={{
                textAlign: 'left',
                fontSize: '16px',
                marginLeft: '50px',
                fontWeight: '600'
              }}
            >
              Địa điểm thẩm định
            </Typography>
            <Box>
              <TextField
                select
                label="Địa điểm thẩm định"
                sx={{
                  width: '600px',
                  display: 'flex',
                  justifyContent: 'left',
                  marginLeft: '50px'
                }}
              >
                <MenuItem value={'Hà Nội'}>Hà Nội</MenuItem>
                <MenuItem value={'Hồ Chí Minh'}>Hồ Chí Minh</MenuItem>
                <MenuItem value={'Đà Nẵng'}>Đà Nẵng</MenuItem>
                <MenuItem value={'Hải Phòng'}>Hải Phòng</MenuItem>
                <MenuItem value={'Cần Thơ'}>Cần Thơ</MenuItem>
              </TextField>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} marginLeft={'40px'}>
          <Box>
            <Typography
              component={'div'}
              sx={{
                padding: '10px',
                width: 'fit-content',
                backgroundColor: '#434343',
                color: '#fff',
                fontWeight: '600',
                paddingRight: '110px'
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
            <Box component={'div'}>
              {[
                { label: 'Đồng hồ còn nguyên hộp không?', name: 'hasBox' },
                {
                  label:
                    'Bạn có giấy tờ gốc của đồng hồ hoặc thẻ bảo hành không?',
                  name: 'hasWarranty'
                },
                { label: 'Bạn có hóa đơn mua hàng không?', name: 'hasInvoice' },
                {
                  label: 'Đồng hồ của bạn còn nhãn dán không?',
                  name: 'hasLabel'
                }
              ].map((item, index) => (
                <Grid container spacing={6} gap={1} marginTop={1} key={index}>
                  <Grid item xs={12} md={6}>
                    <Typography textAlign={'left'} fontSize={18} marginLeft={4}>
                      {item.label}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <YesNoSelection
                      value={form.values[item.name]}
                      name={item.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        form.setFieldValue(item.name, e.target.value)
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
              {[
                {
                  label: 'Đồng hồ của bạn bao nhiêu tuổi',
                  name: 'age',
                  select: true,
                  options: names
                },
                {
                  label: 'Thương hiệu đồng hồ',
                  name: 'brand',
                  select: true,
                  options: brands
                },
                { label: 'Số tham chiếu', name: 'reference' },
                {
                  label: 'Giá bán mong muốn của bạn là bao nhiêu?',
                  name: 'wanaPrice',
                  adornment: 'VND'
                },
                {
                  label: 'Thông tin thêm (nếu có)',
                  name: 'note',
                  multiline: true
                }
              ].map((item, index) => (
                <Grid container spacing={4} marginTop={1} key={index}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      textAlign={'left'}
                      fontSize={18}
                      marginTop={item.multiline ? 1 : 4}
                      marginLeft={4}
                    >
                      {item.label}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      variant="outlined"
                      sx={{
                        marginLeft: '50px'
                      }}
                      fullWidth
                      select={item.select}
                      multiline={item.multiline}
                      InputProps={{
                        startAdornment: item.adornment && (
                          <Typography sx={{ marginRight: 1, fontSize: 15 }}>
                            {item.adornment}
                          </Typography>
                        )
                      }}
                      name={item.name}
                      value={form.values[item.name]}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    >
                      {item.select &&
                        item.options?.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Box marginLeft={'40px'}>
              <Typography
                component={'div'}
                sx={{
                  padding: '10px',
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
      <Grid item xs={12}>
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
