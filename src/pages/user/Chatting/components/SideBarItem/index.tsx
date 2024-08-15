import { Avatar, Box, Typography } from '@mui/material'
import { ConversationType } from '../../type'

interface SideBarItemProps {
  item: ConversationType
  active?: boolean
  onClick: (item) => void
}

const SideBarItem = ({ item, active, onClick }: SideBarItemProps) => {
  return (
    <Box
      component={'div'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderRadius: 1,
        cursor: 'pointer',
        flexDirection: 'row',
        backgroundColor: active ? '#C1C1C1' : 'transparent',
        '&:hover': {
          backgroundColor: '#C1C1C1'
        }
      }}
      onClick={() => {
        onClick(item)
      }}
    >
      <Avatar
        sx={{
          width: 60,
          height: 60
        }}
        src={item.recipientAvatar}
      ></Avatar>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          padding: 2
        }}
      >
        <Typography>{item.recipientName}</Typography>

        <Typography
          sx={{
            color: '#484848'
          }}
          variant={'body2'}
        >
          {item.watchName}
        </Typography>
      </Box>

      <img
        src={item.watchImage}
        alt={item.watchName}
        style={{
          width: 80,
          height: 80,
          marginLeft: 'auto',
          borderRadius: 8
        }}
      />
    </Box>
  )
}

export default SideBarItem
