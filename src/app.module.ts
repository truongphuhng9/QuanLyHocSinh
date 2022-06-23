import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi'
import { DatabaseModule } from './database/database.module';
import { AuthenModule } from './authentication/auth.module';
import { UsersModule } from './users/users.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { TermsModule } from './terms/terms.module';
import { YearsModule } from './years/years.module';
import { ClassesModule } from './classes/classes.module';

@Module({
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
    DatabaseModule,
    AuthenModule,
    UsersModule,
    ClassroomsModule,
    ClassesModule,
    YearsModule,
    TermsModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
