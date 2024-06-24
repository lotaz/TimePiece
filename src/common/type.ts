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
