import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../core/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: { email: string; password: string; firstName?: string; lastName?: string }) {
    const hashedPassword = await this.hashPassword(data.password);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
