import { PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {}

const CommonLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return <>{children}</>
}

export default CommonLayout
