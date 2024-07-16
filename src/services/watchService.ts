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
  description: string
  price: number
  brandId: number
  yearProduced: number
  model: string
  material: string
  watchStrap: string
  size: string
  accessories: string
  referenceCode: string
  placeOfProduction: string
  watchTypeId: number
  address: string
  imageFiles: File[] | string[]
  area: string
}

export const createWatchService = async (params: CreateWatch) => {
  try {
    const formData = new FormData()

    formData.append('userId', params.userId.toString())
    formData.append('name', params.name)
    formData.append('watchStatus', params.watchStatus)
    formData.append('description', params.description)
    formData.append('price', params.price.toString())
    formData.append('brandId', params.brandId.toString())
    formData.append('yearProduced', params.yearProduced.toString())
    formData.append('model', params.model)
    formData.append('material', params.material)
    formData.append('watchStrap', params.watchStrap)
    formData.append('size', params.size)
    formData.append('accessories', params.accessories)
    formData.append('referenceCode', params.referenceCode)
    formData.append('placeOfProduction', params.placeOfProduction)
    formData.append('watchTypeId', params.watchTypeId.toString())
    formData.append('address', params.address),
      formData.append('area', params.area)

    params.imageFiles.forEach((file) => {
      formData.append(`imageFiles`, file)
    })

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
