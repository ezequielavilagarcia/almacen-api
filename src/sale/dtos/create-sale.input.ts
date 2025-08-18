import { InputType, Field, Float } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { ProductSaleInput } from './create-product-sale.input';

@InputType()
export class CreateSaleInput {
  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @Field(() => [ProductSaleInput])
  @IsNotEmpty()
  @IsArray()
  products: ProductSaleInput[];
}
