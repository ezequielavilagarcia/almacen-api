-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyBranchId" TEXT;

-- CreateTable
CREATE TABLE "CompanyBranch" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER,

    CONSTRAINT "CompanyBranch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyBranchId_fkey" FOREIGN KEY ("companyBranchId") REFERENCES "CompanyBranch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
