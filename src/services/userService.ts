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
    const form = new FormData()

    if (params.name) {
      form.append('name', `${params.name}`)
    }

    if (params.address) {
      form.append('address', `${params.address}`)
    }

    if (params.phoneNumber) {
      form.append('phoneNumber', `${params.phoneNumber}`)
    }

    if (params.gender) {
      form.append('gender', `${params.gender}`)
    }

    if (params.birthday) {
      form.append('birthday', `${params.birthday}`)
    }

    if (params.citizenID) {
      form.append('citizenID', `${params.citizenID}`)
    }

    const response = await axiosClient.put(
      `api/users/${userId}/UpdateUserProfile`,
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
