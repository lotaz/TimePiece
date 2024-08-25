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

interface PaymentPostWatch {
  watchId?: number
  renewalPackageId?: number
}

export const paymentPostWatch = async (req: PaymentPostWatch) => {
  try {
    const res = await axiosClient.get(
      `payment/vn-pay/postWatch?watchId=${req.watchId}&renewalPackageId=${req.renewalPackageId}`
    )

    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
