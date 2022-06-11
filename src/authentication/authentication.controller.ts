import { Controller, Post, Body, HttpCode, UseGuards, Req } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";

import { RegisterDto } from "./dto/register.dto";
import {  }


@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalSAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
     const user = request.user;
     user.password = undefined;
     return user;
  }
}