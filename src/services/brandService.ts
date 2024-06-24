import axiosClient from '@/configs/axiosClient'
import { AppPath } from './utils'

const getAllBrands = async () => {
  try {
    const response = await axiosClient.get(AppPath.GET_BRANDS)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { getAllBrands }
