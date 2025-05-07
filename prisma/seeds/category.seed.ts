import { PrismaClient } from '@prisma/client';

export async function seedCategories(prisma: PrismaClient, productId: string) {
  console.log('🌱 Seeding categories...');

  // Delete all existing categories first to avoid duplicates
  await prisma.category.deleteMany({});

  // Create category
  const exampleCategory = await prisma.category.create({
    data: {
      category: 'FOOD',
      Product: { connect: { id: productId } },
    },
  });

  console.log(`✅ Created example category with ID: ${exampleCategory.id}`);

  console.log('✅ Category seeding completed');

  return exampleCategory;
}
