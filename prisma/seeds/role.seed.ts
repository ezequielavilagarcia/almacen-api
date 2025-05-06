import { PrismaClient } from '@prisma/client';

export async function seedRoles(prisma: PrismaClient) {
  console.log('🌱 Seeding roles...');

  // Delete all existing roles first to avoid duplicates
  await prisma.role.deleteMany({});

  // Create admin role
  const adminRole = await prisma.role.create({
    data: {
      role: 'admin',
    },
  });

  // Create user role
  const userRole = await prisma.role.create({
    data: {
      role: 'user',
    },
  });

  console.log(`✅ Created admin role with ID: ${adminRole.id}`);
  console.log(`✅ Created user role with ID: ${userRole.id}`);

  console.log('✅ Role seeding completed');

  return { adminRole, userRole };
}
