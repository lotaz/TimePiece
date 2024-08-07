import { Watch } from '@/pages/item/ManageBuyOrder/type'

export interface Feedback {
  id: number
  comment: string
  timestamp: string | null
  userId: number
  userName: string
  avatar: string
  rating: number
  orderId: number
  parentFeedbackId: number | null
  childFeedbacks: Feedback[] | null
  watch: Watch
}
