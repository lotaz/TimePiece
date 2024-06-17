import React from 'react'
import { Menu, MenuItem, Box, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useNavigate } from 'react-router-dom'

interface UserMenuProps {
  anchorEl: null | HTMLElement
  isOpen: boolean
  setOpen: (value: boolean) => void
}

const UserMenu: React.FC<UserMenuProps> = ({ anchorEl, isOpen, setOpen }) => {
  const navigate = useNavigate()
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
          Quản lý đơn hàng
        </Typography>
      </Box>
      <MenuItem onClick={handleClose}>
        <ShoppingCartIcon style={{ marginRight: 16 }} />
        Đơn mua
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListAltIcon style={{ marginRight: 16 }} />
        Đơn bán
      </MenuItem>
      <Box px={2} py={1} bgcolor={'#E6E6E6'}>
        <Typography variant="subtitle1" color="textSecondary">
          Quản lý tài khoản
        </Typography>
      </Box>
      <MenuItem
        onClick={() => {
          navigate('/user/info')
          handleClose()
        }}
      >
        <SettingsIcon style={{ marginRight: 16 }} />
        Cài đặt tài khoản
      </MenuItem>

      <Box px={2} py={1} bgcolor={'#E6E6E6'}>
        <Typography variant="subtitle1" color="textSecondary">
          Quản lý đơn thẩm định
        </Typography>
      </Box>
      <MenuItem onClick={handleClose}>
        <SettingsIcon style={{ marginRight: 16 }} />
        Lịch sử thẩm định
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ExitToAppIcon style={{ marginRight: 16 }} />
        Đăng xuất
      </MenuItem>
    </Menu>
  )
}

export default UserMenu
