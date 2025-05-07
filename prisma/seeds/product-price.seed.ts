import { PrismaClient } from '@prisma/client';

export async function seedProductPrices(
  prisma: PrismaClient,
  productId: string,
  companyId: string,
) {
  console.log('🌱 Seeding product prices...');

  // Delete all existing product prices first to avoid duplicates
  await prisma.productPrice.deleteMany({});

  // Create product price
  const exampleProductPrice = await prisma.productPrice.create({
    data: {
      purchasePrice: 10,
      salePrice: 10,
      Product: { connect: { id: productId } },
      Company: { connect: { id: companyId } },
    },
  });

  console.log(`✅ Created example product price with ID: ${exampleProductPrice.id}`);

  console.log('✅ Product price seeding completed');

  return exampleProductPrice;
}
