import { PrismaClient } from '@prisma/client';
import { seedUsers } from './user.seed';
import { seedCompanies } from './company.seed';
import { seedProducts } from './product.seed';
import { seedSales } from './sale.seed';
import { seedCategories } from './category.seed';
import { seedProductPrices } from './product-price.seed';
import { seedProductCodes } from './product-code.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Run seeds in sequence
  const company = await seedCompanies(prisma);
  const users = await seedUsers(prisma, company.id);
  const categories = await seedCategories(prisma);
  const products = await seedProducts(prisma, categories);
  await seedProductPrices(prisma, products, company.id);
  await seedSales(prisma, users.id);
  await seedProductCodes(prisma, products);

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
