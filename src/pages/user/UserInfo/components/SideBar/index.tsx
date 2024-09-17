import React, { useState } from 'react'
import {
  Avatar,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import { User } from '@/pages/item/ManageBuyOrder/type'
import { AppPath } from '@/services/utils'
import useSWR from 'swr'

interface SideBarProps {
  selectedTab: string
  handleTabChange: (tab: string) => void
  userId: number
}

const SideBar = ({ selectedTab, handleTabChange, userId }: SideBarProps) => {
  const [user, setUser] = useState<User | null>(null)

  const { isLoading } = useSWR<User>(AppPath.USER_INFO(userId), {
    onSuccess: (data) => {
      // Update initial values when user data is successfully loaded
      setUser(data)
    }
  })

  return (
    <Box
      sx={{ width: 250, bgcolor: 'background.paper', height: 'fit-content' }}
    >
      {!isLoading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            p: 2
          }}
        >
          <Avatar
            src="path/to/avatar/image" // Replace with your avatar image path
            alt="User Avatar"
            sx={{ width: 60, height: 60 }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              marginLeft: 2
            }}
          >
            <Typography component="div">{user?.name}</Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign={'left'}
              marginRight={2}
            >
              <Box component="span" sx={{ color: 'gold' }}>
                {'★'.repeat(Math.floor(user?.ratingScore ?? 0)) +
                  '☆'.repeat(5 - Math.floor(user?.ratingScore ?? 0))}
              </Box>
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign={'left'}
            >
              {user?.feedbacks} đánh giá
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2
          }}
        >
          <Skeleton variant="circular" width={60} height={60} />
          <Box>
            <Skeleton variant="text" width={100} height={40} />
            <Skeleton variant="text" width={100} height={40} />
          </Box>
        </Box>
      )}
      <List>
        <ListItemButton
          selected={selectedTab === 'personalInfo'}
          onClick={() => handleTabChange('personalInfo')}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#484848',
              color: '#fff'
            },
            '&.Mui-focusVisible': {
              backgroundColor: '#484848',
              color: '#fff'
            },
            '&.MuiListItemButton-root:hover': {
              backgroundColor: '#484848',
              color: '#fff'
            }
          }}
        >
          <ListItemIcon
            sx={{
              color: selectedTab === 'personalInfo' ? '#fff' : '#000'
            }}
          >
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Thông tin cá nhân" />
        </ListItemButton>
        <ListItemButton
          selected={selectedTab === 'accountSettings'}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#484848',
              color: '#fff'
            },
            '&.Mui-focusVisible': {
              backgroundColor: '#484848',
              color: '#fff'
            },
            '&.MuiListItemButton-root:hover': {
              backgroundColor: '#484848',
              color: '#fff'
            }
          }}
          onClick={() => handleTabChange('accountSettings')}
        >
          <ListItemIcon
            sx={{
              color: selectedTab === 'accountSettings' ? '#fff' : '#000'
            }}
          >
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Cài đặt tài khoản" />
        </ListItemButton>
      </List>
    </Box>
  )
}

export default SideBar
