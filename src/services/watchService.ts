import axiosClient from '@/configs/axiosClient'

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
  imageFiles: string[]
}

export const createWatchService = async (params: CreateWatch) => {
  try {
    const response = await axiosClient.post('/watches', params)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
