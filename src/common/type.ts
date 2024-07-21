export enum Role {
  SELLER = 'Seller',
  BUYER = 'Buyer',
  APPRAISER = 'Appraiser',
  ADMIN = 'Admin'
}

export interface Pagination {
  page: number
  size: number
}

export enum AppraisalStatus {
  WAIT = 'wait',
  COMPLETE = 'complete',
  PROCESSING = 'processing'
}

export enum AppraisalStatusVietnamese {
  wait = 'Chờ',
  complete = 'Hoàn thành',
  processing = 'Đang xử lý'
}

export enum ProductStatus {
  hasBox = 'Còn hộp',
  hasAccessories = 'Còn phụ kiện',
  noBox = 'Không hộp',
  noAccessories = 'Không phụ kiện'
}

export enum Area {
  HANOI = 'Hà Nội',
  HCM = 'Hồ Chí Minh',
  DANANG = 'Đà Nẵng',
  OTHER = 'Khác'
}

export enum OrderStatus {
  WAIT = 'wait',
  APPROVED = 'Approved',
  CANCELED = 'Cancel'
}

export interface SearchParams {
  keyword?: string
  minPrice?: number
  maxPrice?: number
  area?: string
  type?: string
  brand?: string
  watchStatus?: string
  status?: string
  accessories?: string
  name?: string
  page?: number
  size?: number
}
