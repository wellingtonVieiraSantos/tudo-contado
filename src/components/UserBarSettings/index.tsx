import { LogOut, Settings } from 'lucide-react'
import { Button } from '../ui/Button'
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger
} from '../ui/Dropdown'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'
import { signOut, useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const UserBarSettings = ({ title }: { title: string }) => {
  const { data: session } = useSession()
  return (
    <div className='flex justify-between items-center gap-4 text-sm'>
      <div className='text-xl text-left'>
        <h2 className=''>{title}</h2>
        <p className='text-sm text-foreground-secondary'>
          {format(new Date(), "MMMM 'de' yyyy", {
            locale: ptBR
          }).toUpperCase()}
        </p>
      </div>
      <div className='flex items-center gap-2 text-right'>
        <p className='hidden sm:block'>{'Bem vindo, ' + session?.user?.name}</p>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Settings />
            </Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem className='cursor-pointer' onClick={() => signOut()}>
              <LogOut />
              Sair
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
        <Avatar className='size-10'>
          <AvatarImage src={session?.user?.image || ''}></AvatarImage>
          <AvatarFallback className='bg-button-ghost'>
            {session?.user?.name?.slice(0, 2).toUpperCase() || '??'}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
