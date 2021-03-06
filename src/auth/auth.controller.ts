import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/users/user.decorator';
import { User as UserEntity } from 'src/users/user.entity';
import { Auth } from './auth.decorator';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('credentials') credentials: UserLoginDTO) {
    return this.authService.login(credentials);
  }

  @Get('token')
  @Auth()
  async getToken(@User() user: UserEntity) {
    return { access_token: this.authService.getToken(user) };
  }
}
