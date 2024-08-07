import axiosClient from '@/configs/axiosClient'
import { AppPath } from './utils'
import { convertYesNoToBoolean } from '@/common/utils'
import moment from 'moment'

export interface CreateAppraisalRequest {
  name: string
  email: string
  phone: string
  address: string
  hasBox: string
  hasWarranty: string
  hasInvoice: string
  hasLabel: string
  age: string
  wanaPrice: string
  note: string
  brand: string
  reference: string
  images: Blob[]
  apptDateTime: string | null
  apptLocation: string
}

const createAppraisalRequest = async (req: CreateAppraisalRequest) => {
  try {
    const form = new FormData()
    form.append('name', `${req.name}`)
    form.append('email', `${req.email}`)
    form.append('phoneNumber', `${req.phone}`)
    form.append('address', `${req.address}`)
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
    form.append('desiredPrice', `${req.wanaPrice}`)
    form.append('description', `${req.note}`)
    form.append('brand', `${req.brand}`)
    form.append('referenceCode', `${req.reference}`)
    req.images.forEach((file) => {
      form.append(`imageFiles`, file)
    })
    form.append(
      'appointmentDate',
      `${moment(req.apptDateTime).format('DD-MM-YYYY HH:mm:ss')}`
    )
    form.append('appraisalLocation', `${req.apptLocation}`)

    const response = await axiosClient.post(
      AppPath.CREATE_APPRAISAL_REQUEST,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getDetailAppraisalRequest = async (id: string) => {
  try {
    const response = await axiosClient.get(
      `${AppPath.GET_APPRAISAL_REQUESTS}/${id}`
    )

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { createAppraisalRequest, getDetailAppraisalRequest }
