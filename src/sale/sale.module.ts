import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { SaleService } from './services/sale.service';
import { SaleResolver } from './resolvers/sale.resolver';
import { UserService } from 'src/user/services/user.service';
import { ProductSaleService } from './services/productSale.service';
import { ProductService } from 'src/product/services/product.service';

@Module({
  imports: [CoreModule],
  providers: [SaleService, UserService, ProductSaleService, ProductService, SaleResolver],
  exports: [SaleService, UserService, ProductSaleService, ProductService],
})
export class SaleModule {}
