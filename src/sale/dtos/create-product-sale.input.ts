import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

@InputType()
export class ProductSaleInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
