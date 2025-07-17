import { prisma } from '@/lib/prisma'

async function main() {
  const user2 = await prisma.user.create({
    data: {
      email: 'teste2@email.com',
      password: '12345',
      name: 'Joan Doe'
    }
  })

  await prisma.user.upsert({
    where: { email: 'teste@email.com' },
    update: {},
    create: {
      email: 'teste@email.com',
      password: '12345',
      name: 'John Doe',
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
            category: 'HOUSE',
            date: new Date(),
            description: 'aluguel',
            paid: true
          },
          {
            type: 'VARIABLE',
            value: 104095,
            category: 'FOOD',
            date: new Date(),
            description: 'Alimentação',
            paid: false
          }
        ]
      }
    }
  })

  await prisma.product.createMany({
    data: [
      { name: 'cenoura', category: 'FOOD' },
      { name: 'batata', category: 'FOOD' }
    ]
  })

  const sabonete = await prisma.product.create({
    data: { name: 'sabonete', category: 'PERSONAL_CARE' }
  })

  await prisma.productVariant.create({
    data: {
      brand: 'Palmolive',
      productId: sabonete.id
    }
  })
  const dove = await prisma.productVariant.create({
    data: {
      brand: 'Dove',
      productId: sabonete.id
    }
  })
  await prisma.productPrice.create({
    data: {
      value: 250,
      date: new Date(),
      location: 'Comper Planaltina',
      productVariantId: dove.id,
      userId: user2.id
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
