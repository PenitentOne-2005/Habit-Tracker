import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthTdo } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() dto: AuthTdo) {
    return this.authService.register(dto);
  }
}
