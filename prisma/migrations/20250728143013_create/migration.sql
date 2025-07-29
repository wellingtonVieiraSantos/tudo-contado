/*
  Warnings:

  - A unique constraint covering the columns `[productId,brandId]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_brandId_key" ON "ProductVariant"("productId", "brandId");
