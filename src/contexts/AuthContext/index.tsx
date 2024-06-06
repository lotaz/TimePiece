import { PropsWithChildren, createContext, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = PropsWithChildren

export type User = {
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
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const login = useCallback(
    (user: User | null) => {
      console.log(user)
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        if (user.role === 'appraiser') {
          navigate('/appraiser')
        } else {
          navigate('/')
        }
      } else {
        localStorage.removeItem('user')
      }
    },
    [navigate]
  )

  const logout = () => {
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }