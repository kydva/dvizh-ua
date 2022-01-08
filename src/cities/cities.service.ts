import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CityDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(dto: CityDto): Promise<Category> {
    const category = new Category();
    category.name = dto.name;
    return this.categoryRepository.save(category);
  }

  all(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
