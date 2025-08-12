import { queryClient } from '@/lib/query-client'
import { IncomeDataProps } from '@/types/income-data-props'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const fetchIncome = async (id: string) => {
  const res = await fetch(`api/income?id=${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao deletar rendimento')
  return res.json()
}

export const useDelIncome = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIncome, setSelectedIncome] = useState<null | IncomeDataProps>(
    null
  )

  const { mutate, isPending } = useMutation({
    mutationFn: fetchIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
    }
  })

  const handleDeleteIncome = async (id: string) => {
    mutate(id)
    setIsOpen(false)
  }

  const openDeleteModal = (income: IncomeDataProps) => {
    setSelectedIncome(income)
    setIsOpen(true)
  }

  return {
    isOpen,
    setIsOpen,
    handleDeleteIncome,
    isPending,
    openDeleteModal,
    selectedIncome
  }
}
