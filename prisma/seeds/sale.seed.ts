import { PrismaClient } from '@prisma/client';

export async function seedSales(
  prisma: PrismaClient,
  userId: string,
  productId: string,
  productAmount: number,
  productSalePrice: number,
) {
  console.log('🌱 Seeding sales...');

  const totalSale = productAmount * productSalePrice;

  // Delete all existing sales first to avoid duplicates
  await prisma.sale.deleteMany({});

  // Create sale
  const exampleSale = await prisma.sale.create({
    data: {
      // Sum of the amount of all products sold and their selling price
      sale: totalSale,
      User: {
        connect: {
          id: userId,
        },
      },
      ProductSale: {
        create: {
          productAmount,
          salePrice: productSalePrice,
          Product: { connect: { id: productId } },
        },
      },
    },
  });

  console.log(`✅ Created example sale with ID: ${exampleSale.id}`);

  console.log('✅ Sale seeding completed');

  return exampleSale;
}
