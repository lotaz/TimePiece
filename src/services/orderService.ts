import axiosClient from '@/configs/axiosClient'
import { AppPath } from './utils'

interface CreateOrderRequest {
  watchId: number
  userId: number
}

export const createOrder = async (req: CreateOrderRequest) => {
  try {
    const response = await axiosClient.post(
      `${AppPath.CREATE_ORDER}?watchId=${req.watchId}&userId=${req.userId}`
    )

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateOrder = async (orderId: number, status: string) => {
  try {
    const response = await axiosClient.put(
      AppPath.UPDATE_ORDER(orderId, status)
    )

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
