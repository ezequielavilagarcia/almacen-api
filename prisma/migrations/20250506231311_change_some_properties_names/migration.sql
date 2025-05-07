/*
  Warnings:

  - You are about to drop the column `productAmount` on the `ProductSale` table. All the data in the column will be lost.
  - You are about to drop the column `salePrice` on the `ProductSale` table. All the data in the column will be lost.
  - You are about to drop the column `sale` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `amount` to the `ProductSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `ProductSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Sale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- AlterTable
ALTER TABLE "ProductSale" DROP COLUMN "productAmount",
DROP COLUMN "salePrice",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "sale",
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "companyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
