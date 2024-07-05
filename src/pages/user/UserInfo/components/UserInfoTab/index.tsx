import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'

const UserInfoTab = () => {
  const [initialValues] = useState({
    fullName: 'Nguyễn Việt Thắng',
    address: 'Số 17 đường 23 Phường 4 Quận 7',
    phone: '0987654321',
    email: 'email@gmail.com',
    idNumber: '0987654321',
    gender: 'Nam',
    birthDate: '2000-01-01'
  })

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log('Form data:', values)
    }
  })

  const isFormChanged =
    JSON.stringify(formik.values) !== JSON.stringify(initialValues)

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        mx: 'auto',
        bgcolor: '#fff',
        paddingY: 4,
        paddingX: 10,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          textAlign: 'left',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: 24
          }}
        >
          Hồ sơ cá nhân
        </Typography>
      </Box>
      <Box>
        <TextField
          fullWidth
          margin="normal"
          label="Họ & tên"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Địa chỉ"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Số điện thoại"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
      </Box>
      <Box
        sx={{
          textAlign: 'left',
          borderBottom: '1px solid #e0e0e0',
          mt: 4
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: 24
          }}
        >
          Thông tin bảo mật
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            fontWeight: 'bold'
          }}
        >
          Những thông tin dưới đây mang tính bảo mật. <br />
          Chỉ bạn mới có thể thấy và chỉnh sửa những thông tin này.
        </Typography>
      </Box>
      <Box>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          disabled
        />
        <TextField
          fullWidth
          margin="normal"
          label="CMND/CCCD/Hộ chiếu"
          name="idNumber"
          value={formik.values.idNumber}
          onChange={formik.handleChange}
        />
        <RadioGroup
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          row
          sx={{ mt: 2 }}
        >
          <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
          <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
          <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
        </RadioGroup>
        <TextField
          fullWidth
          margin="normal"
          label="Ngày Sinh"
          name="birthDate"
          type="date"
          value={formik.values.birthDate}
          onChange={formik.handleChange}
          InputLabelProps={{
            shrink: true
          }}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isFormChanged}
        sx={{ mt: 3 }}
      >
        Lưu
      </Button>
    </Box>
  )
}

export default UserInfoTab
