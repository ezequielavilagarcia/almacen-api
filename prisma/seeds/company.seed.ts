import { PrismaClient } from '@prisma/client';

export async function seedCompanies(prisma: PrismaClient) {
  console.log('🌱 Seeding companies...');

  // Delete all existing companies first to avoid duplicates
  await prisma.company.deleteMany({});

  // Create company
  const exampleCompany = await prisma.company.create({
    data: {
      name: 'Example',
      address: '123 street',
      email: 'company@example.com',
    },
  });

  console.log(`✅ Created example company with ID: ${exampleCompany.id}`);

  console.log('✅ Company seeding completed');

  return exampleCompany;
}
