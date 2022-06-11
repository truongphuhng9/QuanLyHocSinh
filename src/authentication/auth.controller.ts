import { Controller, Post, Body, HttpCode, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { RegisterDto } from "./dto/register.dto";
import { LocalAuthGuard } from "./localAuth.guard";
import RequestWithUser from "./request-with-user.interface";


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
     const user = request.user;
     user.password = undefined;
     return user;
  }
}