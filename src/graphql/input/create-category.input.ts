import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  productCount?: number;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  image?: string;
}
