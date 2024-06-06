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
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

interface LoginFormProps {
  handleChangeFormType: () => void
}

const LoginForm = ({ handleChangeFormType }: LoginFormProps) => {
  const { login } = useContext(AuthContext)

  const form = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      login({
        email: values.email,
        name: 'Thang Ngol',
        role: 'appraiser'
      })
    }
  })

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" component="h1" gutterBottom>
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
            autoComplete="email"
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
            autoComplete="current-password"
            value={form.values.password}
            onChange={form.handleChange}
          />
          <Link
            href="#"
            variant="body2"
            sx={{ display: 'block', textAlign: 'right', mt: 1 }}
          >
            Quên mật khẩu ?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
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
            Continue with Google
          </Button>
          <Typography variant="body2" align="center">
            Chưa có tài khoản?{' '}
            <Button onClick={handleChangeFormType}>
              Đăng ký tài khoản mới
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginForm
