import axiosClient from '@/configs/axiosClient'
import { AppPath } from './utils'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  name: string
  dob: Date | null
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
    const birthday = request.dob?.toISOString().split('T')[0]
    const response = await axiosClient.post(AppPath.REGISTER, {
      ...request,
      birthday: birthday
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { signin, signup }
