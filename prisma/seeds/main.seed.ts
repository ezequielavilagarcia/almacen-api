import { PrismaClient } from '@prisma/client';
import { seedUsers } from './user.seed';
import { seedCompanyBranches } from './company-branch.seed';
import { seedRoles } from './role.seed';
import { seedCompanies } from './company.seed';
import { seedProducts } from './product.seed';
import { seedSales } from './sale.seed';
import { seedProductBatches } from './product-batch.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Run seeds in sequence
  const companyBranch = await seedCompanyBranches(prisma);
  const roles = await seedRoles(prisma);
  const users = await seedUsers(prisma, roles, companyBranch.id);
  await seedCompanies(prisma);
  const product = await seedProducts(prisma);
  await seedSales(prisma, users.admin.id, product.id, 3, product.salePrice);
  await seedProductBatches(prisma, product.id);

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
