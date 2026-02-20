import { CreditCardWithIdProps } from '@/modules/creditCard/creditCard.types'
import { ExpenseWithIdProps } from '@/modules/expenses/expenses.types'
import { IncomeWithIdProps } from '@/modules/incomes/incomes.types'
import { create } from 'zustand'

type DeletePayload =
  | IncomeWithIdProps
  | ExpenseWithIdProps
  | CreditCardWithIdProps

type ModalDelStore = {
  open: boolean
  data: DeletePayload | null
  openDeleteModal: (data: DeletePayload) => void
  closeDeleteModal: () => void
}

export const useModalDelStore = create<ModalDelStore>(set => ({
  open: false,
  data: null,
  openDeleteModal: data => set({ open: true, data }),
  closeDeleteModal: () => set({ open: false, data: null })
}))
