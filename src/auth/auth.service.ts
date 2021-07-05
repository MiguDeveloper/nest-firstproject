import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  logger = new Logger();
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser({ username, password: pass });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      this.logger.log(`DEBUG[validate user]: ${JSON.stringify(result)}`);
      return result;
    }

    return null;
  }
}
