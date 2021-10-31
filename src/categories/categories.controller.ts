import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/users/user.entity';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(201)
  @Auth(Role.Admin)
  async create(@Body('category') category: CategoryDto) {
    return this.categoriesService.create(category);
  }

  @Get()
  async all() {
    return this.categoriesService.all();
  }
}
