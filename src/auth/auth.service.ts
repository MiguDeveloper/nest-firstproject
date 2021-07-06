import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  logger = new Logger();
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser({ username, password: pass });
    this.logger.log(`DEBUG[validate user] ${user}`);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      this.logger.log(`DEBUG[validateUser:result]: ${JSON.stringify(result)}`);
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    this.logger.log(`DEBUG[login:user]: ${JSON.stringify(user)}`);
    this.logger.log(`DEBUG[login:payload]: ${JSON.stringify(payload)}`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
