export interface INotification {
  id: number
  userId: number
  userName: string
  avatar: string | null
  message: string
  read: boolean
  createdAt: string
}
