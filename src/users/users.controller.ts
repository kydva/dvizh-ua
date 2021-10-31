import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
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
  @Auth()
  me(@User() user: UserEntity) {
    return { user };
  }
}
