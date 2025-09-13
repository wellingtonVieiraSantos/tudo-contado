-- CreateEnum
CREATE TYPE "CardBrand" AS ENUM ('VISA', 'MASTERCARD', 'ELO', 'HIPERCARD', 'AMEX', 'OTHER');

-- DropForeignKey
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_creditCardId_fkey";

-- AlterTable
ALTER TABLE "CreditCard" ADD COLUMN     "cardBrand" "CardBrand" NOT NULL DEFAULT 'OTHER';
