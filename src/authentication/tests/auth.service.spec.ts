import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { AuthService } from "../auth.service"
import { Test } from "@nestjs/testing"
import { UsersModule } from "../../users/users.module"
import * as Joi from "@hapi/joi"
import { DatabaseModule } from "../../database/database.module"
import User from '../../users/user.entity'
import { getRepositoryToken } from "@nestjs/typeorm"

describe('The AuthService', () => {
  let authService: AuthService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validationSchema: Joi.object({
            POSTGRES_HOST: Joi.string().required(),
            POSTGRES_PORT: Joi.number().required(),
            POSTGRES_USER: Joi.string().required(),
            POSTGRES_PASSWORD: Joi.string().required(),
            POSTGRES_DB: Joi.string().required(),
            JWT_SECRET: Joi.string().required(),
            JWT_EXPIRATION_TIME: Joi.string().required(),
            PORT: Joi.number(),
          })
        }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: `${configService.get('JWT_SECRET')}`,
            signOptions: {
              expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
            },
          }),
        })
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {}
        }
      ],
    }).compile();
    authService = await module.get<AuthService>(AuthService);
  })  
  describe('when createing a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(
        typeof authService.getCookieWithJwtToken(userId)
      ).toEqual('string')
    })
  })
});