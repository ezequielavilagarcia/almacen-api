import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/services/prisma.service';
import { Sale } from '@prisma/client';
import { CreateSaleInput } from '../dtos/create-sale.input';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async create(createSaleInput: CreateSaleInput, userId: string): Promise<Sale> {
    const { total, products } = createSaleInput;
    return this.prisma.sale.create({
      data: {
        total,
        User: { connect: { id: userId } },
        ProductSale: { createMany: { data: [...products] } },
      },
    });
  }

  async findAll(): Promise<Sale[]> {
    return this.prisma.sale.findMany();
  }

  async findOne(id: string): Promise<Sale> {
    try {
      return this.prisma.sale.findFirstOrThrow({
        where: { id },
      });
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
  }
}
