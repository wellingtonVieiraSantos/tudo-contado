'use client'
import { privateRoutes } from '@/data/privateRoutes'
import { usePathname } from 'next/navigation'
import { SideBar } from '@/components/SideBar'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

type LayoutWrapperProps = {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [showSidebar, setShowSidebar] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()

  useEffect(() => {
    const isProtected = privateRoutes.some(route => pathname.startsWith(route))

    if (isProtected && status === 'loading') {
      setShowSidebar(true)
      return
    }
    if (status !== 'loading') setShowSidebar(isProtected)
  }, [pathname, session, status])

  return (
    <div className=''>
      {showSidebar && <SideBar session={session} />}
      <main className='h-screen w-full pl-45'>{children}</main>
    </div>
  )
}
