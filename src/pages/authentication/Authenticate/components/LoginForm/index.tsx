import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link
} from '@mui/material'
import { Google as GoogleIcon } from '@mui/icons-material'
import { useFormik } from 'formik'
import { signin } from '@/services/authService'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { authStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import { Role } from '@/common/type'
import { isEmpty } from 'lodash'

interface LoginFormProps {
  handleChangeFormType: () => void
}

const LoginForm = ({ handleChangeFormType }: LoginFormProps) => {
  const { setToken } = authStore()
  const { setUser } = useUserStore()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const form = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      try {
        const data = await signin(values)
        setToken(data.accessToken)
        setUser({
          userid: data.userid,
          role: data.role,
          name: data.name
        })
        localStorage.setItem('token', data.accessToken)
        if (data.role === Role.APPRAISER) {
          console.log(data)
          navigate('/appraiser/dashboard')
        } else {
          navigate('/')
        }
      } catch (error) {
        setError('Email hoặc mật khẩu không chính xác')
      }
    },
    validate: (values) => {
      const errors: Record<string, string> = {}
      if (!values.email) {
        errors.email = 'Email không được để trống'
      }
      if (!values.password) {
        errors.password = 'Mật khẩu không được để trống'
      }
      return errors
    }
  })

  return (
    <Container>
      <Box
        sx={{
          textAlign: 'center',
          margin: '0 auto'
        }}
      >
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
        <Typography variant="h5" fontSize={'26px'} component="h1" gutterBottom>
          Đăng nhập tài khoản
        </Typography>
        <Box component="form" onSubmit={form.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email hoặc SĐT"
            name="email"
            autoFocus
            value={form.values.email}
            onChange={form.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Nhập mật khẩu"
            type="password"
            id="password"
            value={form.values.password}
            onChange={form.handleChange}
          />

          <Link
            href="#"
            variant="body2"
            sx={{ display: 'block', textAlign: 'left', mt: 1 }}
          >
            Quên mật khẩu ?
          </Link>
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              form.isSubmitting ||
              isEmpty(form.values.email) ||
              isEmpty(form.values.password)
            }
            sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}
          >
            Đăng nhập
          </Button>
          <Typography variant="body2" align="center" sx={{ my: 2 }}>
            Hoặc đăng nhập bằng
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{ mb: 2 }}
          >
            Đăng nhập bằng Google
          </Button>
          <Typography variant="body2" align="center">
            Chưa có tài khoản?
            <Button
              onClick={handleChangeFormType}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              Đăng ký tài khoản mới
            </Button>
          </Typography>
          <Typography variant="body2" align="center">
            Tìm kiếm đồng hồ
            <Button
              onClick={() => navigate('/')}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              Trở về trang chủ
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginForm
