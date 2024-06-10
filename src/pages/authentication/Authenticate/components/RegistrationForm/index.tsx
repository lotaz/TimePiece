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

interface RegistrationFormProps {
  handleChangeFormType: () => void
}

const RegistrationForm = ({ handleChangeFormType }: RegistrationFormProps) => {
  const [formValues, setFormValues] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dob: '',
    gender: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Đăng ký tài khoản
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            value={formValues.email}
            onChange={handleChange}
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
            value={formValues.phone}
            onChange={handleChange}
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
            value={formValues.password}
            onChange={handleChange}
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
            value={formValues.confirmPassword}
            onChange={handleChange}
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
            value={formValues.fullName}
            onChange={handleChange}
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
                value={formValues.dob}
                onChange={handleChange}
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
                value={formValues.gender}
                onChange={handleChange}
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
            sx={{ mt: 3, mb: 2 }}
          >
            Xác nhận
          </Button>
          <Typography variant="body2" align="center">
            Đã có tài khoản?{' '}
            <Button onClick={handleChangeFormType}>Đăng nhập ngay</Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default RegistrationForm
