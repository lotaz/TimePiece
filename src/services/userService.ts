import axiosClient from '@/configs/axiosClient'

interface UpdateUserProFile {
  name: string
  address: string
  phoneNumber: string
  gender: string
  birthday: string
  citizenID: string
}

export const updateUserProFileService = async (
  params: UpdateUserProFile,
  userId: number
) => {
  try {
    const response = await axiosClient.put(
      `api/users/${userId}/UpdateUserProfile`,
      params
    )

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getUserInfoService = async (userId: number) => {
  try {
    const response = await axiosClient.get(`/users/${userId}`)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

interface ChangePassword {
  userId: number
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

export const changePasswordService = async (params: ChangePassword) => {
  try {
    const response = await axiosClient.post('api/users/change-password', params)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
