import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductService } from '../services/product.service';
import { Product } from '../../@generated/product/product.model';
import { ProductPrice } from '../../@generated/product-price/product-price.model';
import { CreateProductInput } from '../dtos/create-product.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  @UseGuards(GqlAuthGuard)
  async products() {
    return this.productService.findAll();
  }

  @Query(() => Product)
  @UseGuards(GqlAuthGuard)
  async product(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(@Args('createProductInput') input: CreateProductInput) {
    return this.productService.create(input);
  }

  @ResolveField(() => ProductPrice)
  async productPrice(
    @Parent() product: Product,
    @CurrentUser() user: User,
  ): Promise<ProductPrice | null> {
    const companyId = user.companyId;

    return this.productService.getPriceForProductAndCompany(product.id, companyId);
  }
}
