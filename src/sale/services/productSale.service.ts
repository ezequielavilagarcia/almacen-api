import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/services/prisma.service';
import { ProductSale } from 'src/@generated/product-sale/product-sale.model';

@Injectable()
export class ProductSaleService {
  constructor(private prisma: PrismaService) {}

  async findAllBySaleId(saleId: string): Promise<ProductSale[]> {
    return this.prisma.productSale.findMany({
      where: {
        saleId,
      },
      include: { Product: true },
    });
  }
}
