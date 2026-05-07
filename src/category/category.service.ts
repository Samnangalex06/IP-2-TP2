import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoryRepository: typeof Category,
  ) {}

  async create(createProductDto: CreateCategoryDto) {
    try {
      return await this.categoryRepository.create(createProductDto as any);
    } catch (error) {
      console.error('Error in CategoriesService.create():', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const results = await this.categoryRepository.findAll();
      console.log('Raw Sequelize category results:', results);
      if (!results) return [];
      if (Array.isArray(results)) return results;
      return [results];
    } catch (error) {
      console.error('Error in CategoriesService.findAll():', error);
      return [];
    }
  }

  async findOne(id: number) {
    try {
      return await this.categoryRepository.findByPk(id);
    } catch (error) {
      console.error('Error in CategoriesService.findOne():', error);
      return null;
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const result = this.categoryRepository.update(updateCategoryDto as any, {
      where: { id },
      returning: true,
    });

    if (!result) {
      throw new Error('Category not found');
    }

    return 'update success';
  }

  delete(id: number) {
    const result = this.categoryRepository.destroy({ where: { id } });
    if (!result) {
      throw new Error('Category not found');
    }
    return 'delete success';
  }
}
