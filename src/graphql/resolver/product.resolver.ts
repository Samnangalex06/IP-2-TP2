import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductsService } from '../../product/product.service';
import { CategoriesService } from '../../category/category.service';

@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductsService,
    private readonly categoryService: CategoriesService,
  ) {}

  @Query('products')
  async products() {
    try {
      const result = await this.productService.findAll();
      console.log('Products query result:', result);
      return result;
    } catch (error) {
      console.error('Error in products query:', error);
      return [];
    }
  }

  @Query('product')
  async product(@Args('id') id: string) {
    try {
      // GraphQL ID comes as string; convert if needed
      const result = await this.productService.findOne(Number(id));
      console.log('Product query result for id', id, ':', result);
      return result;
    } catch (error) {
      console.error('Error in product query:', error);
      return null;
    }
  }

  @Mutation('createProduct')
  async createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('categoryId') categoryId: string,
  ) {
    try {
      const result = await this.productService.create({
        name,
        price,
        categoryId: Number(categoryId),
        rating: 0,
        size: 'M',
        promotionAsPercentage: 0,
      });
      console.log('Product created:', result);
      return result;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // relation: Product.category
  @ResolveField('category')
  async category(@Parent() product: any) {
    try {
      const result = await this.categoryService.findOne(product.categoryId);
      console.log('Category for product', product.id, ':', result);
      return result;
    } catch (error) {
      console.error('Error resolving category for product:', error);
      return null;
    }
  }
}
