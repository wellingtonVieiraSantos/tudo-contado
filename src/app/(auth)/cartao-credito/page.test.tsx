import { render, screen } from '@testing-library/react'
import CartaoCredito from './page'
import { useGetCreditCards } from './_hooks/use-get-creditcards'

// Mock the hook
jest.mock('./_hooks/use-get-creditcards')
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})
jest.mock('./_components/CardCreditFrontInfo', () => {
  return function MockCard({ data }: { data: any }) {
    return <div data-testid="credit-card">{data.holder}</div>
  }
})
jest.mock('@/components/UserBarSettings', () => ({
  UserBarSettings: ({ title }: { title: string }) => <div>{title}</div>
}))
jest.mock('./loading', () => function Loading() { return <div>Loading...</div> })

describe('CartaoCredito Page', () => {
  it('renders loading state', () => {
    (useGetCreditCards as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true
    })

    render(<CartaoCredito />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders empty state when no cards', () => {
    (useGetCreditCards as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false
    })

    render(<CartaoCredito />)
    expect(screen.getByText(/Você não tem nenhum cartao de crédito ativo/i)).toBeInTheDocument()
  })

  it('renders cards when data exists', () => {
    const mockData = [
      { id: '1', holder: 'JOHN DOE' },
      { id: '2', holder: 'JANE DOE' }
    ]
    ;(useGetCreditCards as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false
    })

    render(<CartaoCredito />)
    expect(screen.getAllByTestId('credit-card')).toHaveLength(2)
    expect(screen.getByText('JOHN DOE')).toBeInTheDocument()
    expect(screen.getByText('JANE DOE')).toBeInTheDocument()
  })
})
