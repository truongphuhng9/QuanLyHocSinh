import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassesModule } from "../classes/classes.module";
import { StudentsModule } from "../students/students.module";
import { YearsModule } from "../years/years.module";
import { Classroom } from "./classroom.entity";
import ClassroomsController from "./classrooms.controller";
import ClassroomsService from "./classrooms.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Classroom]),
    forwardRef(() => YearsModule),
    forwardRef(() => StudentsModule),
  ],
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
  exports: [ClassroomsService]
})

export class ClassroomsModule {}