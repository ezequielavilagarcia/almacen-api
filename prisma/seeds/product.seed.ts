import { Category, PrismaClient } from '@prisma/client';

export async function seedProducts(prisma: PrismaClient, categories: Category[]) {
  console.log('🌱 Seeding products...');

  // Delete all existing products first to avoid duplicates
  await prisma.product.deleteMany({});

  const productNames = ['Bread', 'Meat', 'Sugar', 'Cookie', 'Candy'];

  // Create products
  const exampleProducts = await Promise.all(
    categories.map((category, index) =>
      prisma.product.create({
        data: {
          name: productNames[index],
          categoryId: category.id,
        },
      }),
    ),
  );

  console.log(`✅ Created ${exampleProducts.length} example products`);

  console.log('✅ Product seeding completed');

  return exampleProducts;
}
