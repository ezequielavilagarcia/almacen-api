import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  code?: string;

  @Field()
  @IsNumber()
  purchasePrice: number;

  @Field()
  @IsNumber()
  salePrice: number;

  @Field()
  @IsUUID()
  categoryId: string;

  @Field()
  @IsUUID()
  companyId: string;
}
