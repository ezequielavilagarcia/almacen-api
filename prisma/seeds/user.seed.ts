import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: PrismaClient) {
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
    },
  });

  console.log(`✅ Created admin user with ID: ${admin.id}`);

  // Create regular user
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: hashedPassword,
      firstName: 'Regular',
      lastName: 'User',
      isActive: true,
    },
  });

  console.log(`✅ Created regular user with ID: ${user.id}`);

  console.log('✅ Users seeding completed');
}
