import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Limpar dados existentes
  await prisma.expense.deleteMany({})
  await prisma.income.deleteMany({})
  await prisma.creditCard.deleteMany({})
  await prisma.user.deleteMany({})

  // Criar usuário de teste
  const hashedPassword = await bcrypt.hash('senha123', 10)
  const user = await prisma.user.create({
    data: {
      name: 'João Silva',
      email: 'joao@example.com',
      password: hashedPassword,
      emailVerified: new Date()
    }
  })

  console.log(`✓ Usuário criado: ${user.name} (${user.email})`)

  // Criar cartões de crédito
  const creditCard1 = await prisma.creditCard.create({
    data: {
      userId: user.id,
      lastNumber: 1234,
      creditLimit: 500000, // R$ 5.000,00
      expMonth: 12,
      expYear: 2026,
      holder: 'JOAO SILVA',
      cardBrand: 'VISA',
      paymentDay: 15
    }
  })

  const creditCard2 = await prisma.creditCard.create({
    data: {
      userId: user.id,
      lastNumber: 5678,
      creditLimit: 300000, // R$ 3.000,00
      expMonth: 8,
      expYear: 2027,
      holder: 'JOAO SILVA',
      cardBrand: 'MASTERCARD',
      paymentDay: 20
    }
  })

  console.log(
    `✓ Cartões de crédito criados: ${creditCard1.cardBrand} (****${creditCard1.lastNumber}) e ${creditCard2.cardBrand} (****${creditCard2.lastNumber})`
  )

  // Criar receitas (incomes)
  const incomes = await Promise.all([
    prisma.income.create({
      data: {
        userId: user.id,
        type: 'ACTIVE',
        value: 500000, // R$ 5.000,00
        date: new Date('2026-02-01'),
        description: 'Salário mensal'
      }
    }),
    prisma.income.create({
      data: {
        userId: user.id,
        type: 'ACTIVE',
        value: 150000, // R$ 1.500,00
        date: new Date('2026-02-05'),
        description: 'Freelance - Projeto X'
      }
    }),
    prisma.income.create({
      data: {
        userId: user.id,
        type: 'PASSIVE',
        value: 25000, // R$ 250,00
        date: new Date('2026-02-10'),
        description: 'Dividendos'
      }
    }),
    prisma.income.create({
      data: {
        userId: user.id,
        type: 'EXTRA',
        value: 10000, // R$ 100,00
        date: new Date('2026-02-15'),
        description: 'Venda de item usado'
      }
    })
  ])

  console.log(`✓ ${incomes.length} receitas criadas`)

  // Criar despesas (expenses)
  const expenses = await Promise.all([
    prisma.expense.create({
      data: {
        userId: user.id,
        description: 'Mercado Supermercado',
        category: 'FOOD',
        value: 45000, // R$ 450,00
        date: new Date('2026-02-02'),
        method: 'CREDIT',
        creditCardId: creditCard1.id,
        installments: 1
      }
    }),
    prisma.expense.create({
      data: {
        userId: user.id,
        description: 'Conta de Luz',
        category: 'HOUSE',
        value: 30000, // R$ 300,00
        date: new Date('2026-02-03'),
        method: 'DEBIT'
      }
    }),
    prisma.expense.create({
      data: {
        userId: user.id,
        description: 'Passagem Uber',
        category: 'TRANSPORT',
        value: 8000, // R$ 80,00
        date: new Date('2026-02-04'),
        method: 'CREDIT',
        creditCardId: creditCard2.id,
        installments: 1
      }
    }),
    prisma.expense.create({
      data: {
        userId: user.id,
        description: 'Netflix + Spotify',
        category: 'ENTERTAINMENT',
        value: 5500, // R$ 55,00
        date: new Date('2026-02-08'),
        method: 'CREDIT',
        creditCardId: creditCard1.id,
        installments: 1
      }
    })
  ])

  console.log(`✓ ${expenses.length} despesas criadas`)

  console.log('\n✅ Seed de teste executada com sucesso!')
  console.log(
    `\nResumo:\n- 1 usuário\n- 2 cartões de crédito\n- ${incomes.length} receitas\n- ${expenses.length} despesas`
  )
}

main()
  .catch(e => {
    console.error('Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
