import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/services/prisma.service';
import { CreateProductInput } from '../dtos/create-product.input';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductInput) {
    return this.prisma.product.create({ data });
  }

  async findAll(): Promise<Product[] | null> {
    return this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<Product | null> {
    try {
      return this.prisma.product.findFirstOrThrow({
        where: { id },
      });
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async getPriceForProductAndCompany(productId: string, companyId: string) {
    try {
      return this.prisma.productPrice.findFirstOrThrow({
        where: {
          productId,
          companyId,
        },
      });
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException(
        `Product with ID ${productId} not found on company with ID ${companyId}`,
      );
    }
  }
}
