import { Controller, Post, Body, HttpCode, UseGuards, Req, Res, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { response, Response } from "express";

import RegisterDto from "./dto/register.dto";
import { LocalAuthGuard } from "./localAuth.guard";
import RequestWithUser from "./request-with-user.interface";
import JwtAuthGuard from "./jwt-authentication.guard";


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
     const { user } = request;
     const cookie = this.authService.getCookieWithJwtToken(user.id);
     request.res.setHeader('Set-Cookie', cookie);
     user.password = undefined;
     return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}