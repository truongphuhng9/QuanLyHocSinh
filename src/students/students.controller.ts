import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import StudentsService from './students.service';
import { CreateStudentServiceDto } from './dto/create-student.dto';
import { UpdateStudentControllerDto } from './dto/update-student.dto';
import { ListAllStudents } from './dto/list-all-student.dto';
import JwtAuthGuard from 'src/authentication/jwt-authentication.guard';
import Classroom from 'src/classrooms/classroom.entity';
import ClassroomsService from 'src/classrooms/classrooms.service';

@Controller('students')
export default class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    @Inject(forwardRef(() => ClassroomsService))
    private readonly classroomsService: ClassroomsService
  ) {}

  @Get()
  findAll(@Query() query: ListAllStudents) {
    return this.studentsService.getAllStudents();
  }

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
      }
    ]
    if (process.env.DEBUG_MODE) {
      const promises = await students.map(async student => {
        await this.createStudent(student);
      })
      await Promise.all(promises);
      return students
    }
  }

  @Get(':id')
  //@UseGuards(JwtAuthGuard)
  getStudentById(@Param('id') id: string) {
    return this.studentsService.getStudentById(Number(id));
  }

  @Post()
  //@UseGuards(JwtAuthGuard)
  async createStudent(@Body() student: CreateStudentServiceDto) {
    return this.studentsService.createStudent(student);
  }

  @Put(':id')
  //@UseGuards(JwtAuthGuard)
  async updateStudent(@Param('id') id: number, @Body() student: UpdateStudentControllerDto) {
    const enrolledClassrooms = await this.classroomsService.getClassroomsByIds(student.enrolledClassroomIds)
    return this.studentsService.updateStudent(id, {
      ...student,
      enrolledClassrooms: enrolledClassrooms
    });
  }

  @Delete(':id')
  //@UseGuards(JwtAuthGuard)
  async deleteStudent(@Param('id') id: string) {
    return this.studentsService.deleteStudent(Number(id));
  }

  
}