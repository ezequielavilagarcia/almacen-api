-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('KILOGRAM', 'UNIT');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unitType" "UnitType" NOT NULL DEFAULT 'KILOGRAM';
