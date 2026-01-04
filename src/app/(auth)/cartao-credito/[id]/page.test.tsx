import { render, screen, fireEvent } from '@testing-library/react'
import CreditCardDetails from './page'
import { useGetCreditcardById } from '../_hooks/use-get-creditcard-by-id'
import { usePutCreditCard } from '../_hooks/use-put-creditcard'
import { useParams } from 'next/navigation'

// Mock hooks
jest.mock('../_hooks/use-get-creditcard-by-id')
jest.mock('../_hooks/use-put-creditcard')
jest.mock('next/navigation', () => ({
  useParams: jest.fn()
}))
jest.mock('@/components/UserBarSettings', () => ({
  UserBarSettings: ({ title }: { title: string }) => <div>{title}</div>
}))
jest.mock('../loading', () => function Loading() { return <div>Loading...</div> })
jest.mock('../_components/CardCreditFrontInfo', () => {
  return function MockCard({ data }: { data: any }) {
    return <div data-testid="credit-card-info">{data.holder}</div>
  }
})
jest.mock('@/components/ui/ProgressBar', () => ({
  ProgressBar: () => <div data-testid="progress-bar" />
}))

describe('CreditCardDetails Page', () => {
  const mockHandleDeactivate = jest.fn()

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: '123' })
    ;(usePutCreditCard as jest.Mock).mockReturnValue({
      handleDeactivateCreditCard: mockHandleDeactivate
    })
  })

  it('renders loading state', () => {
    (useGetCreditcardById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true
    })

    render(<CreditCardDetails />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders card details', () => {
    const mockCard = {
      id: '123',
      holder: 'JOHN DOE',
      billingDay: '10',
      totalExpenseValue: 500,
      creditLimit: 1000,
      expense: [
        {
          id: 'exp1',
          value: 100,
          description: 'Grocery',
          date: '2023-10-01',
          installments: 1,
          category: 'FOOD'
        }
      ]
    }
    ;(useGetCreditcardById as jest.Mock).mockReturnValue({
      data: mockCard,
      isLoading: false
    })

    render(<CreditCardDetails />)
    expect(screen.getByText('Detalhes do Cartão')).toBeInTheDocument()
    expect(screen.getByText('JOHN DOE')).toBeInTheDocument()
    expect(screen.getByText('Grocery')).toBeInTheDocument()
    expect(screen.getByText('Cartão ativo')).toBeInTheDocument()
  })

  it('calls deactivate function', () => {
    const mockCard = {
      id: '123',
      holder: 'JOHN DOE',
      billingDay: '10',
      totalExpenseValue: 500,
      creditLimit: 1000,
      expense: []
    }
    ;(useGetCreditcardById as jest.Mock).mockReturnValue({
      data: mockCard,
      isLoading: false
    })

    render(<CreditCardDetails />)
    const deactivateButton = screen.getByText('Desativar cartão')
    fireEvent.click(deactivateButton)
    expect(mockHandleDeactivate).toHaveBeenCalledWith('123')
  })
})
