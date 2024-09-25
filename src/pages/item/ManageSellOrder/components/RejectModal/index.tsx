import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material'
import { AppPath } from '@/services/utils'
import useSWR, { mutate } from 'swr'
import { rejectOrder } from '@/services/orderService'
import { toast } from 'react-toastify'

interface RejectModalProps {
  userId: number
  orderId: number | null
  isOpen: boolean
  onClose: () => void
}

interface RejectReason {
  id: number
  reason: string
}

const RejectModal: React.FC<RejectModalProps> = ({
  userId,
  orderId,
  isOpen,
  onClose
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch rejection reasons
  const { data: reasons, isLoading } = useSWR<RejectReason[]>(
    AppPath.GET_CANCEL_REASON,
    {
      onError: () => console.error('Failed to fetch reasons')
    }
  )

  const handleReject = async () => {
    if (!selectedReason) return

    setIsSubmitting(true)
    try {
      const reasonId = reasons?.find(
        (reason) => reason.reason === selectedReason
      )?.id
      if (reasonId !== undefined && orderId !== null) {
        await rejectOrder(reasonId, orderId)
          .then((res) => {
            if (res) {
              toast.success('Đã từ chối đơn hàng', {
                autoClose: 3000
              })
            }
            mutate(AppPath.GET_SELLER_ORDERS(userId))
            onClose()
          })
          .catch((error) => {
            console.error('Failed to reject order:', error)
            toast.error('Đã xảy ra lỗi. Vui long thử lại sau.', {
              autoClose: 3000
            })
          })
          .finally(() => {
            setIsSubmitting(false)
          })
      }
      mutate(AppPath.GET_BUYER_ORDERS(userId))
      onClose()
    } catch (error) {
      console.error('Failed to reject order:', error)
    } finally {
      setIsSubmitting(false)
      setSelectedReason('')
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose()
        setSelectedReason('')
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Từ chối đơn hàng</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <FormControl fullWidth>
            <Select
              labelId="reject-reason-label"
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value as string)}
              fullWidth
            >
              {reasons?.map((reason) => (
                <MenuItem key={reason.id} value={reason.reason}>
                  {reason.reason}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Lý do từ chối sẽ được gửi đến người mua
            </FormHelperText>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose()
            setSelectedReason('')
          }}
          disabled={isSubmitting}
        >
          Hủy bỏ
        </Button>
        <Button
          onClick={handleReject}
          color="primary"
          variant="contained"
          disabled={!selectedReason || isSubmitting}
          startIcon={isSubmitting && <CircularProgress size={20} />}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RejectModal
