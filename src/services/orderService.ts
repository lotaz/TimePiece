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

export const completeOrder = async (orderId: number) => {
  try {
    const response = await axiosClient.put(AppPath.COMPLETE_ORDER(orderId))

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const rejectOrder = async (reasonId: number, orderId: number) => {
  try {
    const response = await axiosClient.post('/orders/cancel', {
      reasonId: reasonId,
      orderId: orderId
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
