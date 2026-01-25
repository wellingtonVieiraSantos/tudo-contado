'use client'
import { Trash, TriangleAlert } from 'lucide-react'
import valueFormatter from '@/lib/valueFormatter'
import {
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle
} from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useModalDelStore } from '@/store/modalDelStore'
import { Divider } from '@/components/ui/Divider'
import { Card } from '@/components/ui/Card'

type DeleteModalProps = {
  text: string
  handleDelete: (id: string) => void
}

export const ModalDelete = ({ text, handleDelete }: DeleteModalProps) => {
  const { open, closeDeleteModal, data } = useModalDelStore()

  return (
    <Modal open={open} onOpenChange={closeDeleteModal}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle className='text-xl flex items-center gap-3'>
            <TriangleAlert size={38} className='text-destructive' />
            Deletar {text}
          </ModalTitle>
          <Divider />
          <ModalDescription className='text-base text-center text-foreground-secondary'>
            Atenção, essa ação não poderá ser desfeita, deseja mesmo fazer isso?
          </ModalDescription>
        </ModalHeader>
        <Card className='px4 py-6 flex justify-evenly'>
          <span className='text-center flex-1 line-clamp-1'>
            {data?.description}
          </span>
          <span className='text-center flex-1'>
            {valueFormatter(data?.value || 0)}
          </span>
        </Card>
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
              if (data) handleDelete(data.id)
              closeDeleteModal()
            }}
            className='w-full lg:flex-1 bg-destructive/70 hover:bg-destructive/40'
          >
            <Trash />
            Apagar
          </Button>
        </ModalActions>
      </ModalContent>
    </Modal>
  )
}
