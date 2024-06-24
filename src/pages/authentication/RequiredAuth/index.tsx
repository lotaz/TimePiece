import useAuth from '@/stores/authStore'
import { Navigate, Outlet } from 'react-router-dom'

const RequiredAuth = () => {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to="/" replace />
}
export default RequiredAuth
