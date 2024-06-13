import { create } from 'zustand'

export type AuthStoreType = {
  token: string
  setToken: (token: string) => void
  clearToken: () => void
}

export const authStore = create<AuthStoreType>((set) => {
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
