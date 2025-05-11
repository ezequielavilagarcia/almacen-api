import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/services/prisma.service';
import { Product } from '@prisma/client';
import { CreateProductInput } from '../dtos/create-product.input';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductInput: CreateProductInput) {
    const { name, categoryId, purchasePrice, salePrice, companyId } = createProductInput;
    return this.prisma.product.create({
      data: {
        name,
        Category: { connect: { id: categoryId } },
        PriceBreakdown: {
          create: { purchasePrice, salePrice, Company: { connect: { id: companyId } } },
        },
      },
    });
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
      return this.prisma.priceBreakdown.findFirstOrThrow({
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
