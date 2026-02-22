'use client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function UserBarSettings({ title }: { title: string }) {
  const { data: session } = useSession()

  return (
    <>
      {/* mobile */}
      <div className='xl:hidden flex justify-between items-center text-sm'>
        <div className='flex items-center gap-2 text-right'>
          <Avatar className='size-10'>
            <AvatarImage src={session?.user?.image || ''}></AvatarImage>
            <AvatarFallback className='bg-card'>
              {session?.user?.name?.slice(0, 2).toUpperCase() || '??'}
            </AvatarFallback>
          </Avatar>
          <div className='text-left'>
            <p className='text-[12px] text-foreground-secondary'>Bem vindo,</p>
            <p className='text-base'>{session?.user?.name}</p>
          </div>
        </div>
      </div>
      {/* desktop */}
      <div className='hidden xl:flex justify-between items-center h-15 text-sm p-2 col-span-3'>
        <div className='text-xl text-left'>
          <h2 className=''>{title}</h2>
          <p className='text-sm text-foreground-secondary'>
            {format(new Date(), "MMMM 'de' yyyy", {
              locale: ptBR
            }).toUpperCase()}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <p className=''>
            Bem vindo,{' '}
            <span className='font-montserrat'>{session?.user?.name}</span>
          </p>
          <div className='flex items-center gap-2 text-right'>
            <Avatar className='size-10'>
              <AvatarImage src={session?.user?.image || ''}></AvatarImage>
              <AvatarFallback className='bg-card'>
                {session?.user?.name?.slice(0, 2).toUpperCase() || '??'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </>
  )
}
