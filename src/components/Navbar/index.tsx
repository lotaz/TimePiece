import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  InputBase,
  Toolbar,
  Typography,
  Skeleton,
  Badge
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
import NotificationModal from '../Notifications'
import { INotification } from '../Notifications/type'
import { CompatClient, Message, Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client/dist/sockjs.js'

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
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const [userState, setUserState] = useState<User>()
  const token = useMemo(() => localStorage.getItem('token'), [])
  const user = useMemo(() => {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null
  }, [])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [listNotification, setListNotification] = useState<INotification[]>([])
  const [newNotification, setNewNotification] = useState<boolean>(false)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget)
    setOpenNotification((prev) => !prev)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault()
    navigate(`/item/product?keyword=${searchQuery}`)
  }
  const { data: userInfo, isLoading } = useSWR(
    user && AppPath.USER_INFO(user?.id)
  )
  const { data: notify, isLoading: notifyLoading } = useSWR(
    user && AppPath.GET_NOTIFICATION(user?.id),
    {
      onSuccess: (data) => {
        setListNotification(data)
      }
    }
  )

  useEffect(() => {
    if (userInfo) {
      setUserState(userInfo)
    }
  }, [userInfo])

  const hasAuth = user

  const clientRef = useRef<CompatClient | null>(null)
  const reconnectAttemptsRef = useRef<number>(0)
  const maxReconnectAttempts = 5
  const reconnectDelay = useRef(5000) // 5 seconds delay between reconnection attempts

  const handleReconnect = useCallback(() => {
    if (reconnectAttemptsRef.current < maxReconnectAttempts) {
      setTimeout(() => {
        reconnectAttemptsRef.current += 1
        console.log(
          `Attempting to reconnect... (${reconnectAttemptsRef.current})`
        )
        connectSocket() // Try to reconnect
      }, reconnectDelay.current)
      reconnectDelay.current *= 2 // Exponential backoff
    } else {
      console.error(
        'Max reconnect attempts reached. Could not reconnect to WebSocket.'
      )
    }
  }, [])

  const connectSocket = useCallback(() => {
    if (user && token) {
      const sock = new SockJS(`https://timepiece.onrender.com/ws`)
      const client = Stomp.over(sock)
      clientRef.current = client

      client.connect(
        {
          Authorization: `Bearer ${token}`
        },
        () => {
          reconnectAttemptsRef.current = 0 // Reset reconnect attempts on successful connection

          client.subscribe(`/topic/notifications/${user.id}`, (message) => {
            const data: INotification = JSON.parse(message.body)

            console.log('Received message:', data)

            // Update notifications and set flag to indicate new notification
            setListNotification((prev) => [data, ...prev])
            setNewNotification(true)
          })
        },
        (error) => {
          console.error('WebSocket connection error:', error)
          handleReconnect() // Attempt to reconnect on error
        }
      )
    }
  }, [user, token, handleReconnect])

  useEffect(() => {
    connectSocket()

    return () => {
      if (clientRef.current && clientRef.current.connected) {
        clientRef.current.disconnect(() => {
          console.log('Disconnected from WebSocket')
        })
      }
    }
  }, [connectSocket])

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

        <Box>
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
          <Badge
            color="error"
            variant="dot"
            invisible={!newNotification}
            overlap="circular"
          >
            <Button color="inherit" onClick={handleNotificationClick}>
              <NotificationsNoneOutlinedIcon fontSize="large" />
            </Button>
          </Badge>
          <NotificationModal
            open={openNotification}
            anchorEl={notificationAnchorEl}
            handleClose={() => setOpenNotification(false)}
            notifications={listNotification}
            setNewNotification={setNewNotification}
          />
          <Button color="inherit" href="/user/conversation">
            <QuestionAnswerIcon fontSize="large" />
          </Button>
          <Button color="inherit" href="/post/manage-post">
            <ArticleIcon fontSize="large" />
          </Button>
        </Box>
        <Box marginRight={10}>
          {isLoading && !useState ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : hasAuth ? (
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
