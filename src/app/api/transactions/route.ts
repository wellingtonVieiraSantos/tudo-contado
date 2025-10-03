import { getLastTransactionsService } from '@/services/dashboard/getLastTransactionsService'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const transactions = await getLastTransactionsService()

    if (!transactions)
      return NextResponse.json(
        { error: 'Nenhum dado encontrado.' },
        { status: 404 }
      )

    return NextResponse.json(
      { data: transactions, success: true },
      { status: 200 }
    )
  } catch (e) {
    console.error('GET /transactions', e)
    return NextResponse.json(
      { error: 'Erro ao buscar as ultimas transações.' },
      { status: 500 }
    )
  }
}
