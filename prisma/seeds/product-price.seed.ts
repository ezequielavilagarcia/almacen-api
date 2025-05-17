import { PrismaClient, Product } from '@prisma/client';

export async function seedProductPrices(
  prisma: PrismaClient,
  products: Product[],
  companyId: string,
) {
  console.log('🌱 Seeding product prices...');

  // Delete all existing product prices first to avoid duplicates
  await prisma.productPrice.deleteMany({});

  const prices = [
    { purchasePrice: 10, salePrice: 20 },
    { purchasePrice: 20, salePrice: 40 },
    { purchasePrice: 40, salePrice: 80 },
    { purchasePrice: 80, salePrice: 160 },
    { purchasePrice: 160, salePrice: 320 },
  ];

  // Create product price
  const exampleProductPrices = await Promise.all(
    products.map((product, index) =>
      prisma.productPrice.create({
        data: {
          productId: product.id,
          purchasePrice: prices[index].purchasePrice,
          salePrice: prices[index].salePrice,
          companyId,
        },
      }),
    ),
  );

  console.log(`✅ Created ${exampleProductPrices.length} product price`);

  console.log('✅ Product price seeding completed');
}
