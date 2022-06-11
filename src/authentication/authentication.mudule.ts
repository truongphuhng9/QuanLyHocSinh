
import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { LocalStrategy } from "./local.strategy";

import { PassportModule } from "@nestjs/passport";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationCotroller } from "./authentication.controller";

@Module({ 
  imports: [UsersModule, PassportModule],
  providers: [AuthenticationService, LocalStrategy],
  controllers: [AuthenticationController],
})

export class AuthenticationModule {};