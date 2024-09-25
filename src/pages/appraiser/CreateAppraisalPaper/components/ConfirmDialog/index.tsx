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
  loading?: boolean // Optional loading state to control the confirm button
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  loading = false // Default loading to false
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận lưu</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn lưu giấy thẩm định này? Không thể sửa sau khi
          đồng ý.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          variant="contained"
          disabled={loading} // Disable the button while loading
          startIcon={loading ? <CircularProgress size={20} /> : null} // Show loading spinner if loading
        >
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
