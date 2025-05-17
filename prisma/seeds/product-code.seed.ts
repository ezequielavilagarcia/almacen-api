import { PrismaClient, Product } from '@prisma/client';

export async function seedProductCodes(prisma: PrismaClient, products: Product[]) {
  console.log('🌱 Seeding product codes...');

  // Delete all existing product codes first to avoid duplicates
  await prisma.productCode.deleteMany({});

  const codes = ['A001', 'A002', 'A003', 'A004', 'A005'];

  // Create example product codes
  const exampleProductCodes = await Promise.all(
    products.map((product, index) =>
      prisma.productCode.create({
        data: {
          productId: product.id,
          code: codes[index],
        },
      }),
    ),
  );

  console.log(`✅ Created ${exampleProductCodes.length} product codes`);

  console.log('✅ Product code seeding completed');
}
