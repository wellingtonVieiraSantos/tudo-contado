import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

async function main() {
  await prisma.user.upsert({
    where: { email: 'teste@email.com' },
    update: {
      income: {
        create: [
          {
            type: 'FIXED',
            value: new Prisma.Decimal(5000),
            date: new Date(),
            description: 'salário'
          },
          {
            type: 'VARIABLE',
            value: new Prisma.Decimal(500),
            date: new Date(),
            description: 'freela'
          }
        ]
      },
      expense: {
        create: [
          {
            type: 'FIXED',
            value: new Prisma.Decimal(1500),
            date: new Date(),
            description: 'aluguel',
            paid: true
          },
          {
            type: 'VARIABLE',
            value: new Prisma.Decimal(1000),
            date: new Date(),
            description: 'Alimentação',
            paid: false
          }
        ]
      },
      products: {
        create: [
          {
            name: 'Pipoca',
            category: 'Alimentação',
            quantity: 3,
            purchaseDate: new Date()
          }
        ]
      }
    },
    create: {
      email: 'teste@email.com'
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
