import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/users/user.entity';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Post()
  @HttpCode(201)
  @Auth(Role.Admin)
  async create(@Body('name') name: string) {
    return this.citiesService.create(name);
  }

  @Get()
  async all() {
    return this.citiesService.all();
  }
}
