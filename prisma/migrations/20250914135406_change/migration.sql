/*
  Warnings:

  - You are about to drop the column `validity` on the `CreditCard` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,lastNumber,expMonth,expYear,cardBrand]` on the table `CreditCard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expMonth` to the `CreditCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expYear` to the `CreditCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreditCard" DROP COLUMN "validity",
ADD COLUMN     "expMonth" TEXT NOT NULL,
ADD COLUMN     "expYear" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CreditCard_userId_lastNumber_expMonth_expYear_cardBrand_key" ON "CreditCard"("userId", "lastNumber", "expMonth", "expYear", "cardBrand");
