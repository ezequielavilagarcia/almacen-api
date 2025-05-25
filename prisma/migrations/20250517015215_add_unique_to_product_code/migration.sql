/*
  Warnings:

  - You are about to drop the column `unitType` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `ProductCode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "unitType",
ADD COLUMN     "DefaultUnitType" "UnitType" NOT NULL DEFAULT 'UNIT';

-- AlterTable
ALTER TABLE "ProductPrice" ADD COLUMN     "unitType" "UnitType" NOT NULL DEFAULT 'UNIT';

-- CreateIndex
CREATE UNIQUE INDEX "ProductCode_code_key" ON "ProductCode"("code");
