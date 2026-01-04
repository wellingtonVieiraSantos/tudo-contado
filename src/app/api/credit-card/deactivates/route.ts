import { getAllCreditCardDeactivateService } from '@/modules/creditCard/creditCard.service'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const creditCard = await getAllCreditCardDeactivateService()

    return NextResponse.json(
      { data: creditCard, success: true },
      { status: 200 }
    )
  } catch (e) {
    console.error('GET /credit-card/deactivates', e)
    return NextResponse.json(
      { error: 'Erro ao buscar dados dos cartões desativados.' },
      { status: 500 }
    )
  }
}
