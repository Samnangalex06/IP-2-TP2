import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductType } from '../types/product.type';
import { CreateProductInput } from '../input/create-product.input';
import { ProductsService } from '../../product/product.service';
import { CategoriesService } from '../../category/category.service';
import { CategoryType } from '../types/category.type';

@Resolver(() => ProductType)
export class ProductCodeFirstResolver {
  constructor(
    private readonly productService: ProductsService,
    private readonly categoryService: CategoriesService,
  ) {}

  @Query(() => [ProductType])
  async products() {
    return this.productService.findAll();
  }

  @Query(() => ProductType, { nullable: true })
  async product(@Args('id') id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => ProductType)
  async createProduct(@Args('input') input: CreateProductInput) {
    return await this.productService.create({
      ...input,
      rating: input.rating ?? 0,
      size: input.size ?? 'M',
      promotionAsPercentage: input.promotionAsPercentage ?? 0,
    });
  }

  @ResolveField(() => CategoryType, { nullable: true })
  async category(@Parent() product: ProductType) {
    return await this.categoryService.findOne(product.categoryId);
  }
}
