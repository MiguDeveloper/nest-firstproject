import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Res } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Put, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  logger = new Logger();

  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @Get()
  async getUsers(@Res() res) {
    //const port = this.configService.get('PORT');
    ///const port2 = process.env.PORT;
    const users = await this.usersService.getUsers();
    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      message: 'List users successfully',
      users,
    });
  }

  @Get('/:userID')
  async getUserById(@Param('userID') userID: string, @Res() res) {
    const user = await this.usersService.getUserById(userID);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      message: 'User successfully',
      user,
    });
  }

  @Get('/get/user')
  async getUser(@Body() createUserDTO: CreateUserDTO, @Res() res) {
    this.logger.log(`USER[findOne] ${JSON.stringify(createUserDTO)}`);
    const user = await this.usersService.getUser(createUserDTO);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      message: 'User successfully',
      user,
    });
  }

  @Post()
  async saveUser(@Body() createUserDTO: CreateUserDTO, @Res() res) {
    const user = await this.usersService.createUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      message: 'User successfully created',
      user,
    });
  }

  @Put()
  async updateUser(
    @Body() createUserDTO: CreateUserDTO,
    @Query('userID') userID: string,
    @Res() res,
  ) {
    const updatedUser = await this.usersService.updateUser(
      userID,
      createUserDTO,
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      message: 'User successfully updated',
      updatedUser,
    });
  }
}
