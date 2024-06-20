import React from 'react'
import { Menu, MenuItem, Box, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
interface AppraiserMenuProps {
  anchorEl: null | HTMLElement
  isOpen: boolean
  setOpen: (value: boolean) => void
}

const AppraiserMenu = ({ isOpen, setOpen, anchorEl }: AppraiserMenuProps) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Menu
      anchorEl={anchorEl}
      variant="menu"
      open={isOpen}
      sx={{ marginTop: 8, paddingTop: 0 }}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      MenuListProps={{
        disablePadding: true
      }}
    >
      <Box px={2} py={1} bgcolor={'#E6E6E6'}>
        <Typography variant="subtitle1" color="textSecondary">
          Quản lý tài khoản
        </Typography>
      </Box>
      <MenuItem>
        <SettingsIcon style={{ marginRight: 16 }} />
        Cài đặt tài khoản
      </MenuItem>

      <MenuItem
        onClick={() => {
          localStorage.removeItem('token')
          window.location.href = '/authenticate/login'
        }}
      >
        <ExitToAppIcon style={{ marginRight: 16 }} />
        Đăng xuất
      </MenuItem>
    </Menu>
  )
}

export default AppraiserMenu
