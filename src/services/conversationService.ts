import axiosClient from '@/configs/axiosClient'
import { AppPath } from './utils'

interface CreateConversationRequest {
  senderId: number
  recipientId: number
  watchId: number
}

const startConversation = async (req: CreateConversationRequest) => {
  try {
    const res = await axiosClient.post(AppPath.START_CONVERSATION, req)

    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { startConversation }
