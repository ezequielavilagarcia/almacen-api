import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { SaleService } from '../services/sale.service';
import { Sale } from 'src/@generated/sale/sale.model';
import { CreateSaleInput } from '../dtos/create-sale.input';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/@generated/user/user.model';
import { ProductSale } from 'src/@generated/product-sale/product-sale.model';
import { ProductSaleService } from '../services/productSale.service';
import { Product } from 'src/@generated/product/product.model';
import { ProductService } from 'src/product/services/product.service';

@Resolver(() => Sale)
export class SaleResolver {
  constructor(
    private saleService: SaleService,
    private userService: UserService,
    private productSaleService: ProductSaleService,
    private productService: ProductService,
  ) {}

  @ResolveField('User', () => User)
  async getUser(@Parent() sale: Sale): Promise<User> {
    const userId = sale.userId;
    return this.userService.findById(userId);
  }

  @ResolveField('ProductSale', () => [ProductSale])
  async getProductSale(@Parent() sale: Sale): Promise<ProductSale[]> {
    const saleId = sale.id;
    return this.productSaleService.findAllBySaleId(saleId);
  }

  @ResolveField('Product', () => Product)
  async getProduct(@Parent() productSale: ProductSale): Promise<Product> {
    const productId = productSale.productId;
    return this.productService.findOne(productId);
  }

  @Query(() => [Sale])
  @UseGuards(GqlAuthGuard)
  async sales() {
    return this.saleService.findAll();
  }

  @Query(() => Sale)
  @UseGuards(GqlAuthGuard)
  async sale(@Args('id') id: string) {
    return this.saleService.findOne(id);
  }

  @Mutation(() => Sale)
  @UseGuards(GqlAuthGuard)
  async createSale(
    @Args('createSaleInput') createSaleInput: CreateSaleInput,
    @CurrentUser() user: User,
  ) {
    const userId = user.id;
    return this.saleService.create(createSaleInput, userId);
  }
}
