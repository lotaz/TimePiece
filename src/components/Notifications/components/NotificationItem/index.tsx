import { Box, Typography, Avatar } from '@mui/material'
import logo from '@/assets/app-logo.png'
import { INotification } from '../../type'
import moment from 'moment'

interface NotificationItemProps {
  data: INotification
}

const NotificationItem = (props: NotificationItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Avatar src={logo} sx={{ marginRight: 2 }} />
      <Box>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 14
          }}
        >
          {props.data.message}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {moment(props.data.createdAt).fromNow()}
        </Typography>
      </Box>
    </Box>
  )
}

export default NotificationItem
