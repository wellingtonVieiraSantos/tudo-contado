'use client'
import { privateRoutes } from '@/lib/privateRoutes'
import { usePathname } from 'next/navigation'
import { SideBar } from '@/components/SideBar'
import { useSession } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'
import { Spinner } from '../ui/Spinner'

type LayoutWrapperProps = {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()

  const { status } = useSession()

  if (status === 'loading')
    return (
      <div className='h-screen grid place-items-center'>
        <Spinner />
      </div>
    )

  const isProtected = privateRoutes.some(route => pathname.startsWith(route))

  const showSidebar = isProtected && status === 'authenticated'

  return (
    <QueryClientProvider client={queryClient}>
      <div className='h-screen flex'>
        {showSidebar && <SideBar />}
        <main
          className={`${showSidebar && 'ml-0 lg:ml-40 xl:ml-60'} size-full`}
        >
          {children}
        </main>
      </div>
    </QueryClientProvider>
  )
}
