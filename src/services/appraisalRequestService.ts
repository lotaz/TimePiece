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

interface CompleteAppraisalRequest {
  id: number // appraisalRequestId
  pdfUrl: string
}

const completeAppraisalRequest = async (req: CompleteAppraisalRequest) => {
  try {
    const data = await axiosClient.post(
      `/api/appraisal-requests/complete-request/${req.id}?pdfUrl=${req.pdfUrl}`
    )

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

interface RatingAppraisalRequest {
  id: string
  rating: number
}

const ratingAppraisalRequest = async (req: RatingAppraisalRequest) => {
  try {
    const data = await axiosClient.post(
      `/api/appraisal-request/${req.id}/feedback?ratingScore=${req.rating}`
    )

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
interface CreateAppraisalPaper {
  brandId: number | null
  modelId: number | null
  materialId: number | null
  watchStrapId: number | null
  sizeId: number | null
  referenceCode: string | null
  watchTypeId: number | null
  yearProduced: string | null
  watchStatus: string | null
  accessories: string | null
  origin: string | null
  userId: number | null
  commentValue: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageFiles: any[]
  isAuthentic: boolean
}

const createAppraisal = async (req: CreateAppraisalPaper) => {
  const form = new FormData()

  // Append only if value is not null
  if (req.brandId !== null) form.append('brandId', `${req.brandId}`)
  if (req.modelId !== null) form.append('modelId', `${req.modelId}`)
  if (req.materialId !== null) form.append('materialId', `${req.materialId}`)
  if (req.watchStrapId !== null)
    form.append('watchStrapId', `${req.watchStrapId}`)
  if (req.sizeId !== null) form.append('sizeId', `${req.sizeId}`)
  if (req.referenceCode !== null)
    form.append('referenceCode', `${req.referenceCode}`)
  if (req.watchTypeId !== null) form.append('watchTypeId', `${req.watchTypeId}`)
  if (req.yearProduced !== null)
    form.append('yearProduced', `${req.yearProduced}`)
  if (req.watchStatus !== null) form.append('watchStatus', `${req.watchStatus}`)
  if (req.accessories !== null) form.append('accessories', `${req.accessories}`)
  if (req.origin !== null) form.append('origin', `${req.origin}`)
  if (req.userId !== null) form.append('userId', `${req.userId}`)
  if (req.commentValue !== null)
    form.append('commentValue', `${req.commentValue}`)

  // Append boolean value
  form.append('isAuthentic', `${req.isAuthentic}`)

  // Append images if they exist
  req.imageFiles.forEach((file) => {
    form.append('imageFiles', file)
  })

  try {
    const data = await axiosClient.post('/api/appraisal-report/create', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data.data
  } catch (error) {
    console.error('Error during appraisal creation:', error)
    throw error
  }
}

export {
  createAppraisalRequest,
  getDetailAppraisalRequest,
  completeAppraisalRequest,
  ratingAppraisalRequest,
  createAppraisal
}
