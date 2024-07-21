import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        boxShadow: 'none'
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(32, 29, 29, 0.26)'
        }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
