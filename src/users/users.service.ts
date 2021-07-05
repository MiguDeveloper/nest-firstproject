import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUserById(userID: string): Promise<User> {
    const user = await this.userModel.findById(userID);
    return user;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = new this.userModel(createUserDTO);
    return await newUser.save();
  }

  async updateUser(
    userID: string,
    createUserDTO: CreateUserDTO,
  ): Promise<User> {
    const userUpdated = await this.userModel.findByIdAndUpdate(
      userID,
      createUserDTO,
      { new: true },
    );

    return userUpdated;
  }

  async getUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.userModel.findOne(createUserDTO);
    return user;
  }
}
