import { User } from './dto/user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @Get()
  getUsers(): User[] {
    const port = this.configService.get('PORT');
    const port2 = process.env.PORT;
    const userDb = process.env.DATABASE_USER;
    console.log(port, port2, userDb);
    return this.usersService.getUsers();
  }

  @Get(':id')
  findUser(@Param('id') id): User {
    return this.usersService.findOne(id);
  }

  @Post()
  saveUser(@Body() user: User): User {
    console.log(user);
    return user;
  }
}
