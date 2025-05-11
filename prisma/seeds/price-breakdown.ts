import { PrismaClient } from '@prisma/client';

export async function seedPriceBreakdown(
  prisma: PrismaClient,
  productId: string,
  companyId: string,
) {
  console.log('🌱 Seeding price breakdown...');

  // Delete all existing price breakdown first to avoid duplicates
  await prisma.priceBreakdown.deleteMany({});

  // Create price breakdown
  const examplePriceBreakdown = await prisma.priceBreakdown.create({
    data: {
      purchasePrice: 10,
      salePrice: 10,
      Product: { connect: { id: productId } },
      Company: { connect: { id: companyId } },
    },
  });

  console.log(`✅ Created example price breakdown with ID: ${examplePriceBreakdown.id}`);

  console.log('✅ Price breakdown seeding completed');

  return examplePriceBreakdown;
}
