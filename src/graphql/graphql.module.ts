import { Module } from '@nestjs/common';
import { CategoryCodeFirstResolver } from './resolver/category.codefirst.resolver';
import { ProductCodeFirstResolver } from './resolver/product.codefirst.resolver';

//import your existing modules/services
import { CategoriesModule } from '../category/category.module';
import { ProductsModule } from '../product/product.module';

@Module({
  imports: [CategoriesModule, ProductsModule],
  providers: [CategoryCodeFirstResolver, ProductCodeFirstResolver],
})
export class GraphqlModule {}
