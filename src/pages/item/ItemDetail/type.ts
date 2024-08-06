export interface WatchDetail {
  id: number
  userId?: number
  userName?: string
  userAvatar?: string
  userPhoneNumber?: string
  userRatingScore?: number | null
  name: string
  watchStatus: string
  status: string
  description: string
  price: number
  brandName: string
  yearProduced: number
  model: string
  material: string
  watchStrap: string
  size: string
  accessories: string
  referenceCode: string
  placeOfProduction: string
  address: string
  area: string
  createDate: string
  updateDate: string
  watchTypeName: string
  watchImages: string[]
  startDate: string | null
  endDate: string | null
  numberDatePost: number
  feedbacks: unknown[] // Assuming feedbacks is an array of objects
  hasAppraisalCertificate: boolean
  appraisalCertificateUrl?: string
}
