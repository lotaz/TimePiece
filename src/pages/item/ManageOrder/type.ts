import { Role } from '@/common/type'

export interface User {
  id: number
  name: string
  address: string | null
  avatar: string | null
  phoneNumber: string
  status: string | null
  birthday: string
  citizenID: string | null
  dateCreate: string
  gender: string
}

export interface Watch {
  address: string
  createDate: string
  endDate: string | null
  imageUrl: string
  name: string
  numberDatePost: number
  price: number
  size: string
  startDate: string | null
  status: string | null
  typePost: string | null
}

// Updated Order Interface
export interface Order {
  id: number
  note: string | null
  orderDate: string
  status: string
  totalPrice: number
  buyer: User
  seller: User
  watch: Watch
  role: Role
}
