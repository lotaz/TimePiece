import {
  Box,
  Popper,
  Paper,
  ClickAwayListener,
  Typography
} from '@mui/material'
import NotificationItem from './components/NotificationItem'
import { INotification } from './type'
import { useEffect } from 'react'

interface NotificationModalProps {
  open: boolean
  anchorEl: HTMLElement | null
  handleClose: () => void
  notifications: INotification[]
  setNewNotification: (value: boolean) => void
}

const NotificationModal = ({
  open,
  anchorEl,
  handleClose,
  notifications,
  setNewNotification // Get the state setter
}: NotificationModalProps) => {
  // Reset newNotification when the modal is opened
  useEffect(() => {
    if (open) {
      setNewNotification(false)
    }
  }, [open, setNewNotification])

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-end"
      style={{ zIndex: 1300 }}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Paper
          sx={{
            width: 300,
            marginTop: 1,
            maxHeight: 400, // Set max height
            overflowY: 'auto' // Allow scrolling
          }}
        >
          <Box sx={{ padding: 2 }}>
            {notifications.length > 0 ? (
              notifications
                .slice()
                .reverse()
                .map((notification) => (
                  <NotificationItem key={notification.id} data={notification} />
                ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No notifications.
              </Typography>
            )}
          </Box>
        </Paper>
      </ClickAwayListener>
    </Popper>
  )
}

export default NotificationModal
