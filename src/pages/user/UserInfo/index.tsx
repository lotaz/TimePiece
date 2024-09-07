import SideBar from './components/SideBar'
import { Box } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import UserInfoTab from './components/UserInfoTab'
import SettingTab from './components/UserSettingTab'
import { useNavigate } from 'react-router-dom'

const UserInfo = () => {
  const navigate = useNavigate()
  const user = useMemo(() => {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null
  }, [])

  useEffect(() => {
    if (!user) {
      navigate('/authenticate/login')
    }
  }, [navigate, user])

  const [selectedTab, setSelectedTab] = useState('personalInfo')

  const tab = () => {
    switch (selectedTab) {
      case 'personalInfo':
        return <UserInfoTab userId={user.id} />
      case 'accountSettings':
        return <SettingTab userId={user.id} />
      default:
        return <UserInfoTab userId={user.id} />
    }
  }

  return (
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
  )
}

export default UserInfo
