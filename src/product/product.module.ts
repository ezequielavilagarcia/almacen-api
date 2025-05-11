import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ProductResolver } from './resolvers/product.resolver';
import { CompanyService } from '../user/services/company.service';
import { ProductService } from './services/product.service';

@Module({
  imports: [CoreModule],
  providers: [ProductService, CompanyService, ProductResolver],
  exports: [ProductService, CompanyService],
})
export class ProductModule {}
