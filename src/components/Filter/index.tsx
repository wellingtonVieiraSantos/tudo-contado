'use client'
import { Button } from '@/components/ui/Button'
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/Popover'
import { useIsMobile } from '@/lib/isMobile'

import { SlidersHorizontal } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '../ui/Drawer'

export const Filter = ({
  children,
  open,
  onOpenChange
}: {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const isMobile = useIsMobile()
  return (
    <div className='w-fit'>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          <Button
            variant='border'
            className='flex items-center self-end lg:self-start w-max py-1 lg:py-2 px-3 lg:px-6 gap-3
             hover:cursor-pointer rounded border-foreground data-[state=open]:border-focus-ring'
          >
            <h1 className='text-base'>Buscar por</h1>
            <SlidersHorizontal className='size-5' />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className='py-3'>
            <DrawerTitle>Filtrar por:</DrawerTitle>
            <DrawerDescription className='text-foreground-secondary text-sm'>
              Filtre por metodo de pagamento, categoria e mês.
            </DrawerDescription>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
    </div>
  )
}
