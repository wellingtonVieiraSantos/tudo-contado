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
            value: 340050,
            date: new Date(),
            description: 'salário'
          },
          {
            type: 'VARIABLE',
            value: 25000,
            date: new Date(),
            description: 'freela'
          }
        ]
      },
      expense: {
        create: [
          {
            type: 'FIXED',
            value: 125050,
            date: new Date(),
            description: 'aluguel',
            paid: true
          },
          {
            type: 'VARIABLE',
            value: 104095,
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
            quantity: new Prisma.Decimal(3),
            unit: 'UNIT',
            purchaseDate: new Date(),
            price: 399,
            brand: 'yoki',
            rating: 'FOUR_STAR',
            review: 'Muito boa, compensa a compra.'
          },
          {
            name: 'Batata',
            category: 'Alimentação',
            quantity: new Prisma.Decimal(0.467),
            unit: 'KG',
            purchaseDate: new Date(),
            price: 599
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
