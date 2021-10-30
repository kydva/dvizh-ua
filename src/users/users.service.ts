import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDTO) {
    const errors = [];

    if (dto.password !== dto.passwordConfirmation) {
      errors.push('invalid password confirmation');
    }
    if ((await this.usersRepository.count({ name: dto.name })) !== 0) {
      errors.push('the user with this name already exists');
    }
    if (errors.length !== 0) {
      throw new BadRequestException({ message: errors });
    }

    const user = new User();
    user.name = dto.name;
    user.password = await bcrypt.hash(dto.password, 10);
    return this.usersRepository.save(user);
  }

  async findByName(name: string) {
    return this.usersRepository.findOne({ name });
  }

  async findById(id: number) {
    return this.usersRepository.findOne(id);
  }
}
