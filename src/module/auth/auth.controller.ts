import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthProviders } from './auth.providers';

@Controller()
export class AuthController {
  constructor(private authProviders: AuthProviders) {}

  @Post('auth/login')
  async login(@Body() body) {
    return this.authProviders.login(body);
  }
}