import { Role } from '@/common/type'
import { create } from 'zustand'

interface User {
  userid: number
  role: Role | string
  name: string
}

type UseStore = {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UseStore>((set) => {
  return {
    user: null,
    setUser: (user: User) => {
      set({ user })
    },
    clearUser: () => {
      set({ user: null })
    }
  }
})
