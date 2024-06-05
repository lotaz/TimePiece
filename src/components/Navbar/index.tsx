import {
  AppBar,
  Avatar,
  Box,
  Button,
  InputBase,
  Toolbar,
  Typography,
  alpha,
  styled
} from '@mui/material'
import Logo from '@/assets/app-logo.png'
import SearchIcon from '@mui/icons-material/Search'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswerOutlined'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined'
import ArticleIcon from '@mui/icons-material/ArticleOutlined'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import { AuthenticateType } from '@/pages/Authenticate/type'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

const pages = [
  { title: 'Thương Hiệu', href: '/' },
  { title: 'Đồng Hồ Nam', href: '/' },
  { title: 'Đồng Hồ Nữ', href: '/' }
]

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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'white'
  },
  '& .MuiInputBase-input:focus': {
    borderColor: 'white'
  }
}))

const StyledLogo = styled('img')({
  height: '46px'
})

const Navbar = () => {
  const { user } = useContext(AuthContext)

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
        <Box marginLeft={4}>
          <StyledLogo src={Logo} alt="logo" />
        </Box>
        <Box>
          {pages.map((page) => (
            <Button
              key={page.title}
              sx={{
                textTransform: 'none',
                fontSize: '16px',
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
        <Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>
        <Box>
          <Button color="inherit">
            <NotificationsIcon fontSize="large" />
          </Button>
          <Button color="inherit">
            <QuestionAnswerIcon fontSize="large" />
          </Button>
          <Button color="inherit">
            <ShoppingCartIcon fontSize="large" />
          </Button>
          <Button color="inherit" href="/post/manage">
            <ArticleIcon fontSize="large" />
          </Button>
        </Box>
        <Box marginRight={10}>
          {user ? (
            <Button color="inherit">
              <Avatar>TN</Avatar>
              <Typography
                marginLeft={2}
                sx={{
                  textTransform: 'none',
                  fontSize: '16px'
                }}
              >
                {user.name}
              </Typography>
              <ExpandMoreOutlinedIcon />
            </Button>
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