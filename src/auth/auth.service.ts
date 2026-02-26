import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(email: string, pass: string) {
    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
    });
    const { password, ...result } = user;
    return result;
  }

  async login(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        role: user.role,
        fullName: user.fullName
      }
    };
  }
}
