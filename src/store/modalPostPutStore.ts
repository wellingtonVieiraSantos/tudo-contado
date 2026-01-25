import { IncomeWithIdProps } from '@/modules/incomes/incomes.types'
import { create } from 'zustand'

type ModalType = 'POST' | 'PUT' | null

type ModalStore = {
  open: boolean
  data: IncomeWithIdProps | null
  type: ModalType
  openModal: (type: ModalType, data: IncomeWithIdProps | null) => void
  closeModal: () => void
}

export const useModalPostPutStore = create<ModalStore>(set => ({
  open: false,
  type: null,
  data: null,
  openModal: (type, data) =>
    set({ open: true, type, data: type === 'POST' ? null : data }),
  closeModal: () => set({ open: false, type: null, data: null })
}))
