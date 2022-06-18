import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Request } from "express";
import { Strategy } from "passport-jwt";

import { UsersService } from "src/users/users.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }]),
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate(payload: TokenPayload) {
        const user = await this.userService.getById(payload.userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}