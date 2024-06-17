import axiosClient from '@/configs/axiosClient'
import { AppPath } from './utils'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  phone: string
  password: string
  confirmPassword: string
  fullName: string
  dob: string
  gender: string
}

const signin = async (request: LoginRequest) => {
  try {
    const response = await axiosClient.post(AppPath.LOGIN, request)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

const signup = async (request: RegisterRequest) => {
  try {
    const response = await axiosClient.post(AppPath.REGISTER, request)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { signin, signup }
