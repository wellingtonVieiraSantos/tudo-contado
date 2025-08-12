import { NextRequest, NextResponse } from 'next/server'
import { deleteIncomeById, getIncomes, postIncome } from '@/lib/dal/incomes'
import { incomeSchema } from '@/validators/formIncome'

export async function GET() {
  try {
    const rawIncomes = await getIncomes()

    //normalize value and type to show in component, get in centavos, return in reais
    const incomes = rawIncomes.map(income => ({
      ...income,
      type: income.type === 'FIXED' ? 'Fixo' : 'Variável',
      value: income.value / 100
    }))

    return NextResponse.json({ data: incomes, success: true }, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Erro ao buscar dados da renda.' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const result = incomeSchema.safeParse(await req.json())
    if (!result.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    const { type, value: rawValue, date, description } = result.data
    const value = rawValue * 100

    const postedIncome = await postIncome(type, value, date, description)
    return NextResponse.json(
      { success: true, data: postedIncome },
      { status: 201 }
    )
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Erro ao cadastrar nova renda.' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const id = searchParams.get('id')

  try {
    if (!id) return NextResponse.json({ success: false }, { status: 404 })

    await deleteIncomeById(id)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Erro ao apagar a renda.' },
      { status: 500 }
    )
  }
}
