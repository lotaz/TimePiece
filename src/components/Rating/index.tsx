import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  TextField,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { createFeedback } from '@/services/feedbackService'
import { useNavigate } from 'react-router-dom'

interface RatingModalProps {
  open: boolean
  onClose: () => void
  orderId: number
}

const RatingModal: React.FC<RatingModalProps> = ({
  open,
  onClose,
  orderId
}) => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null
  const [rating, setRating] = useState<number | null>(0)
  const [feedback, setFeedback] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (rating) {
      const data = await createFeedback({
        comment: feedback,
        orderId: orderId,
        userId: user.id,
        rating: rating
      })

      if (data) {
        navigate(`/`)
        onClose()
      }
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Đánh giá giao dịch
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <Rating
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue)
            }}
            size="large"
          />
        </Box>
        <Typography variant="subtitle1" textAlign="center" mb={1}>
          Cuộc giao dịch như thế nào?
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Để lại phản hồi"
          variant="outlined"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
        >
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RatingModal
