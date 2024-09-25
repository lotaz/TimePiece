import axiosClient from '@/configs/axiosClient'
import { AppPath } from './utils'

export const getAllWatchService = async () => {
  try {
    const response = await axiosClient.get('/watches/getAll')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

interface CreateWatch {
  userId: number
  name: string
  watchStatus: string
  price: number
  description?: string
  brandId: number | null
  yearProduced: number
  modelId: number | null
  materialId: number | null
  watchStrapId: number | null
  sizeId: number | null
  accessories: string
  referenceCode: string
  placeOfProduction: string
  watchTypeId: number | null
  imageFiles: Blob[] | string[]
  area: string
  hasAppraisalCertificate?: boolean | undefined
  appraisalCertificateFile?: Blob | string | null
}

export const createWatchService = async (params: CreateWatch) => {
  try {
    const formData = new FormData()

    formData.append('userId', params.userId?.toString())
    formData.append('name', params.name)
    formData.append('watchStatus', params.watchStatus)
    formData.append('price', params.price.toString())
    formData.append(
      'brandId',
      params.brandId !== null ? params.brandId.toString() : ''
    )
    formData.append('yearProduced', params.yearProduced?.toString())
    formData.append(
      'watchTypeId',
      params.watchTypeId !== null ? params.watchTypeId.toString() : ''
    )
    formData.append(
      'modelId',
      params.modelId !== null ? params.modelId.toString() : ''
    )
    formData.append('materialId', params.materialId?.toString() ?? '')
    if (params.watchStrapId !== null) {
      formData.append('watchStrapId', params.watchStrapId.toString())
    }
    formData.append('sizeId', params.sizeId?.toString() ?? '')
    formData.append('accessories', params.accessories)
    formData.append('referenceCode', params.referenceCode)
    formData.append('placeOfProduction', params.placeOfProduction)
    formData.append('area', params.area)

    params.imageFiles.forEach((file) => {
      formData.append(`imageFiles`, file)
    })

    if (params.description) {
      formData.append('description', params.description)
    }

    if (params.appraisalCertificateFile) {
      formData.append(
        `appraisalCertificateFile`,
        params.appraisalCertificateFile
      )

      if (params.hasAppraisalCertificate) {
        formData.append('hasAppraisalCertificate', 'true')
      }
    }

    const response = await axiosClient.post(AppPath.CREATE_WATCH, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const changeStatusWatchService = async (id: number, status: string) => {
  try {
    const response = await axiosClient.put(
      `/api/watches/${id}/status?status=${status}`
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
