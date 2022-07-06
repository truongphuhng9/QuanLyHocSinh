import { Controller, forwardRef, Get, Inject } from "@nestjs/common";
import Classroom from "src/classrooms/classroom.entity";
import ClassroomsService from "src/classrooms/classrooms.service";
import Course from "src/courses/course.entity";
import GradeRecord from "src/grade-records/gradeRecord.entity";
import StudentsService from "./students.service";

@Controller('demo-students')
export default class DemoStudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    @Inject(forwardRef(() => ClassroomsService))
    private readonly classroomsService: ClassroomsService,  
  ) {}

  @Get('init-data')
  async createDemoStudents() {
    const students = [
      {
        student_code: "12001",
        first_name: "John",
        last_name: "Cena",
        email: "johncena@gmail.com",
        address: "47 Dt.St, New York City",
        date_of_birth: new Date(1995, 11, 17),
        sex: "Nam",
        enrolledClassrooms: [] as Classroom[],
        enrolledCourses: [] as Course[],
        gradeRecords: [] as GradeRecord[]
      },
      {
        student_code: "12002",
        first_name: "John",
        last_name: "Cena",
        email: "johncena@gmail.com",
        address: "47 Dt.St, New York City",
        date_of_birth: new Date(1995, 11, 17),
        sex: "Nam",
        enrolledClassrooms: [] as Classroom[],
        enrolledCourses: [] as Course[],
        gradeRecords: [] as GradeRecord[]
      }
    ]
    if (process.env.DEBUG_MODE) {
      const promises = await students.map(async student => {
        await this.studentsService.createStudent(student);
      })
      await Promise.all(promises);
      return students
    }
  }

}