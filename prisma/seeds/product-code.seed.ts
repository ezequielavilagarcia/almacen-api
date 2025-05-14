import { PrismaClient } from '@prisma/client';

export async function seedProductCodes(prisma: PrismaClient, productId: string) {
  console.log('🌱 Seeding product codes...');

  // Delete all existing product codes first to avoid duplicates
  await prisma.productCode.deleteMany({});

  // Create product code
  const exampleProductCode = await prisma.productCode.create({
    data: {
      Product: { connect: { id: productId } },
      code: 'A001',
    },
  });

  console.log(`✅ Created product code with ID: ${exampleProductCode.id}`);

  console.log('✅ Product code seeding completed');

  return exampleProductCode;
}
