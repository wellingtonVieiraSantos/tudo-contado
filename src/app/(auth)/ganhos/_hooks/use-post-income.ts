import { queryClient } from '@/lib/query-client'
import { IncomeProps } from '@/types/income-data-props'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const fetchIncome = async (data: IncomeProps) => {
  const res = await fetch('api/income', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao cadastrar rendimento')
  return res.json()
}

export const usePostIncome = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: fetchIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
    }
  })

  const onSubmit = async (data: IncomeProps) => {
    mutate(data)
    setIsOpen(false)
  }

  return { isOpen, setIsOpen, onSubmit, isPending }
}
