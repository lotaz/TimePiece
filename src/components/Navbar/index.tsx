import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  InputBase,
  Toolbar,
  Typography
} from '@mui/material'
import Logo from '@/assets/app-logo.png'
import SearchIcon from '@mui/icons-material/Search'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswerOutlined'
import ArticleIcon from '@mui/icons-material/ArticleOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import { AuthenticateType } from '@/pages/authentication/Authenticate/type'
import UserMenu from '../UserMenu'
import { alpha, styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import MenuPopover from '../MenuPopover'
import { stringAvatar } from '@/common/utils'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import { User } from '@/pages/item/ManageBuyOrder/type'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(6),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '14vw'
    }
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'white'
  },
  '& .MuiInputBase-input:focus': {
    borderColor: 'white'
  }
}))

const Navbar = () => {
  const navigate = useNavigate()
  const [userState, setUserState] = useState<User>()
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault()
    navigate(`/item/product?keyword=${searchQuery}`)
  }
  const { data: userInfo, isLoading } = useSWR(AppPath.USER_INFO(user?.id))

  useEffect(() => {
    if (userInfo) {
      setUserState(userInfo)
    }
  }, [userInfo])

  const hasAuth = user

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#4E4E4E',
        width: '100%',
        paddingY: 1
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box
          marginLeft={4}
          component={'button'}
          bgcolor={'transparent'}
          border={'none'}
          onClick={() => {
            window.location.href = '/'
          }}
        >
          <img src={Logo} alt="logo" height={'46px'} />
        </Box>

        <Box sx={{ marginRight: 10 }}>
          <MenuPopover buttonLabel="Danh mục" />
          <Button
            sx={{
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: '600',
              width: 'fit-content'
            }}
            color="inherit"
            href="/appraisal/online-form"
          >
            Thẩm định
          </Button>
        </Box>
        <Box component="form" onSubmit={handleSearchSubmit}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Search>
        </Box>
        <Box>
          <Button color="inherit">
            <NotificationsNoneOutlinedIcon fontSize="large" />
          </Button>
          <Button color="inherit">
            <QuestionAnswerIcon fontSize="large" />
          </Button>
          <Button color="inherit" href="/post/manage-post">
            <ArticleIcon fontSize="large" />
          </Button>
        </Box>
        <Box marginRight={10}>
          {hasAuth ? (
            <Box>
              <Button color="inherit" onClick={handleMenuOpen}>
                {userState?.avatar ? (
                  <Avatar src={userState?.avatar} />
                ) : (
                  <Avatar {...stringAvatar(user.name)} />
                )}

                <Typography
                  marginLeft={2}
                  marginRight={1}
                  sx={{
                    textTransform: 'none'
                  }}
                >
                  {user?.name}
                </Typography>
                <ExpandMoreOutlinedIcon />
              </Button>
              <UserMenu
                anchorEl={anchorEl}
                isOpen={Boolean(anchorEl)}
                setOpen={(value) =>
                  value ? setAnchorEl(anchorEl) : handleMenuClose()
                }
              />
            </Box>
          ) : (
            <Button
              color="primary"
              variant="contained"
              href={`/authenticate/${AuthenticateType.Login}`}
            >
              <Typography
                sx={{
                  textTransform: 'none',
                  fontSize: '16px'
                }}
              >
                Đăng nhập
              </Typography>
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
