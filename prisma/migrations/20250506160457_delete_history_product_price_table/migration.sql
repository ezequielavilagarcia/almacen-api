/*
  Warnings:

  - You are about to drop the `HistoryProductPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HistoryProductPrice" DROP CONSTRAINT "HistoryProductPrice_productId_fkey";

-- DropTable
DROP TABLE "HistoryProductPrice";
