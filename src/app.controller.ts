import { LocalAuthGuard } from './auth/local-auth.guard';
import { Request } from '@nestjs/common';
import { Controller, Post, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
