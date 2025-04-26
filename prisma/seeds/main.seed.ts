import { PrismaClient } from '@prisma/client';
import { seedUsers } from './user.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Run seeds in sequence
  await seedUsers(prisma);

  console.log('✅ Database seeding completed successfully');
}

main()
  .catch(e => {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
