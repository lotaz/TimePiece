import axiosClient from '@/configs/axiosClient'

export const AppPath = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  CREATE_APPRAISAL_REPORT: '/api/appraisal-report/create',
  CREATE_APPRAISAL_REQUEST: '/api/appraisal-requests/create',
  GET_APPRAISAL_REQUESTS: '/api/appraisal-requests/getAllList',
  GET_APPRAISAL_REQUESTS_BY_ID: '/api/appraisal-requests',
  GET_BRANDS: '/api/brands/getAll',
  GET_TOP12_WATCHES: '/api/watches/top12/Approved',
  GET_WATCH_BY_ID: (id) => `/api/watches/${id}/getWatchById`,
  USER_INFO: (id) => `/api/users/${id}`,
  SEARCH_BY_KEYWORD: ({ keyword, page, size }) =>
    `/api/watches/searchWatchByKeyword?keyword=${keyword}&page=${page}&size=${size}`
}

export const fetcher = (url) => axiosClient.get(url).then((res) => res.data)
