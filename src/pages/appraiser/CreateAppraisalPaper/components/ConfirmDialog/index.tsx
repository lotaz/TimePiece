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
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm
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
