'use client'
import { privateRoutes } from '@/lib/privateRoutes'
import { usePathname } from 'next/navigation'
import { SideBar } from '@/components/SideBar'
import { useSession } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'

type LayoutWrapperProps = {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()

  const { status } = useSession()

  const isProtected = privateRoutes.some(route => pathname.startsWith(route))

  const showSidebar = isProtected && status === 'authenticated'

  return (
    <QueryClientProvider client={queryClient}>
      <div className='h-screen flex'>
        {showSidebar && <SideBar />}
        <main className='size-full'>{children}</main>
      </div>
    </QueryClientProvider>
  )
}
