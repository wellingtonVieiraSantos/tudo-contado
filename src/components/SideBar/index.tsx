'use client'
import Link from 'next/link'
import { Button } from '../ui/Button'
import {
  ArrowLeft,
  ArrowRight,
  BanknoteArrowUp,
  BanknoteArrowDown,
  Barcode,
  HomeIcon
} from 'lucide-react'
import { useState } from 'react'

const pages = [
  { name: 'Dashboard', icon: HomeIcon, url: '/dashboard' },
  { name: 'Renda', icon: BanknoteArrowUp, url: '/incomes' },
  { name: 'Despesas', icon: BanknoteArrowDown, url: '/expenses' },
  { name: 'Produtos', icon: Barcode, url: '/products' }
]

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`hidden z-10 fixed inset-0 p-2 h-full w-40 bg-card border-r lg:flex flex-col items-center ${
        isOpen ? 'translate-0' : '-translate-x-2/3'
      }`}
    >
      <h1
        className={`w-full p-2 pointer-events-none ${
          !isOpen && 'text-right text-xl'
        }`}
      >
        {isOpen ? 'Tudo Contado' : 'TC'}
      </h1>
      <Button
        variant='border'
        size='icon'
        onClick={() => setIsOpen(!isOpen)}
        className='self-end size-7 -mr-6'
      >
        {isOpen ? <ArrowLeft /> : <ArrowRight />}
      </Button>
      <div className='w-full flex flex-col items-center gap-4 mt-30'>
        {pages.map((page, i) => (
          <Link href={page.url} className='w-full' key={i}>
            <Button
              variant='ghost'
              size='icon'
              className={` ${
                isOpen
                  ? 'w-full justify-normal gap-4 px-2'
                  : ' justify-self-end mr-1'
              }`}
            >
              <page.icon />
              {isOpen && page.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

export { SideBar }
