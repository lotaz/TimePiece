import { create } from 'zustand'

interface User {}

type AuthStore = {
  token: string
  setToken: (token: string) => void
  clearToken: () => void
}

export const useAuthStore = create<AuthStore>((set) => {
  return {
    token: '',
    setToken: (token: string) => {
      set({ token })
    },
    clearToken: () => {
      set({ token: '' })
    }
  }
})
