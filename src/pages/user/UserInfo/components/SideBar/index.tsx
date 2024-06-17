import React, { useState } from 'react'
import {
  Avatar,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'

const SideBar = () => {
  const [selectedTab, setSelectedTab] = useState('personalInfo')

  const handleTabChange = (tab) => {
    setSelectedTab(tab)
  }

  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper' }}>
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
          <Typography variant="h6" component="div">
            Thắng fake 2
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Đánh giá{' '}
            <span role="img" aria-label="crown">
              👑
            </span>
          </Typography>
        </Box>
      </Box>
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
