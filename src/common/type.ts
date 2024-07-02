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
