import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.decorator';
import { User as UserEntity } from './user.entity';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body('user') createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@User() user: UserEntity) {
    return { user };
  }
}
