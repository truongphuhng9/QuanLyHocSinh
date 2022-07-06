import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassroomsModule } from "src/classrooms/classrooms.module";
import { CoursesModule } from "src/courses/courses.module";
import { StudentsModule } from "src/students/students.module";
import GradeRecord from "./gradeRecord.entity";
import GradeRecordsController from "./gradeRecords.controller";
import GradeRecordsService from "./gradeRecords.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([GradeRecord]),
    forwardRef(() => StudentsModule),
    forwardRef(() => ClassroomsModule),
    forwardRef(() => CoursesModule)
  ],
  controllers: [GradeRecordsController],
  providers: [GradeRecordsService],
  exports: [GradeRecordsModule],
})

export default class GradeRecordsModule {}