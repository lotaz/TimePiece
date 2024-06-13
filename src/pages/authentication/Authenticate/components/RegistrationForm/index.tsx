import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  MenuItem
} from '@mui/material'
import { Email, Phone, Lock, Person, Event } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { signup } from '@/services/authService'
import { useFormik } from 'formik'

interface RegistrationFormProps {
  handleChangeFormType: () => void
}

const RegistrationForm = ({ handleChangeFormType }: RegistrationFormProps) => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const form = useFormik({
    initialValues: {
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      dob: '',
      gender: ''
    },
    onSubmit: async (values) => {
      console.log(values)
      // try {
      //   const data = await signup(values)
      //   navigate('/authenticate/login')
      // } catch (error) {
      //   setError('Email hoặc mật khẩu không chính xác')
      // }
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
            id="phone"
            label="Số điện thoại"
            name="phone"
            autoComplete="phone"
            value={form.values.phone}
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
            id="fullName"
            label="Họ và tên"
            name="fullName"
            autoComplete="name"
            value={form.values.fullName}
            onChange={form.handleChange}
            InputProps={{
              endAdornment: <Person />
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="dob"
                placeholder="Ngày sinh"
                label="Ngày sinh"
                name="dob"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                value={form.values.dob}
                onChange={form.handleChange}
                InputProps={{
                  endAdornment: <Event />
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
              isEmpty(form.values.fullName) ||
              isEmpty(form.values.dob) ||
              isEmpty(form.values.phone) ||
              isEmpty(form.values.gender)
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
