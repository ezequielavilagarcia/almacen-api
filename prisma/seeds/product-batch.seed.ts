import { PrismaClient } from '@prisma/client';

export async function seedProductBatches(prisma: PrismaClient, productId: string) {
  console.log('🌱 Seeding product batches...');

  // Delete all existing product batches first to avoid duplicates
  await prisma.productBatch.deleteMany({});

  const originalAmount = 100;

  // Create product batch
  const exampleProductBatch = await prisma.productBatch.create({
    data: {
      originalAmount,
      currentAmount: originalAmount,
      Product: { connect: { id: productId } },
    },
  });

  console.log(`✅ Created example product batch with ID: ${exampleProductBatch.id}`);

  console.log('✅ Product batch seeding completed');

  return exampleProductBatch;
}
