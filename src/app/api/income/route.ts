import { NextRequest, NextResponse } from 'next/server'
import { getIncomes, postIncome } from '@/lib/dal/incomes'
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
/* 
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()
    const { id } = await req.json()

    if (!session?.user?.email)
      return NextResponse.json(
        { error: 'Usuário não autorizado' },
        { status: 401 }
      )

    const incomes = await prisma.income.delete({
      where: { id },
      select: {
        id: true,
        value: true,
        description: true,
        date: true,
        type: true
      }
    })
    return NextResponse.json({ data: incomes, success: true }, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Ops, algo inesperado aconteceu.' },
      { status: 500 }
    )
  }
} */
