import { PrismaClient } from '@prisma/client';

export async function seedCompanyBranches(prisma: PrismaClient) {
  console.log('🌱 Seeding company branches...');

  // Delete all existing company branches first to avoid duplicates
  await prisma.companyBranch.deleteMany({});

  // Create company branch
  const exampleCompanyBranch = await prisma.companyBranch.create({
    data: {
      address: 'Example 123',
      email: 'example@example.com',
    },
  });

  console.log(`✅ Created example company branch with ID: ${exampleCompanyBranch.id}`);

  console.log('✅ Company branch seeding completed');

  return exampleCompanyBranch;
}
