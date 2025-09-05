/*
  Warnings:

  - The `category` column on the `Expense` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('PIX', 'MONEY', 'CREDIT_CARD', 'DEBIT_CARD');

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('HOUSE', 'FOOD', 'TRANSPORT', 'EDUCATION', 'HEALTH', 'CLOTHING', 'TECH', 'PERSONAL_CARE', 'ENTERTAINMENT', 'PETS', 'FINANCIAL', 'OTHER');

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "creditCardId" TEXT;

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "creditCardId" TEXT,
ADD COLUMN     "paymentMethod" "PaymentMethodType" NOT NULL DEFAULT 'PIX',
ALTER COLUMN "type" SET DEFAULT 'VARIABLE',
DROP COLUMN "category",
ADD COLUMN     "category" "CategoryType" NOT NULL DEFAULT 'OTHER';

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "creditCardId" TEXT,
ALTER COLUMN "type" SET DEFAULT 'VARIABLE';

-- DropEnum
DROP TYPE "CateroryType";

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" TEXT NOT NULL,
    "lastNumber" INTEGER NOT NULL,
    "validity" TIMESTAMP(3) NOT NULL,
    "holder" TEXT NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "CreditCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "CreditCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "CreditCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
