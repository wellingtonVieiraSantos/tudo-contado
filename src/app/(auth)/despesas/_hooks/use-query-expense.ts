import { ListExpensesQuery } from '@/modules/expenses/expenses.types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useExpenseQuery() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setFilters = (filters: ListExpensesQuery) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) params.delete(key)
      else params.set(key, String(value))
    })

    params.delete('page')

    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname
    )
  }

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))

    router.replace(`${pathname}?${params.toString()}`)
  }

  return { setFilters, setPage }
}
