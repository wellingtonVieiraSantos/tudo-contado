'use client'
import { privateRoutes } from '@/data/privateRoutes'
import { usePathname } from 'next/navigation'
import { SideBar } from '@/components/SideBar'
import { useSession } from 'next-auth/react'

type LayoutWrapperProps = {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()

  const { status } = useSession()

  const isProtected = privateRoutes.some(route => pathname.startsWith(route))

  const showSidebar = isProtected && status === 'authenticated'

  return (
    <>
      {showSidebar && <SideBar />}
      <main className='size-screen pl-45'>{children}</main>
    </>
  )
}
