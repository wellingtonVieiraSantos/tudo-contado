'use client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'
import { signOut, useSession } from 'next-auth/react'
import { LogOut, Settings } from 'lucide-react'
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger
} from '../ui/Dropdown'
import { Button } from '../ui/Button'

export default function UserBarSettings({ title }: { title: string }) {
  const { data: session } = useSession()

  const formatedDate = () => {
    const date = new Date()
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'long',
      year: 'numeric'
    })
      .format(date)
      .toUpperCase()
  }

  return (
    <>
      {/* mobile */}
      <div className='xl:hidden flex justify-between items-center text-sm col-span-3 px-1'>
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
        <Dropdown>
          <DropdownTrigger>
            <Settings />
          </DropdownTrigger>
          <DropdownContent className='py-0'>
            <DropdownItem asChild>
              <Button
                className='w-full bg-destructive hover:bg-destructive/20 hover:border hover:border-destructive'
                onClick={() => signOut()}
              >
                Sair
                <LogOut />
              </Button>
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>

      {/* desktop */}
      <div className='hidden xl:flex justify-between items-center h-15 text-sm p-2 col-span-3'>
        <div className='text-xl text-left'>
          <h2 className=''>{title}</h2>
          <p className='text-sm text-foreground-secondary'>{formatedDate()}</p>
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
