import axiosClient from '@/configs/axiosClient'
import { AppPath } from './utils'
import { convertYesNoToBoolean } from '@/common/utils'

export interface CreateAppraisalRequest {
  name: string
  email: string
  phone: string
  hasBox: string
  hasWarranty: string
  hasInvoice: string
  hasLabel: string
  age: string
  wanaPrice: string
  note: string
  brand: string
  reference: string
  images: File[]
  location: string
}

const createAppraisalRequest = async (req: CreateAppraisalRequest) => {
  try {
    const form = new FormData()
    form.append('name', `${req.name}`)
    form.append('email', `${req.email}`)
    form.append('phoneNumber', `${req.phone}`)
    form.append('hasOriginalBox', `${convertYesNoToBoolean(req.hasBox)}`)
    form.append(
      'hasPapersOrWarranty',
      `${convertYesNoToBoolean(req.hasWarranty)}`
    )
    form.append(
      'hasPurchaseReceipt',
      `${convertYesNoToBoolean(req.hasInvoice)}`
    )
    form.append('areThereAnyStickers', `${convertYesNoToBoolean(req.hasLabel)}`)
    form.append('age', `${req.age}`)
    form.append('region', `${req.location}`)
    form.append('desiredPrice', `${req.wanaPrice}`)
    form.append('description', `${req.note}`)
    form.append('brand', `${req.brand}`)
    form.append('referenceCode', `${req.reference}`)
    form.append('imageFiles', `${req.images}`)

    const response = await axiosClient.post(AppPath.CREATE_APPRAISAL_REQUEST)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { createAppraisalRequest }
