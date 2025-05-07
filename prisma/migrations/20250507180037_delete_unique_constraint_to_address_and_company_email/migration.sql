/*
  Warnings:

  - You are about to drop the column `isOpen` on the `Sale` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Company_address_key";

-- DropIndex
DROP INDEX "Company_email_key";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "isOpen";
