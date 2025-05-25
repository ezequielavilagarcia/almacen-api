import { PrismaClient } from '@prisma/client';

export async function seedSales(prisma: PrismaClient, userId: string) {
  console.log('🌱 Seeding sales...');

  const amountData = [2, 3, 5, 7, 11];

  const products = await prisma.product.findMany({ include: { ProductPrice: true } });

  // Delete all existing sales first to avoid duplicates
  await prisma.sale.deleteMany({});

  // Create sale
  const exampleSales = await Promise.all(
    products.map((product, index) =>
      prisma.sale.create({
        data: {
          total: amountData[index] * product.ProductPrice!.salePrice,
          User: {
            connect: {
              id: userId,
            },
          },
          ProductSale: {
            create: {
              amount: amountData[index],
              price: product.ProductPrice!.salePrice,
              productId: product.id,
            },
          },
        },
      }),
    ),
  );

  console.log(`✅ Created ${exampleSales.length} example sales`);

  console.log('✅ Sale seeding completed');
}
