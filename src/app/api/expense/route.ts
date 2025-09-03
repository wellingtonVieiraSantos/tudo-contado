import { NextRequest, NextResponse } from 'next/server'
import {
  deleteExpenseById,
  getExpenses,
  postExpense,
  updateExpenseById
} from '@/lib/dal/expenses'
import { expenseSchema } from '@/validators/formExpense'

export async function GET() {
  try {
    const rawExpense = await getExpenses()

    //normalize value and type to show in component, get in centavos, return in reais
    const expenses = rawExpense.map(expense => ({
      ...expense,
      type: expense.type === 'FIXED' ? 'Fixo' : 'Variável',
      value: expense.value / 100
    }))

    return NextResponse.json({ data: expenses, success: true }, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Erro ao buscar dados das despesas.' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const result = expenseSchema.safeParse(await req.json())
    if (!result.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    const {
      type,
      value: rawValue,
      date,
      description,
      category,
      paid
    } = result.data
    const value = rawValue * 100

    const postedExpense = await postExpense(
      type,
      value,
      date,
      category,
      description,
      paid
    )
    return NextResponse.json(
      { success: true, data: postedExpense },
      { status: 201 }
    )
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Erro ao cadastrar nova despesa.' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, data } = await req.json()
    const updatedExpense = await updateExpenseById(id, data)
    return NextResponse.json(
      { success: true, data: updatedExpense },
      { status: 201 }
    )
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Erro ao atualizar a despesa.' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const id = searchParams.get('id')

  try {
    if (!id) return NextResponse.json({ success: false }, { status: 404 })

    await deleteExpenseById(id)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Erro ao apagar a despesa.' },
      { status: 500 }
    )
  }
}
