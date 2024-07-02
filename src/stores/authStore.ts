import { Role } from '@/common/type'
import { signin } from '@/services/authService'
import { create } from 'zustand'

interface User {
  role: Role | string
  name: string
}

export type AuthStoreType = {
  user: User | null
  signIn: (
    username: string,
    password: string
  ) => Promise<{
    role: Role | string
    name: string
  }>
  fetchCurrentUser: () => Promise<void>
}

const useAuth = create<AuthStoreType>((set) => {
  return {
    user: null,
    signIn: async (username, password) => {
      const data = await signin({ email: username, password })
      localStorage.setItem('token', data.accessToken)
      set(() => ({
        user: {
          role: data.role,
          name: data.name
        }
      }))
      return {
        role: data.role,
        name: data.name
      }
    },
    fetchCurrentUser: async () => {}
  }
})

export default useAuth
