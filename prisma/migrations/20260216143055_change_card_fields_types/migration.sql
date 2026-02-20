/*
  Warnings:

  - You are about to drop the column `billingDay` on the `CreditCard` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `CreditCard` table. All the data in the column will be lost.
  - Changed the type of `lastNumber` on the `CreditCard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `expMonth` on the `CreditCard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `expYear` on the `CreditCard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CreditCard" DROP COLUMN "billingDay",
DROP COLUMN "deletedAt",
ADD COLUMN     "closingDay" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "paymentDay" INTEGER NOT NULL DEFAULT 10,
DROP COLUMN "lastNumber",
ADD COLUMN     "lastNumber" INTEGER NOT NULL,
DROP COLUMN "expMonth",
ADD COLUMN     "expMonth" INTEGER NOT NULL,
DROP COLUMN "expYear",
ADD COLUMN     "expYear" INTEGER NOT NULL;

ALTER TABLE "CreditCard"
ALTER COLUMN "lastNumber" TYPE INTEGER USING "lastNumber"::integer;

ALTER TABLE "CreditCard"
ALTER COLUMN "expMonth" TYPE INTEGER USING "expMonth"::integer;

ALTER TABLE "CreditCard"
ALTER COLUMN "expYear" TYPE INTEGER USING "expYear"::integer;


-- CreateIndex
CREATE UNIQUE INDEX "CreditCard_userId_lastNumber_expMonth_expYear_cardBrand_key" ON "CreditCard"("userId", "lastNumber", "expMonth", "expYear", "cardBrand");

