import { Injectable } from '@nestjs/common';
import { UserProviders } from '../user/user.providers'
import { JwtService } from '@nestjs/jwt';
import { UserNotExist } from '../../exception';

@Injectable()
export class AuthProviders {
  constructor(
    private userProviders: UserProviders,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userProviders.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    if (await this.validateUser(user.username, user.password)) {
      const payload = { username: user.username, password: user.password };
      return {
        Authorization: `Bearer ${this.jwtService.sign(payload)}`,
      };
    } else {
      throw new UserNotExist()
    }
  }
}