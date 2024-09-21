import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Skeleton,
  CircularProgress
} from '@mui/material'
import { useFormik } from 'formik'
import { User } from '@/pages/item/ManageBuyOrder/type'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import { updateUserProFileService } from '@/services/userService'
import { toast } from 'react-toastify'

interface UserInfoTabProps {
  userId: number
}

const UserInfoTab = (props: UserInfoTabProps) => {
  const [loading, setLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    idNumber: '',
    gender: '',
    birthDate: '2000-01-01'
  })

  const { data: user, isLoading } = useSWR<User>(
    AppPath.USER_INFO(props.userId),
    {
      onSuccess: (data) => {
        // Update initial values when user data is successfully loaded
        setInitialValues({
          fullName: data.name || '',
          address: data.address ?? '',
          phone: data.phoneNumber || '',
          email: data.email, // Assuming the email is not part of the user data; adjust as needed
          idNumber: data.citizenID ?? '',
          gender: data.gender || 'male',
          birthDate: data.birthday || '2000-01-01'
        })
      }
    }
  )

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true, // Allow Formik to reinitialize when initialValues change
    onSubmit: async (values) => {
      setLoading(true)
      try {
        await updateUserProFileService(
          {
            name: values.fullName,
            address: values.address,
            phoneNumber: values.phone,
            gender: values.gender,
            birthday: values.birthDate,
            citizenID: values.idNumber
          },
          props.userId
        )

        toast.success('Cập nhật thông tin cá nhân thành công')
        setLoading(false)
      } catch (error) {
        console.error(error)
        toast.error('Có lỗi xảy ra khi cập nhật thông tin cá nhân')
        setLoading(false)
      }
    }
  })

  // Effect to update form values once the user data is loaded
  useEffect(() => {
    if (user) {
      formik.setValues({
        fullName: user.name || '',
        address: user.address ?? '',
        phone: user.phoneNumber || '',
        email: user.email, // Assuming the email is not part of the user data; adjust as needed
        idNumber: user.citizenID ?? '',
        gender: user.gender || 'Nam',
        birthDate: user.birthday || '2000-01-01'
      })
    }
  }, [user, formik.setValues])

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
      {isLoading ? (
        // Apply skeletons while loading
        <Box>
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="100%" height={40} />
        </Box>
      ) : (
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
      )}
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
      {isLoading ? (
        // Apply skeletons while loading
        <Box>
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={56} />
        </Box>
      ) : (
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
            <FormControlLabel value="male" control={<Radio />} label="Nam" />
            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
            <FormControlLabel value="order" control={<Radio />} label="Khác" />
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
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isFormChanged || !formik.isValid || loading}
        startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
        sx={{ mt: 3 }}
      >
        Lưu
      </Button>
    </Box>
  )
}

export default UserInfoTab
