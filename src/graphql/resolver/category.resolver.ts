import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriesService } from '../../category/category.service';

@Resolver('Category') // <-- matches schema type name
export class CategoryResolver {
  constructor(private readonly categoryService: CategoriesService) {}

  @Query('categories') // <-- matches schema query name
  async categories() {
    try {
      const result = await this.categoryService.findAll();
      console.log('Categories query result:', result);
      return result;
    } catch (error) {
      console.error('Error in categories query:', error);
      return [];
    }
  }

  @Mutation('createCategory')
  async createCategory(@Args('name') name: string) {
    try {
      const result = await this.categoryService.create({
        name,
        productCount: 0,
        color: '#000000',
        image: '',
      });
      console.log('Category created:', result);
      return result;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }
}
