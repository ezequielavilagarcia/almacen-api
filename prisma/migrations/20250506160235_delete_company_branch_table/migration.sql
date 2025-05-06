/*
  Warnings:

  - You are about to drop the column `companyBranchId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CompanyBranch` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyBranch" DROP CONSTRAINT "CompanyBranch_companyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyBranchId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyBranchId",
ADD COLUMN     "companyId" TEXT;

-- DropTable
DROP TABLE "CompanyBranch";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
