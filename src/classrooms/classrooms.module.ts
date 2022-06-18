import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Classroom } from "./classroom.entity";
import ClassroomsController from "./classrooms.controller";
import ClassroomsService from "./classrooms.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Classroom]),
  ],
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
})

export class ClassroomsModule {}