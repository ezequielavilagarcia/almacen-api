import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: PrismaClient, companyId: string) {
  console.log('🌱 Seeding users...');

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash('password123', salt);

  // Delete all existing users first to avoid duplicates
  await prisma.user.deleteMany({});

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      isActive: true,
      Company: { connect: { id: companyId } },
    },
  });

  console.log(`✅ Created admin user with ID: ${admin.id}`);

  console.log('✅ Users seeding completed');

  return admin;
}
