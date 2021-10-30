import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/users/user.decorator';
import { User as UserEntity } from 'src/users/user.entity';
import { AuthGuard } from './auth.guard';
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
  @UseGuards(AuthGuard)
  async getToken(@User() user: UserEntity) {
    return { access_token: this.authService.getToken(user) };
  }
}
