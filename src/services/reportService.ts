import axiosClient from '@/configs/axiosClient'
import { AppPath } from './utils'

export interface CreateAppraisalReportRequest {
  brand: string
  Request: string
  referenceCode: string
  watchType: string
  material: string
  watchStrap: string
  yearProduced: number
  watchStatus: string
  accessories: string
  watchGender: string
  origin: string
  size: string
  userId: number
  createDate: string
  imageFiles: unknown[]
}

const createAppraisalReportRequest = async (
  req: CreateAppraisalReportRequest
) => {
  try {
    const response = await axiosClient.post(AppPath.CREATE_APPRAISAL_REPORT)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { createAppraisalReportRequest }
