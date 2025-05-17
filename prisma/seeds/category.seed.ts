import { PrismaClient } from '@prisma/client';

export async function seedCategories(prisma: PrismaClient) {
  console.log('🌱 Seeding categories...');

  // Delete all existing categories first to avoid duplicates
  await prisma.category.deleteMany({});

  const categoryData = [
    { name: 'Bakery' },
    { name: 'Butchery' },
    { name: 'Groceries' },
    { name: 'Snacks' },
    { name: 'Sweets' },
  ];

  // Create categories
  const categories = await Promise.all(
    categoryData.map(data => prisma.category.create({ data: { category: data.name } })),
  );

  console.log(`✅ Created ${categories.length} categories`);

  console.log('✅ Category seeding completed');

  return categories;
}
