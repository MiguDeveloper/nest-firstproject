import { Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';

@Injectable()
export class UsersService {
  getUsers(): User[] {
    return [
      { id: 'e64eje', name: 'Miguel' },
      { id: 'dnekei', name: 'Giancarlo' },
    ];
  }

  findOne(id: string): User {
    return { id, name: 'Patrick' };
  }
}
