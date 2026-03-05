'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import valueFormatter from '@/lib/valueFormatter'
import { dateStringFormatter } from '@/lib/dateStringFormatter'
import { Divider } from '@/components/ui/Divider'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  Trash
} from 'lucide-react'
import { useModalDelStore } from '@/store/modalDelStore'
import { useIncomeModalStore } from '@/store/modalPostPutStore'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IncomeWithIdProps } from '@/modules/incomes/incomes.types'
import { categories } from '../FilterIncomes'
import { incomeTypeFormatter } from '@/lib/incomeTypeFormatter'

export default function CardsTransactions({
  incomes
}: {
  incomes: {
    data: IncomeWithIdProps[]
    meta: {
      totalPages: number
      total_items: number
      page: number
      limit: number
    }
  }
}) {
  const pathname = usePathname()
  const { openModal } = useIncomeModalStore()
  const { openDeleteModal } = useModalDelStore()

  return (
    <div className='flex flex-col gap-3 lg:hidden'>
      {incomes.data.map(inc => (
        <Card className='bg-background rounded' key={inc.id}>
          <CardHeader>
            <CardTitle>
              <p className='flex items-center gap-3 text-sm text-foreground-secondary mb-3 justify-self-end'>
                <Calendar size={20} strokeWidth={1.1} />
                {dateStringFormatter(inc.date)}
              </p>
              <span className='flex items-center gap-4 font-poppins'>
                {(() => {
                  const category = categories.find(c => c.type === inc.type)
                  const Icon = category?.icon
                  return Icon ? (
                    <Icon
                      className='text-success'
                      size={30}
                      strokeWidth={1.1}
                    />
                  ) : null
                })()}
                {incomeTypeFormatter(inc.type)}
              </span>
            </CardTitle>
            <Divider />
            <CardDescription className='text-balance'>
              {inc.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-xl font-montserrat'>
              {valueFormatter(inc.value)}
            </p>
            <Button
              onClick={() => openModal('PUT', inc)}
              className='w-full mt-2 bg-foreground text-background hover:bg-foreground/80'
            >
              <RefreshCcw />
              Atualizar
            </Button>
            <Button
              variant='border'
              onClick={() =>
                openDeleteModal({
                  type: 'income',
                  data: inc
                })
              }
              className='w-full mt-2 hover:border-destructive hover:bg-destructive/20'
            >
              <Trash />
              Deletar
            </Button>
          </CardContent>
        </Card>
      ))}
      <div className='flex items-center justify-evenly'>
        <Link href={`${pathname}?page=${incomes.meta.page - 1}`}>
          <Button
            disabled={incomes.meta.page === 1}
            variant='border'
            className='border-foreground'
          >
            <ChevronLeft />
          </Button>
        </Link>
        <span>
          {incomes.meta.page} de {incomes.meta.totalPages}
        </span>
        <Link href={`${pathname}?page=${incomes.meta.page + 1}`}>
          <Button
            disabled={incomes.meta.page === incomes.meta.totalPages}
            variant='border'
            className='border-foreground'
          >
            <ChevronRight />
          </Button>
        </Link>
      </div>
    </div>
  )
}
