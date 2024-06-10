import { AuthProvider } from '@/contexts/AuthContext'
import { PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {}

const CommonLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return <AuthProvider>{children}</AuthProvider>
}

export default CommonLayout
