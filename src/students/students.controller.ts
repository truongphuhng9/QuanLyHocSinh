import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import StudentsService from './students.service';
import { CreateStudentServiceDto } from './dto/create-student.dto';
import { UpdateStudentControllerDto } from './dto/update-student.dto';
import { ListAllStudents } from './dto/list-all-student.dto';
import JwtAuthGuard from 'src/authentication/jwt-authentication.guard';
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