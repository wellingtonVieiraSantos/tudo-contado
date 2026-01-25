'use client'
import { Trash, TriangleAlert } from 'lucide-react'
import valueFormatter from '@/lib/valueFormatter'
import { useDelIncome } from '@/app/(auth)/ganhos/_hooks/use-del-income'
import {
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle
} from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useModalDelStore } from '@/store/modalDelStore'

export const DeleteModal = () => {
  const { open, closeDeleteModal, data } = useModalDelStore()
  const { handleDeleteIncome } = useDelIncome()
  return (
    <Modal open={open} onOpenChange={closeDeleteModal}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Deseja apagar o rendimento?</ModalTitle>
          <ModalDescription className='text-sm text-foreground-secondary'>
            Essa ação apagará permanentemente essa renda, deseja mesmo fazer
            isso?
          </ModalDescription>
        </ModalHeader>
        <Badge variant='warning' className='justify-self-center gap-4 my-4'>
          <TriangleAlert size={18} strokeWidth={1.5} />
          {data?.description} - {valueFormatter(data?.value || 0)}
        </Badge>
        <ModalActions>
          <Button
            variant='border'
            onClick={() => closeDeleteModal()}
            className='w-full lg:flex-1'
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (data) handleDeleteIncome(data.id!)
              closeDeleteModal()
            }}
            className='w-full lg:flex-1 bg-destructive/70 hover:bg-destructive/40'
          >
            <Trash />
            Apagar rendimento
          </Button>
        </ModalActions>
      </ModalContent>
    </Modal>
  )
}
