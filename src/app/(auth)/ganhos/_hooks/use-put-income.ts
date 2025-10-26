import { queryClient } from '@/lib/query-client'
import { IncomeProps } from '@/types/income-data-props'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const fetchIncome = async (data: IncomeProps) => {
  const res = await fetch('api/income', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao atualizar rendimento')
  return res.json()
}

export const usePutIncome = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIncome, setSelectedIncome] = useState<null | IncomeProps>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: fetchIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
    }
  })

  const handleUpdateIncome = async (data: IncomeProps) => {
    if (!selectedIncome) return
    const id = selectedIncome.id
    const dataUpdate = { ...data, id }
    mutate(dataUpdate)
    setIsOpen(false)
  }

  const openUpdateModal = (income: IncomeProps) => {
    setSelectedIncome(income)
    setIsOpen(true)
  }

  return {
    isOpen,
    setIsOpen,
    isPending,
    handleUpdateIncome,
    openUpdateModal,
    selectedIncome
  }
}
