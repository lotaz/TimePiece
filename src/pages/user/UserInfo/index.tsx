import UserLayout from '@/components/Layout/UserLayout'
import SideBar from './components/SideBar'
import { Box } from '@mui/material'
import YesNoSelection from '@/components/Controls/YesNoSelection'
import { ChangeEvent, useState } from 'react'

const UserInfo = () => {
  const [value, setValue] = useState('yes')
  return (
    <UserLayout>
      <Box
        sx={{
          margin: 16
        }}
      >
        <SideBar />
        <YesNoSelection
          name={''}
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value)
          }}
        />
      </Box>
    </UserLayout>
  )
}

export default UserInfo
