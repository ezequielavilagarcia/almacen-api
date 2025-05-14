import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductService } from './services/product.service';

@Module({
  imports: [CoreModule],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
