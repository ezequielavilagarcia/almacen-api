/*
  Warnings:

  - You are about to drop the column `total` on the `ProductSale` table. All the data in the column will be lost.
  - Added the required column `price` to the `ProductSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductSale" DROP COLUMN "total",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
