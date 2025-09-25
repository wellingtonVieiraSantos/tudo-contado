import { NextRequest, NextResponse } from 'next/server'
import { deleteExpenseById, updateExpenseById } from '@/dal/expenses'
import { expenseSchema } from '@/validators/formExpense'
import { postExpenseService } from '@/services/expenses/postExpenseService'
import { getAllExpensesService } from '@/services/expenses/getAllExpensesService'
import { deleteExpenseByIdService } from '@/services/expenses/deleteExpenseByIdService'
import { updateExpenseByIdService } from '@/services/expenses/updateExpenseByIdService'

export async function GET() {
  try {
    const expenses = await getAllExpensesService()

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
  const searchParams = req.nextUrl.searchParams

  const id = searchParams.get('id')

  try {
    if (!id) return NextResponse.json({ success: false }, { status: 404 })

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
