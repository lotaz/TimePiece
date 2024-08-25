import { alpha, Box, InputBase, styled, Skeleton } from '@mui/material'
import { ConversationType } from '../../type'
import SideBarItem from '../SideBarItem'
import SearchIcon from '@mui/icons-material/Search'

interface ChattingSideBarProps {
  item: ConversationType[]
  active?: number | null
  onClick: (item: ConversationType) => void
  loading?: boolean
  search?: string
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
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
  width: '100%',
  border: '1px solid #C1C1C1',
  borderRadius: theme.shape.borderRadius,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

const ChattingSideBar = ({
  item,
  active,
  onClick,
  loading,
  search,
  handleSearch
}: ChattingSideBarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fff',
        minWidth: '16vw',
        minHeight: 'calc(100vh - 30vh)',
        maxHeight: 'calc(100vh - 26vh)',
        borderRight: '1px solid #f0f0f0'
      }}
    >
      <Box
        sx={{
          padding: 2
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Tìm kiếm trò chuyện"
            inputProps={{ 'aria-label': 'search' }}
            value={search}
            onChange={handleSearch}
          />
        </Search>
      </Box>
      <Box
        sx={{
          overflowY: 'auto',
          height: 'calc(100vh - 28vh)'
        }}
      >
        {loading
          ? Array.from(new Array(5)).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                  borderRadius: 1,
                  cursor: 'pointer',
                  flexDirection: 'row',
                  '&:hover': {
                    backgroundColor: 'primary.light'
                  }
                }}
              >
                <Skeleton variant="circular" width={40} height={40} />
                <Box
                  sx={{
                    marginLeft: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                  }}
                >
                  <Skeleton width="60%" height={24} />
                  <Skeleton width="40%" height={24} />
                </Box>
                <Skeleton variant="rectangular" width={50} height={50} />
              </Box>
            ))
          : item?.map((item, index) => (
              <SideBarItem
                key={index}
                item={item}
                active={item.conversationId === active}
                onClick={() => onClick(item)}
              />
            ))}
      </Box>
    </Box>
  )
}

export default ChattingSideBar
