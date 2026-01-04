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
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/Drawer'

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
      {isMobile ? (
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
          <DrawerContent>{children}</DrawerContent>
        </Drawer>
      ) : (
        <Popover open={open} onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant='border'
              className='flex items-center self-end lg:self-start w-max py-1 lg:py-2 px-3 lg:px-6 gap-3
             hover:cursor-pointer rounded border-foreground data-[state=open]:border-focus-ring'
            >
              <h1 className='text-base'>Buscar por</h1>
              <SlidersHorizontal className='size-5' />
            </Button>
          </PopoverTrigger>
          <PopoverAnchor />
          <PopoverContent className='w-5xl flex-col'>{children}</PopoverContent>
        </Popover>
      )}
    </div>
  )
}
