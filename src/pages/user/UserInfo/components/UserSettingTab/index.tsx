import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { changePasswordService } from '@/services/userService'
import { toast } from 'react-toastify'

interface SettingTabProps {
  userId: number
}

const SettingTab = (props: SettingTabProps) => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false
  })

  const initialValues = React.useMemo(
    () => ({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }),
    []
  )

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required('Mật khẩu hiện tại là bắt buộc'),
    newPassword: Yup.string()
      .required('Mật khẩu mới là bắt buộc')
      .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
      .required('Xác nhận mật khẩu mới là bắt buộc')
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const data = await changePasswordService({
          userId: props.userId,
          newPassword: values.newPassword,
          oldPassword: values.currentPassword,
          confirmNewPassword: values.confirmNewPassword
        })

        if (data) {
          toast.success('Đổi mật khẩu thành công')
          formik.resetForm() // Reset form after successful submission
        }
      } catch (error) {
        toast.error('Đổi mật khẩu thất bại')
      } finally {
        setLoading(false)
      }
    }
  })

  const [isFormChanged, setIsFormChanged] = useState(false)

  useEffect(() => {
    setIsFormChanged(
      JSON.stringify(formik.values) !== JSON.stringify(initialValues)
    )
  }, [formik.values, initialValues])

  const handleClickShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    })
  }

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
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textAlign: 'left',
            fontSize: 24,
            fontWeight: 'bold'
          }}
        >
          Thay đổi mật khẩu
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          textAlign: 'left',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          mb: 2
        }}
      >
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            color: '#898888',
            fontSize: 14,
            width: '240px',
            marginRight: 4
          }}
        >
          Mật khẩu hiện tại
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Mật khẩu hiện tại"
          name="currentPassword"
          type={showPassword.currentPassword ? 'text' : 'password'}
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.currentPassword &&
            Boolean(formik.errors.currentPassword)
          }
          helperText={
            formik.touched.currentPassword && formik.errors.currentPassword
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleClickShowPassword('currentPassword')}
                  edge="end"
                >
                  {showPassword.currentPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          textAlign: 'left',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          mb: 2
        }}
      >
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            color: '#898888',
            fontSize: 14,
            width: '240px',
            marginRight: 4
          }}
        >
          Mật khẩu mới
        </Typography>
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            margin="normal"
            label="Mật khẩu mới"
            name="newPassword"
            type={showPassword.newPassword ? 'text' : 'password'}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword('newPassword')}
                    edge="end"
                  >
                    {showPassword.newPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          textAlign: 'left',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          mb: 2
        }}
      >
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            color: '#898888',
            fontSize: 14,
            width: '240px',
            marginRight: 4
          }}
        >
          Xác nhận mật khẩu mới
        </Typography>
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            margin="normal"
            label="Xác nhận mật khẩu mới"
            name="confirmNewPassword"
            type={showPassword.confirmNewPassword ? 'text' : 'password'}
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmNewPassword &&
              Boolean(formik.errors.confirmNewPassword)
            }
            helperText={
              formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      handleClickShowPassword('confirmNewPassword')
                    }
                    edge="end"
                  >
                    {showPassword.confirmNewPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3, width: 'fit-content' }}
        disabled={!isFormChanged || !formik.isValid || loading}
        startIcon={loading && <CircularProgress size={20} color="inherit" />}
      >
        Đổi mật khẩu
      </Button>
    </Box>
  )
}

export default SettingTab
