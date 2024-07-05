import UserLayout from '@/components/Layout/UserLayout'
import SideBar from './components/SideBar'
import { Box } from '@mui/material'
import { useState } from 'react'
import UserInfoTab from './components/UserInfoTab'
import SettingTab from './components/UserSettingTab'

const UserInfo = () => {
  const [selectedTab, setSelectedTab] = useState('personalInfo')

  const tab = () => {
    switch (selectedTab) {
      case 'personalInfo':
        return <UserInfoTab />
      case 'accountSettings':
        return <SettingTab />
      default:
        return <UserInfoTab />
    }
  }

  return (
    <UserLayout>
      <Box
        sx={{
          marginX: 16,
          marginTop: 12,
          marginBottom: 4,
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          minHeight: 'calc(100vh - 340px)'
        }}
      >
        <SideBar selectedTab={selectedTab} handleTabChange={setSelectedTab} />
        <Box>{tab()}</Box>
      </Box>
    </UserLayout>
  )
}

export default UserInfo
