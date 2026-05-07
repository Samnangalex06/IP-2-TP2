import { InputType, Field, Float, ID, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => ID)
  categoryId: number;

  @Field(() => Int, { nullable: true })
  rating?: number;

  @Field({ nullable: true })
  size?: string;

  @Field(() => Int, { nullable: true })
  promotionAsPercentage?: number;
}
