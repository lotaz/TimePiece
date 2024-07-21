import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
  Skeleton
} from '@mui/material'
import { stringAvatar } from '@/common/utils'

interface ManagerPostTabProps {
  name: string
  currentTab?: number
  setTab: (tab: number) => void
  showTotal?: number
  hiddenTotal?: number
  isLoading?: boolean
}

const ManagerPostTab: React.FC<ManagerPostTabProps> = ({
  name,
  currentTab,
  setTab,
  showTotal,
  hiddenTotal,
  isLoading
}) => {
  const tab = [
    {
      id: 0,
      name: 'Đang hiển thị',
      total: showTotal
    },
    {
      id: 1,
      name: 'Đã bán/Đã ẩn',
      total: hiddenTotal
    }
  ]

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
            p: 4
          }}
        >
          <Box display="flex" alignItems="center" flex="1">
            {isLoading ? (
              <>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton
                  variant="text"
                  width={150}
                  height={40}
                  sx={{ marginLeft: 2 }}
                />
              </>
            ) : (
              <>
                <Avatar {...stringAvatar(name, 3)} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: '500', marginLeft: 2 }}
                >
                  {name}
                </Typography>
              </>
            )}
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
              href="/post/create-post"
            >
              Đăng tin
            </Button>
          </Box>
        </Box>
        <Box borderBottom="1px solid #E6E6E6" width="100%" />
      </Box>
      <Tabs value={currentTab} onChange={handleChange}>
        {tab.map((item) => (
          <Tab
            key={item.id}
            label={
              isLoading ? (
                <Skeleton variant="text" width={100} />
              ) : (
                `${item.name} (${item.total})`
              )
            }
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default ManagerPostTab
