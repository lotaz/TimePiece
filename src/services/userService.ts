import axiosClient from '@/configs/axiosClient'

interface UpdateUserProFile {
  name?: string
  address?: string
  avatar?: string
  phoneNumber?: string
  status?: string
  gender?: string
  birthday?: string
  citizenID?: string
}

export const updateUserProFileService = async (
  params: UpdateUserProFile,
  userId: number
) => {
  try {
    const response = await axiosClient.put(
      `/users/${userId}/UpdateUserProfile`,
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
