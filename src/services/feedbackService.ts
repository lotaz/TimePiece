import axiosClient from '@/configs/axiosClient'

interface CreateFeedback {
  comment: string
  orderId: number
  userId: number
  parentFeedbackId?: number
  rating: number
}

export const createFeedback = async (data: CreateFeedback) => {
  try {
    const response = await axiosClient.post(
      '/api/feedbacks/CreateFeedback',
      data
    )

    return response.data
  } catch (error) {
    console.log('Failed to create feedback', error)
    throw error
  }
}
