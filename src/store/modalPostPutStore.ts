import { CreditCardWithIdProps } from '@/modules/creditCard/creditCard.types'
import { ExpenseWithIdProps } from '@/modules/expenses/expenses.types'
import { IncomeWithIdProps } from '@/modules/incomes/incomes.types'
import { create } from 'zustand'

type ModalType = 'POST' | 'PUT' | null

type ModalStore<T> = {
  open: boolean
  data: T | null
  type: ModalType
  openModal: (type: ModalType, data: T) => void
  closeModal: () => void
}

const createModalStore = <T>() =>
  create<ModalStore<T>>(set => ({
    open: false,
    type: null,
    data: null,
    openModal: (type, data) =>
      set({ open: true, type, data: type === 'POST' ? null : data }),
    closeModal: () => set({ open: false, type: null, data: null })
  }))

export const useIncomeModalStore = createModalStore<IncomeWithIdProps | null>()

export const useCreditCardModalStore =
  createModalStore<CreditCardWithIdProps | null>()

export const useExpenseModalStore =
  createModalStore<ExpenseWithIdProps | null>()
