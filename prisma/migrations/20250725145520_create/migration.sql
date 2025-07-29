/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `category` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('HORTIFRUTI', 'CARNES_PEIXES', 'FRIOS_LATICINIOS', 'PADARIA_CONFEITARIA', 'BEBIDAS', 'MERCEARIA', 'ENLATADOS_CONSERVAS', 'SNACKS_DOCES', 'CONGELADOS', 'TEMPEROS_CONDIMENTOS', 'MASSAS_MOLHOS', 'PRODUTOS_NATURAIS', 'HIGIENE_PESSOAL', 'CUIDADOS_CABELO', 'DESODORANTES', 'CUIDADOS_PELE', 'BARBEARIA', 'HIGIENE_BUCAL', 'ABSORVENTES_FRALDAS', 'LIMPEZA_GERAL', 'UTENSILIOS_LIMPEZA', 'INSETICIDAS', 'INFANTIL_FRALDAS', 'INFANTIL_PAPINHAS', 'INFANTIL_HIGIENE', 'COSTURA', 'ARTESANATO', 'TECIDOS', 'ESCOLAR', 'PAPELARIA', 'DESCARTAVEIS', 'UTENSILIOS_COZINHA', 'ELETRICOS_BASICOS', 'LIMPEZA_CASA', 'TEXTIL_CASA', 'PET_RACAO', 'PET_HIGIENE', 'PET_ACESSORIOS');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
ADD COLUMN     "category" "ProductCategory" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
