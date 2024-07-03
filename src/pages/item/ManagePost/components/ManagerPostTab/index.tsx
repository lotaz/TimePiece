import React from 'react'
import { Avatar, Box, Button, Tab, Tabs, Typography } from '@mui/material'

interface ManagerPostTabProps {
  name: string
  avatar?: string
  currentTab?: number
  setTab: (tab: number) => void
}

const tab = [
  {
    id: 0,
    name: 'Đang hiển thị',
    total: 10
  },
  {
    id: 1,
    name: 'Chờ duyệt',
    total: 20
  },
  {
    id: 2,
    name: 'Bị từ chôi',
    total: 20
  },
  {
    id: 3,
    name: 'Đã bán/Đã ẩn',
    total: 20
  }
]

const ManagerPostTab: React.FC<ManagerPostTabProps> = ({
  name,
  avatar,
  currentTab,
  setTab
}) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <Box>
      <Box component={'div'} flex={1} flexDirection={'column'} width={'full'}>
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 4,
            bgcolor: 'background.paper'
          }}
        >
          <Box display="flex" alignItems="center" flex="1">
            <Avatar
              src={avatar}
              alt={name}
              sx={{ width: 76, height: 76, marginRight: 2 }}
            >
              {avatar ? null : 'ABC'}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: '500' }}>
              {name}
            </Typography>
          </Box>
          <Box ml={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#434343',
                width: '200px',
                height: '50px',
                '&:hover': {
                  backgroundColor: '#333333'
                }
              }}
              href="/post/create"
            >
              Đăng tin
            </Button>
          </Box>
        </Box>
        <Box borderBottom="1px solid #E6E6E6" width="100%" />
      </Box>
      <Tabs value={currentTab} onChange={handleChange}>
        {tab.map((item) => (
          <Tab key={item.id} label={`${item.name} (${item.total})`} />
        ))}
      </Tabs>
    </Box>
  )
}

export default ManagerPostTab
