import { SearchParams } from '@/common/type'
import axiosClient from '@/configs/axiosClient'
import { boolean } from 'yup'

export const AppPath = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  CREATE_APPRAISAL_REPORT: '/api/appraisal-report/create',
  CREATE_APPRAISAL_REQUEST: '/api/appraisal-requests/create',
  CREATE_WATCH: '/api/watches/createNewWatch',
  GET_APPRAISAL_REQUESTS: '/api/appraisal-requests/getAllList',
  GET_APPRAISAL_REQUESTS_BY_ID: '/api/appraisal-requests',
  GET_BRANDS: '/api/brands/getAll',
  GET_TYPES: '/api/watch-types/getAll',
  GET_TOP12_WATCHES: '/api/watches/top12/Approved',
  GET_WATCH_BY_USER: (id) => `/api/watches/user/${id}`,
  GET_WATCH_BY_ID: (id) => `/api/watches/${id}/getWatchById`,
  SEARCH_WATCH: (params: SearchParams) => {
    const {
      keyword,
      minPrice,
      maxPrice,
      area,
      type,
      brand,
      watchStatus,
      status,
      accessories,
      name,
      page = 1,
      size = 12
    } = params

    let url = `/api/watches/searchWatchByKeywordAndFilter?page=${page - 1}&size=${size}`

    if (keyword) url += `&keyword=${keyword}`
    if (minPrice !== undefined) url += `&minPrice=${minPrice}`
    if (maxPrice !== undefined) url += `&maxPrice=${maxPrice}`
    if (area && area.length > 0) url += `&area=${area.join(',')}`
    if (type && type.length > 0) url += `&type=${type.join(',')}`
    if (brand && brand.length > 0) url += `&brand=${brand.join(',')}`
    if (watchStatus && watchStatus.length > 0)
      url += `&watchStatus=${watchStatus.join(',')}`
    if (status && status.length > 0) url += `&status=${status.join(',')}`
    if (accessories && accessories.length > 0)
      url += `&accessories=${accessories.join(',')}`
    if (name) url += `&name=${name}`

    return url
  },
  USER_INFO: (id) => `/api/users/${id}`,
  CREATE_ORDER: '/orders/create',
  GET_ORDER: (id) => `/orders/${id}`,
  UPDATE_ORDER: (id: number, status: string) =>
    `/orders/${id}/status?status=${status}`,
  GET_SELLER_ORDERS: (id) => `/orders/seller/${id}`,
  GET_BUYER_ORDERS: (id) => `/orders/buyer/${id}`,
  GET_FEEDBACKS_BY_WATCH_ID: (id) => `/api/feedbacks/watch/${id}`,
  GET_APPRAISAL_BUY_USER: ({ id, page, size }) =>
    `/api/appraisal-requests/findByUser?userId=${id}&page=${page}&size=${size}`,
  GET_FEEDBACKS_BY_SELLER_ID: (id) => `/api/feedbacks/seller/${id}`,
  GET_CONVERSATION: (id) => `/api/conversations/user/${id}`,
  GET_MESSAGES: (id) => `/api/messages/${id}/messages`,
  START_CONVERSATION: '/api/conversations/start',
  PAYMENT_VNPAY: (orderID, mode) =>
    `/payment/vn-pay?orderId=${orderID}&isLocal=${mode}`,
  GET_RENEWAL_PACKAGE: '/api/renewal-packages/GetAllRenewalPakage',
  GET_NOTIFICATION: (id) => `/notifications/user/${id}`,
  GET_WATCHES_MODEL: '/model',
  COMPLETE_ORDER: (id) => `/orders/${id}/complete`,
  USER_BALANCE: (id) => `/api/wallet/user/${id}/balance`,
  TRANSACTIONS: '/api/transactions',
  DEPOSIT_REQUEST: (userId) => `/api/wallet/${userId}/balance`,
  DEPOSIT: (amount, userId, isLocal) =>
    `/api/wallet/vn-pay?amount=${amount}&userId=${userId}&isLocal=${isLocal}`
}

export const fetcher = (url) => axiosClient.get(url).then((res) => res.data)
