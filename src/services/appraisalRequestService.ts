import axiosClient from '@/configs/axiosClient'
import { AppPath } from './utils'

export interface CreateAppraisalRequest {
  name: string
  email: string
  phoneNumber: string
  hasOriginalBox: boolean
  hasPapersOrWarranty: boolean
  hasPurchaseReceipt: boolean
  areThereAnyStickers: boolean
  age: number
  region: string
  desiredPrice: number
  description: string
  brand: string
  referenceCode: string
  imageFiles: unknown[]
}

const createAppraisalRequest = async (req: CreateAppraisalRequest) => {
  try {
    const form = new FormData()
    form.append('name', `${req.name}`)
    form.append('email', `${req.email}`)
    form.append('phoneNumber', `${req.phoneNumber}`)
    form.append('hasOriginalBox', `${req.hasOriginalBox}`)
    form.append('hasPapersOrWarranty', `${req.hasPapersOrWarranty}`)
    form.append('hasPurchaseReceipt', `${req.hasPurchaseReceipt}`)
    form.append('areThereAnyStickers', `${req.areThereAnyStickers}`)
    form.append('age', `${req.age}`)
    form.append('region', `${req.region}`)
    form.append('desiredPrice', `${req.desiredPrice}`)
    form.append('description', `${req.description}`)
    form.append('brand', `${req.brand}`)
    form.append('referenceCode', `${req.referenceCode}`)
    form.append('imageFiles', `${req.imageFiles}`)

    const response = await axiosClient.post(AppPath.CREATE_APPRAISAL_REQUEST)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { createAppraisalRequest }
