import { PropsWithChildren, createContext } from 'react'

type Props = PropsWithChildren

type User = {
  name: string
  role: string
  email: string
}

type IAuthContext = {
  login: (user: User | null) => void
  logout: () => void
  user: User | null
}

const AuthContext = createContext<IAuthContext>({
  login: () => {},
  logout: () => {},
  user: null
})

const AuthProvider = ({ children }: Props) => {
  const login = (user: User | null) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
  }

  const user = JSON.parse(localStorage.getItem('user') || 'null')

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
