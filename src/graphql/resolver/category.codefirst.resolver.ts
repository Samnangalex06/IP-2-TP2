import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryType } from '../types/category.type';
import { CreateCategoryInput } from '../input/create-category.input';
import { CategoriesService } from '../../category/category.service';

@Resolver(() => CategoryType)
export class CategoryCodeFirstResolver {
  constructor(private readonly categoryService: CategoriesService) {}

  @Query(() => [CategoryType])
  async categories() {
    return this.categoryService.findAll();
  }
  @Mutation(() => CategoryType)
  async createCategory(@Args('input') input: CreateCategoryInput) {
    return await this.categoryService.create({
      name: input.name,
      productCount: input.productCount ?? 0,
      color: input.color ?? '#000000',
      image: input.image ?? '',
    });
  }
}
