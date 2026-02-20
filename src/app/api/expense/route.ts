import { expenseSchema } from '@/modules/expenses/expenses.schema'
import {
  getAllExpensesService,
  postExpenseService,
  updateExpenseByIdService,
  deleteExpenseByIdService
} from '@/modules/expenses/expenses.service'
import { ListExpensesQuery } from '@/modules/expenses/expenses.types'
import { error } from 'console'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const params = {
    page: Number(searchParams.get('page')) || 1,
    month: Number(searchParams.get('month')) || undefined,
    year: Number(searchParams.get('year')) || undefined,
    method:
      (searchParams.get('method') as ListExpensesQuery['method']) || undefined,
    category:
      (searchParams.get('category') as ListExpensesQuery['category']) ||
      undefined
  }

  try {
    const expenses = await getAllExpensesService(params)

    return NextResponse.json({ data: expenses, success: true }, { status: 200 })
  } catch (e) {
    console.error('GET /expense', e)

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
      return NextResponse.json(
        { error: 'Dados inválidos', issues: result.error.issues },
        { status: 400 }
      )
    }

    const postedExpense = await postExpenseService(result.data)
    return NextResponse.json(
      { success: true, data: postedExpense },
      { status: 201 }
    )
  } catch (e) {
    console.error('POST /expense', e)
    return NextResponse.json(
      { error: 'Erro ao cadastrar nova despesa.' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const result = expenseSchema.safeParse(await req.json())
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', issues: result.error.issues },
        { status: 400 }
      )
    }

    const updatedExpense = await updateExpenseByIdService(result.data)
    return NextResponse.json(
      { success: true, data: updatedExpense },
      { status: 201 }
    )
  } catch (e) {
    console.error('PUT /expense', e)
    return NextResponse.json(
      { error: 'Erro ao atualizar a despesa.' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id: string = await req.json()
    if (!id) {
      return NextResponse.json(
        { error: 'Erro id não encontrado.' },
        { status: 400 }
      )
    }

    const deletedExpense = await deleteExpenseByIdService(id)

    return NextResponse.json(
      { success: true, data: deletedExpense },
      { status: 200 }
    )
  } catch (e) {
    console.error('DEL /expense', e)
    return NextResponse.json(
      { error: 'Erro ao apagar a despesa.' },
      { status: 500 }
    )
  }
}
