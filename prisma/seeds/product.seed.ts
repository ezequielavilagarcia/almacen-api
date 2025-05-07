import { PrismaClient } from '@prisma/client';

export async function seedProducts(prisma: PrismaClient) {
  console.log('🌱 Seeding products...');

  // Delete all existing products first to avoid duplicates
  await prisma.product.deleteMany({});

  // Create product
  const exampleProduct = await prisma.product.create({
    data: {
      name: 'Example',
      code: 'E001',
    },
  });

  console.log(`✅ Created example product with ID: ${exampleProduct.id}`);

  console.log('✅ Product seeding completed');

  return exampleProduct;
}
