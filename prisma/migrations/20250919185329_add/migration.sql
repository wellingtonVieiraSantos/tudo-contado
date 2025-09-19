/*
  Warnings:

  - Added the required column `billingDay` to the `CreditCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreditCard" ADD COLUMN     "billingDay" TEXT NOT NULL;
