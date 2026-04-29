/*
  Warnings:

  - You are about to alter the column `quantityReq` on the `ProductIngredient` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,3)` to `Decimal(10,0)`.

*/
-- AlterTable
ALTER TABLE "ProductIngredient" ALTER COLUMN "quantityReq" SET DATA TYPE DECIMAL(10,0);
