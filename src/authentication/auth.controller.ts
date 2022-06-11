import { Controller, Post, Body, HttpCode, UseGuards, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";

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
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
     const { user } = request;
     const cookie = this.authService.getCookieWithJwtToken(user.id);
     response.setHeader('Set-Cookie', cookie);
     user.password = undefined;
     return response.send(user);
  }
}