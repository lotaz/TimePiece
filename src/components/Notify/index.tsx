import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Enums for NotifyType and NotifyStatus
export enum NotifyType {
  DEPOSIT = 'deposit',
  ORDER_PAYMENT = 'order_payment',
  POST_WATCH_PAYMENT = 'post_watch_payment'
}

export enum NotifyStatus {
  SUCCESS = 'success',
  FAILED = 'failed'
}

const NotificationHandler = () => {
  const location = useLocation()

  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(location.search)
    const paymentStatus = params.get('paymentStatus')
    const type = params.get('type')

    // Function to trigger notifications
    const triggerNotification = (status: string, type: string) => {
      if (status === NotifyStatus.SUCCESS && type === NotifyType.DEPOSIT) {
        toast.success('Nạp tiền thành công!')
      } else if (
        status === NotifyStatus.FAILED &&
        type === NotifyType.DEPOSIT
      ) {
        toast.error('Nạp tiền thất bại!')
      } else if (
        status === NotifyStatus.SUCCESS &&
        type === NotifyType.ORDER_PAYMENT
      ) {
        toast.success('Thanh toán đơn hàng thành công!')
      } else if (
        status === NotifyStatus.FAILED &&
        type === NotifyType.ORDER_PAYMENT
      ) {
        toast.error('Thanh toán đơn hàng thất bại!')
      } else if (
        status === NotifyStatus.SUCCESS &&
        type === NotifyType.POST_WATCH_PAYMENT
      ) {
        toast.success('Thanh toán bài đăng thành công!')
      } else if (
        status === NotifyStatus.FAILED &&
        type === NotifyType.POST_WATCH_PAYMENT
      ) {
        toast.error('Thanh toán bài đăng thất bại!')
      }
    }

    // Trigger the notification based on URL parameters
    if (paymentStatus && type) {
      triggerNotification(paymentStatus, type)
    }
  }, [location.search])

  return null // This component does not render any visible elements
}

export default NotificationHandler
