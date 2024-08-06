import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress
} from '@mui/material'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  isLoading?: boolean
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  isLoading = false
}) => {
  return (
    <Dialog
      open={open}
      onClose={!isLoading ? onClose : undefined} // Prevent close while loading
      sx={{
        boxShadow: 'none'
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isLoading}>
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={20} />}
        >
          {isLoading ? 'Đang xử lý...' : 'Đồng ý'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
