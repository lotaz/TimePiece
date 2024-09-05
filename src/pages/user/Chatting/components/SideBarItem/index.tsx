import { Box, Typography } from '@mui/material'
import { ConversationType } from '../../type'
import { MessageAvatar } from '../ChatMessages'

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
        padding: 1,
        borderRadius: 1,
        cursor: 'pointer',
        width: '24vw',
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
      <MessageAvatar name={item.recipientName} image={item.recipientAvatar} />
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
            color: '#484848',
            fontSize: 12
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
          width: 60,
          height: 60,
          marginLeft: 'auto',
          borderRadius: 8
        }}
      />
    </Box>
  )
}

export default SideBarItem
