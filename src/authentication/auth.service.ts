import { HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import RegisterDto from './dto/register.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
      }
    }
  }

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(hashedPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Invalid credentials!', HttpStatus.UNAUTHORIZED);
    }
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatch) {
      throw new HttpException('Invalid credentials!', HttpStatus.UNAUTHORIZED);
    }
  }
}