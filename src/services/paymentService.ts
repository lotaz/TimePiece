import axiosClient from '@/configs/axiosClient'
import { AppPath } from './utils'

export const paymentVNPay = async (orderId: string) => {
  try {
    const res = await axiosClient.get(AppPath.PAYMENT_VNPAY(orderId))

    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
