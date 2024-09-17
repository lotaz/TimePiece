export interface Transaction {
  id: number
  amount: number
  createdAt: string
  transactionType: string
  description: string
  userId: number
  orderId: number
  walletId: number
  watchId: number
}
