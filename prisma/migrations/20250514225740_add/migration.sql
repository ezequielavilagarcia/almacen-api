-- CreateTable
CREATE TABLE "ProductCode" (
    "id" UUID NOT NULL,
    "code" VARCHAR(48) NOT NULL,
    "productId" UUID NOT NULL,

    CONSTRAINT "ProductCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductCode" ADD CONSTRAINT "ProductCode_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
