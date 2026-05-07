import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.create(createProductDto as any);
    } catch (error) {
      console.error('Error in ProductsService.create():', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const results = await this.productRepository.findAll();
      console.log('Raw Sequelize results:', results);
      if (!results) return [];
      if (Array.isArray(results)) return results;
      return [results];
    } catch (error) {
      console.error('Error in ProductsService.findAll():', error);
      return [];
    }
  }

  async findOne(id: number) {
    try {
      return await this.productRepository.findByPk(id);
    } catch (error) {
      console.error('Error in ProductsService.findOne():', error);
      return null;
    }
  }

  update(id: number, updateProductDto: any) {
    return this.productRepository.update(updateProductDto as any, {
      where: { id },
    });
  }

  delete(id: number) {
    return this.productRepository.destroy({
      where: { id },
    });
  }
}
