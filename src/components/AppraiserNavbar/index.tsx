import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import { useEffect, useState } from 'react'
import Logo from '@/assets/app-logo.png'
import AppraiserMenu from '../AppraiserMenu'
import { useNavigate } from 'react-router-dom'
import useAuth from '@/stores/authStore'

const pages = [
  { title: 'Yêu cầu thẩm định', href: '/appraiser/dashboard' },
  { title: 'Lịch sử thẩm định', href: '#' },
  { title: 'Tin nhắn', href: '#' }
]

const AppraiserNavbar = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/authenticate/login')
    }
  }, [navigate, token])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#4E4E4E',
        padding: '10px 0',
        width: '100%'
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: 'flex',

          justifyContent: 'space-between'
        }}
      >
        <Box display={'flex'} alignItems={'center'}>
          <Box
            marginLeft={2}
            component={'button'}
            bgcolor={'transparent'}
            border={'none'}
            onClick={() => {
              window.location.href = '/appraiser/dashboard'
            }}
          >
            <img src={Logo} alt="logo" height={'46px'} />
          </Box>
          <Box>
            {pages.map((page) => (
              <Button
                key={page.title}
                sx={{
                  textTransform: 'none',
                  fontSize: '14px',
                  marginLeft: '20px',
                  fontWeight: '600',
                  width: 'fit-content'
                }}
                color="inherit"
                href={page.href}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Box>
        <Box marginRight={10}>
          <Box>
            <Button color="inherit" onClick={handleMenuOpen}>
              <Avatar>TV</Avatar>
              <Typography
                marginLeft={2}
                sx={{
                  textTransform: 'none',
                  fontSize: '16px'
                }}
              >
                {user?.name}
              </Typography>
              <ExpandMoreOutlinedIcon />
            </Button>
            <AppraiserMenu
              anchorEl={anchorEl}
              isOpen={Boolean(anchorEl)}
              setOpen={(value) =>
                value ? setAnchorEl(anchorEl) : handleMenuClose()
              }
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AppraiserNavbar
