import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserLoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(credentials: UserLoginDTO) {
    const user = await this.usersService.findByName(credentials.name);
    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new UnauthorizedException();
    }
    return {
      access_token: this.getToken(user),
    };
  }

  getToken(user: User): string {
    return this.jwtService.sign({ name: user.name, id: user.id });
  }

  getUserByToken(token: string) {
    const { id } = this.jwtService.verify(token);
    return this.usersService.findById(id);
  }
}
