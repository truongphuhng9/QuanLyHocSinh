
import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { LocalStrategy } from "./local.strategy";

import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({ 
  imports: [
    UsersModule, 
    PassportModule, 
    ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SCRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      })
    })
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})

export class AuthenticationModule {};