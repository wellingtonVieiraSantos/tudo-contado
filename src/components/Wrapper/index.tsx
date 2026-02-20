import { ReactNode } from 'react'

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 place-items-center gap-3'>
      {children}
    </div>
  )
}
