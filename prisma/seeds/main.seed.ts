import { PrismaClient } from '@prisma/client';
import { seedUsers } from './user.seed';
import { seedCompanies } from './company.seed';
import { seedProducts } from './product.seed';
import { seedSales } from './sale.seed';
import { seedCategories } from './category.seed';
import { seedProductPrices } from './product-price.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Run seeds in sequence
  const company = await seedCompanies(prisma);
  const users = await seedUsers(prisma, company.id);
  const category = await seedCategories(prisma);
  const product = await seedProducts(prisma, category.id);
  const productPrice = await seedProductPrices(prisma, product.id, company.id);
  await seedSales(prisma, users.id, product.id, 3, productPrice.salePrice);

  console.log('✅ Database seeding completed successfully');
}

async function run() {
  try {
    await main();
  } catch (e) {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

run();
