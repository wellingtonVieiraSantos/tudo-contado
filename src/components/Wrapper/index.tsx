import { ReactNode } from 'react'

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className='w-full xl:h-full flex flex-col p-3 gap-3 pb-22 xl:pb-1'>
      {children}
    </div>
  )
}
