import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  MenuItem
} from '@mui/material'
import { Email, Phone, Lock, Person } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { signup } from '@/services/authService'
import { useFormik } from 'formik'
import { AxiosError } from 'axios'
import { DatePicker } from '@mui/x-date-pickers'
import { toast } from 'react-toastify'

interface RegistrationFormProps {
  handleChangeFormType: () => void
}

const RegistrationForm = ({ handleChangeFormType }: RegistrationFormProps) => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null | undefined>(null)

  const form = useFormik({
    initialValues: {
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      name: '',
      dob: null,
      gender: ''
    },
    onSubmit: async (values) => {
      try {
        const data = await signup(values)
        if (data) {
          toast.success('Đăng ký thành công')
          navigate('/login')
        }
        handleChangeFormType()
      } catch (error) {
        let errorMessage = 'Đã có lỗi xảy ra'
        if (error instanceof AxiosError) {
          errorMessage = error.response?.data
        }
        setError(errorMessage)
      }
    },
    validate: (values) => {
      const errors: Record<string, string> = {}
      if (!values.email) {
        errors.email = 'Email không được để trống'
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = 'Số điện thoại không được để trống'
      }
      if (!values.password) {
        errors.password = 'Mật khẩu không được để trống'
      }
      if (values.password.length < 6) {
        errors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự'
      }
      if (values.phoneNumber.length < 10 || values.phoneNumber.length > 15) {
        errors.phoneNumber = 'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại'
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Nhập lại mật khẩu không được để trống'
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Mật khẩu không khớp'
      }
      if (!values.name) {
        errors.name = 'Họ và tên không được để trống'
      }
      if (!values.dob) {
        errors.dob = 'Ngày sinh không được để trống'
      }
      return errors
    }
  })

  return (
    <Container>
      <Box sx={{ textAlign: 'center' }}>
        <Button
          sx={{
            position: 'absolute',
            top: '20px',
            left: '20px'
          }}
          onClick={() => navigate('/')}
        >
          <ArrowBackIcon />
        </Button>
        <Typography variant="h5" component="h1" gutterBottom>
          Đăng ký tài khoản
        </Typography>
        <Box component="form" onSubmit={form.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={form.values.email}
            onChange={form.handleChange}
            InputProps={{
              endAdornment: <Email />
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Số điện thoại"
            name="phoneNumber"
            autoComplete="phone"
            value={form.values.phoneNumber}
            onChange={form.handleChange}
            InputProps={{
              endAdornment: <Phone />
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="new-password"
            value={form.values.password}
            onChange={form.handleChange}
            InputProps={{
              endAdornment: <Lock />
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Nhập lại mật khẩu"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={form.values.confirmPassword}
            onChange={form.handleChange}
            InputProps={{
              endAdornment: <Lock />
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Họ và tên"
            name="name"
            autoComplete="name"
            value={form.values.name}
            onChange={form.handleChange}
            InputProps={{
              endAdornment: <Person />
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DatePicker
                sx={{ marginTop: 2 }}
                label="Ngày sinh"
                disableFuture
                value={form.values.dob}
                name="dob"
                onChange={(newValue) => {
                  form.setFieldValue('dob', newValue)
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="gender"
                label="Giới tính"
                name="gender"
                select
                value={form.values.gender}
                onChange={form.handleChange}
              >
                <MenuItem value="male">Nam</MenuItem>
                <MenuItem value="female">Nữ</MenuItem>
                <MenuItem value="other">Khác</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, textTransform: 'none' }}
            disabled={
              isEmpty(form.values.email) ||
              isEmpty(form.values.password) ||
              isEmpty(form.values.confirmPassword) ||
              isEmpty(form.values.name) ||
              isEmpty(form.values.dob) ||
              isEmpty(form.values.phoneNumber) ||
              isEmpty(form.values.gender) ||
              !!form.isSubmitting ||
              !!form.errors.email ||
              !!form.errors.phoneNumber ||
              !!form.errors.password ||
              !!form.errors.confirmPassword ||
              !!form.errors.name ||
              !!form.errors.dob
            }
          >
            Xác nhận
          </Button>
          <Typography variant="body2" align="center">
            Đã có tài khoản?
            <Button
              sx={{
                textTransform: 'none',
                fontWeight: 'bold'
              }}
              onClick={handleChangeFormType}
            >
              Đăng nhập ngay
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default RegistrationForm
